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
    <Card className="p-7 bg-gradient-to-br from-primary/5 via-background to-background border-primary/20 shadow-md">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Saldo Attuale</p>
            <h1 className="text-5xl font-bold tracking-tight transition-all duration-300" data-testid="text-balance">
              {showBalance ? formatCurrency(balance) : "••••••"}
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowBalance(!showBalance)}
            className="transition-all duration-200"
            data-testid="button-toggle-balance"
          >
            {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </Button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
            <TrendingUp className="w-4 h-4" />
            <span className="font-semibold">+2.5%</span>
          </div>
          <span className="text-muted-foreground">vs. mese scorso</span>
        </div>

        <div className="pt-5 border-t border-border/50 space-y-3.5">
          <div className="flex justify-between items-center group">
            <span className="text-sm text-muted-foreground">IBAN</span>
            <span className="text-sm font-mono font-medium transition-colors" data-testid="text-account-number">
              {accountNumber}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Disponibile</span>
            <span className="text-sm font-semibold transition-all duration-300" data-testid="text-available-balance">
              {showBalance ? formatCurrency(availableBalance) : "••••••"}
            </span>
          </div>

          {pendingAmount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">In sospeso</span>
              <span className="text-sm font-medium text-muted-foreground transition-all duration-300" data-testid="text-pending-amount">
                {showBalance ? formatCurrency(pendingAmount) : "••••"}
              </span>
            </div>
          )}
        </div>

        <div className="pt-5 border-t border-border/50">
          <p className="text-xs text-muted-foreground/80">
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
