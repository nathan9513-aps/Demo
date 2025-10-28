import { Card } from "@/components/ui/card";
import { TrendingUp, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AccountBalanceCardProps {
  balance: number;
  accountNumber: string;
  availableBalance: number;
  pendingAmount: number;
}

export default function AccountBalanceCard({
  balance,
  accountNumber,
  availableBalance,
  pendingAmount,
}: AccountBalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("de-CH", {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 via-background to-background border-primary/20">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Saldo Attuale</p>
            <h1 className="text-5xl font-bold tracking-tight" data-testid="text-balance">
              {showBalance ? formatCurrency(balance) : "••••••"}
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowBalance(!showBalance)}
            data-testid="button-toggle-balance"
          >
            {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </Button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-green-600 dark:text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">+2.5%</span>
          </div>
          <span className="text-muted-foreground">vs. mese scorso</span>
        </div>

        <div className="pt-4 border-t space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">IBAN</span>
            <span className="text-sm font-mono font-medium" data-testid="text-account-number">
              {accountNumber}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Disponibile</span>
            <span className="text-sm font-semibold" data-testid="text-available-balance">
              {showBalance ? formatCurrency(availableBalance) : "••••••"}
            </span>
          </div>

          {pendingAmount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">In sospeso</span>
              <span className="text-sm font-medium text-muted-foreground" data-testid="text-pending-amount">
                {showBalance ? formatCurrency(pendingAmount) : "••••"}
              </span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Aggiornato: {new Date().toLocaleDateString("it-CH", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </Card>
  );
}
