import SpendingChart from "../SpendingChart";

export default function SpendingChartExample() {
  const mockCategories = [
    { name: "Alimentari", amount: 650, color: "hsl(262, 83%, 58%)" },
    { name: "Casa", amount: 280, color: "hsl(170, 75%, 45%)" },
    { name: "Altro", amount: 120, color: "hsl(25, 85%, 58%)" },
  ];

  return <SpendingChart monthlySpending={1050} categories={mockCategories} />;
}
