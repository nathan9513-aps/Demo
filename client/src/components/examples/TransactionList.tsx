import TransactionList from "../TransactionList";

export default function TransactionListExample() {
  const mockTransactions = [
    {
      id: "1",
      merchant: "Migros",
      category: "Alimentari",
      amount: -45.80,
      date: new Date(2025, 9, 27, 14, 30),
      status: "completed" as const,
    },
    {
      id: "2",
      merchant: "Coop",
      category: "Alimentari",
      amount: -67.50,
      date: new Date(2025, 9, 25, 18, 15),
      status: "completed" as const,
    },
    {
      id: "3",
      merchant: "Migros",
      category: "Casa",
      amount: -23.90,
      date: new Date(2025, 9, 23, 12, 45),
      status: "completed" as const,
    },
  ];

  return <TransactionList transactions={mockTransactions} />;
}
