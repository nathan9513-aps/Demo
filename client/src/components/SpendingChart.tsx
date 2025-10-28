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
    <Card className="p-6 shadow-md">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg font-bold">Spesa Mensile</h3>
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingDown className="w-4 h-4" />
            <span className="text-sm font-medium">Ottobre 2025</span>
          </div>
        </div>

        <div>
          <p className="text-3xl font-bold" data-testid="text-monthly-spending">
            {formatCurrency(totalSpent)}
          </p>
          <p className="text-sm text-muted-foreground mt-1.5">Totale speso questo mese</p>
        </div>

        <div className="space-y-5">
          {categories.map((category, index) => {
            const percentage = (category.amount / totalSpent) * 100;
            return (
              <div key={index} className="space-y-2.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-semibold">{category.name}</span>
                  </div>
                  <span className="font-medium text-muted-foreground">{formatCurrency(category.amount)}</span>
                </div>
                <div className="relative h-2.5 bg-accent rounded-full overflow-hidden shadow-inner">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground font-medium">
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
