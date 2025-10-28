import { ShoppingBag, ShoppingCart, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Transaction {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  date: Date;
  status: "completed" | "pending";
}

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("de-CH", {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));
  };

  const getMerchantIcon = (merchant: string) => {
    if (merchant.toLowerCase().includes("migros")) {
      return <ShoppingCart className="w-5 h-5 text-primary" />;
    }
    if (merchant.toLowerCase().includes("coop")) {
      return <ShoppingBag className="w-5 h-5 text-primary" />;
    }
    return <Store className="w-5 h-5 text-muted-foreground" />;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("it-CH", {
      day: "2-digit",
      month: "short",
      year: "numeric",
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
      className="flex items-center gap-4 py-4 border-b last:border-b-0 hover-elevate rounded-md px-2 -mx-2"
      data-testid={`transaction-${transaction.id}`}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent">
        {getMerchantIcon(transaction.merchant)}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium truncate" data-testid={`text-merchant-${transaction.id}`}>
          {transaction.merchant}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="secondary" className="text-xs">
            {transaction.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDate(transaction.date)} • {formatTime(transaction.date)}
          </span>
        </div>
      </div>

      <div className="text-right">
        <p
          className={`text-lg font-semibold ${
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
