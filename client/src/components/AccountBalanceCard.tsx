import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

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
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("de-CH", {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Saldo Attuale</p>
          <h1 className="text-5xl font-bold tracking-tight" data-testid="text-balance">
            {formatCurrency(balance)}
          </h1>
        </div>

        <div className="pt-4 border-t space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Conto</span>
            <span className="text-sm font-medium" data-testid="text-account-number">
              {accountNumber}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Disponibile</span>
            <span className="text-sm font-semibold" data-testid="text-available-balance">
              {formatCurrency(availableBalance)}
            </span>
          </div>

          {pendingAmount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">In sospeso</span>
              <span className="text-sm font-medium text-muted-foreground" data-testid="text-pending-amount">
                {formatCurrency(pendingAmount)}
              </span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Ultimo aggiornamento: {new Date().toLocaleDateString("it-CH", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </Card>
  );
}
