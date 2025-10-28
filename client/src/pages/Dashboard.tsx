import Header from "@/components/Header";
import AccountBalanceCard from "@/components/AccountBalanceCard";
import TransactionList from "@/components/TransactionList";
import { type Transaction } from "@/components/TransactionItem";

export default function Dashboard() {
  // Mock data for demonstration
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      merchant: "Migros",
      category: "Alimentari",
      amount: -45.80,
      date: new Date(2025, 9, 27, 14, 30),
      status: "completed",
    },
    {
      id: "2",
      merchant: "Coop",
      category: "Alimentari",
      amount: -67.50,
      date: new Date(2025, 9, 25, 18, 15),
      status: "completed",
    },
    {
      id: "3",
      merchant: "Migros",
      category: "Casa",
      amount: -23.90,
      date: new Date(2025, 9, 23, 12, 45),
      status: "completed",
    },
    {
      id: "4",
      merchant: "Coop",
      category: "Alimentari",
      amount: -89.20,
      date: new Date(2025, 9, 22, 16, 20),
      status: "completed",
    },
    {
      id: "5",
      merchant: "Migros",
      category: "Alimentari",
      amount: -52.30,
      date: new Date(2025, 9, 20, 10, 15),
      status: "completed",
    },
    {
      id: "6",
      merchant: "Coop",
      category: "Casa",
      amount: -34.60,
      date: new Date(2025, 9, 18, 19, 45),
      status: "completed",
    },
    {
      id: "7",
      merchant: "Migros",
      category: "Alimentari",
      amount: -71.90,
      date: new Date(2025, 9, 16, 13, 30),
      status: "completed",
    },
    {
      id: "8",
      merchant: "Coop",
      category: "Alimentari",
      amount: -43.70,
      date: new Date(2025, 9, 15, 17, 10),
      status: "completed",
    },
    {
      id: "9",
      merchant: "Migros",
      category: "Casa",
      amount: -28.50,
      date: new Date(2025, 9, 13, 11, 25),
      status: "completed",
    },
    {
      id: "10",
      merchant: "Coop",
      category: "Alimentari",
      amount: -95.40,
      date: new Date(2025, 9, 11, 15, 50),
      status: "completed",
    },
    {
      id: "11",
      merchant: "Migros",
      category: "Alimentari",
      amount: -38.80,
      date: new Date(2025, 9, 9, 9, 30),
      status: "completed",
    },
    {
      id: "12",
      merchant: "Coop",
      category: "Casa",
      amount: -61.20,
      date: new Date(2025, 9, 7, 14, 15),
      status: "completed",
    },
    {
      id: "13",
      merchant: "Migros",
      category: "Alimentari",
      amount: -47.30,
      date: new Date(2025, 9, 5, 18, 40),
      status: "completed",
    },
    {
      id: "14",
      merchant: "Coop",
      category: "Alimentari",
      amount: -73.90,
      date: new Date(2025, 9, 3, 12, 20),
      status: "completed",
    },
    {
      id: "15",
      merchant: "Migros",
      category: "Casa",
      amount: -55.60,
      date: new Date(2025, 9, 1, 16, 55),
      status: "completed",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div className="lg:col-span-1">
            <AccountBalanceCard
              balance={4500.00}
              accountNumber="CH12 **** **** 5678"
              availableBalance={4500.00}
              pendingAmount={0}
            />
          </div>

          <div className="lg:col-span-2">
            <TransactionList transactions={mockTransactions} />
          </div>
        </div>
      </main>
    </div>
  );
}
