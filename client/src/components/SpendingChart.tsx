import { Card } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";

interface SpendingChartProps {
  monthlySpending: number;
  categories: {
    name: string;
    amount: number;
    color: string;
  }[];
}

export default function SpendingChart({ monthlySpending, categories }: SpendingChartProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("de-CH", {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalSpent = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Spesa Mensile</h3>
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingDown className="w-4 h-4" />
            <span className="text-sm">Ottobre 2025</span>
          </div>
        </div>

        <div>
          <p className="text-3xl font-bold" data-testid="text-monthly-spending">
            {formatCurrency(totalSpent)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">Totale speso questo mese</p>
        </div>

        <div className="space-y-4">
          {categories.map((category, index) => {
            const percentage = (category.amount / totalSpent) * 100;
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-muted-foreground">{formatCurrency(category.amount)}</span>
                </div>
                <div className="relative h-2 bg-accent rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {percentage.toFixed(1)}% del totale
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
