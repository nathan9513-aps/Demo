import TransactionItem from "../TransactionItem";

export default function TransactionItemExample() {
  const mockTransaction = {
    id: "1",
    merchant: "Migros",
    category: "Alimentari",
    amount: -45.80,
    date: new Date(),
    status: "completed" as const,
  };

  return <TransactionItem transaction={mockTransaction} />;
}
