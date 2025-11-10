import { ShoppingBag, ShoppingCart, Store, MapPin, Zap, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Transaction {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  date: Date;
  status: "completed" | "pending";
  location?: string;
  type?: "transfer" | "payment";
  recipient?: string;
  transferType?: "express" | "standard";
  expectedArrival?: string;
  iban?: string;
  bank?: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  onClick?: () => void;
}

export default function TransactionItem({ transaction, onClick }: TransactionItemProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("de-CH", {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));
  };

  const getMerchantIcon = (transaction: Transaction) => {
    // Handle Express transfers
    if (transaction.type === "transfer") {
      if (transaction.transferType === "express") {
        return (
          <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-950 flex items-center justify-center">
            <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
        );
      }
      return (
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
          <Send className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
      );
    }

    // Handle regular merchant transactions
    const merchantLower = transaction.merchant.toLowerCase();
    if (merchantLower.includes("migros")) {
      return (
        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        </div>
      );
    }
    if (merchantLower.includes("coop")) {
      return (
        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
        <Store className="w-5 h-5 text-muted-foreground" />
      </div>
    );
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Oggi";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Ieri";
    }
    
    return new Intl.DateTimeFormat("it-CH", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("it-CH", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div
      className="flex items-center gap-4 py-4 border-b last:border-b-0 hover-elevate active-elevate-2 rounded-md px-3 -mx-3 cursor-pointer transition-colors"
      data-testid={`transaction-${transaction.id}`}
      onClick={onClick}
    >
      {getMerchantIcon(transaction)}

      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate" data-testid={`text-merchant-${transaction.id}`}>
          {transaction.type === "transfer" && transaction.recipient 
            ? `Bonifico a ${transaction.recipient}` 
            : transaction.merchant}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            {transaction.category}
          </Badge>
          {transaction.type === "transfer" && transaction.transferType && (
            <Badge variant={transaction.transferType === "express" ? "default" : "secondary"} className="text-xs">
              {transaction.transferType === "express" ? "Express" : "Standard"}
            </Badge>
          )}
          <span className="text-xs text-muted-foreground">
            {formatDate(transaction.date)} • {formatTime(transaction.date)}
          </span>
          {transaction.location && (
            <>
              <span className="text-xs text-muted-foreground">•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{transaction.location}</span>
              </div>
            </>
          )}
          {transaction.type === "transfer" && transaction.expectedArrival && (
            <>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">Arrivo: {transaction.expectedArrival}</span>
            </>
          )}
        </div>
      </div>

      <div className="text-right">
        <p
          className={`text-lg font-bold ${
            transaction.amount < 0 ? "text-foreground" : "text-green-600 dark:text-green-500"
          }`}
          data-testid={`text-amount-${transaction.id}`}
        >
          {transaction.amount < 0 ? "−" : "+"} {formatCurrency(transaction.amount)}
        </p>
        {transaction.status === "pending" && (
          <Badge variant="outline" className="text-xs mt-1">
            In sospeso
          </Badge>
        )}
      </div>
    </div>
  );
}
