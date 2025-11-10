import Header from "@/components/Header";
import AccountBalanceCard from "@/components/AccountBalanceCard";
import TransactionList from "@/components/TransactionList";
import SpendingChart from "@/components/SpendingChart";
import QuickActions from "@/components/QuickActions";
import TransferDetails from "@/pages/TransferDetails";
import { type Transaction } from "@/components/TransactionItem";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Dashboard() {
  const { toast } = useToast();
  const [selectedTransfer, setSelectedTransfer] = useState<string | null>(null);

  // Mock data for demonstration
  const mockTransactions: Transaction[] = [
    {
      id: "hsh-delivery-1",
      merchant: "HSH Delivery SA",
      category: "Entrate",
      amount: 420.00,
      date: new Date(2025, 10, 10, 13, 0),
      status: "completed"
    },
    {
      id: "piai-1",
      merchant: "Bonifico a Edoardo Piai",
      category: "Bonifici",
      amount: -170.00,
      date: new Date(2025, 10, 10, 13, 3),
      status: "completed",
      type: "transfer",
      recipient: "Edoardo Piai",
      iban: "LT13 3250 0580 5630 3841",
      bank: "Revolut Payments UAB"
    },
    {
      id: "migros-recent-1",
      merchant: "Migros Lugano Centro",
      category: "Alimentari",
      amount: -52.40,
      date: new Date(2025, 10, 9, 18, 20),
      status: "completed",
      location: "Lugano"
    },
    {
      id: "migros-recent-2",
      merchant: "Migros Express",
      category: "Alimentari",
      amount: -18.75,
      date: new Date(2025, 10, 8, 12, 45),
      status: "completed",
      location: "Lugano"
    },
    {
      id: "migros-recent-3",
      merchant: "Migros",
      category: "Casa",
      amount: -34.90,
      date: new Date(2025, 10, 8, 10, 15),
      status: "completed",
      location: "Lugano"
    },
    {
      id: "express-1",
      merchant: "Bonifico Express",
      category: "Bonifici",
      amount: -1600.00,
      date: new Date(2025, 10, 7, 7, 0),
      status: "completed",
      type: "transfer",
      recipient: "Danijela Milosevic",
      transferType: "express",
      expectedArrival: "Completato - Accredito sul conto del destinatario entro 24 ore"
    },
    {
      id: "1",
      merchant: "Migros Lugano",
      category: "Alimentari",
      amount: -45.80,
      date: new Date(2025, 9, 27, 14, 30),
      status: "completed",
      location: "Lugano",
    },
    {
      id: "2",
      merchant: "Coop City",
      category: "Alimentari",
      amount: -67.50,
      date: new Date(2025, 9, 25, 18, 15),
      status: "completed",
      location: "Zurigo",
    },
    {
      id: "3",
      merchant: "Migros",
      category: "Casa",
      amount: -23.90,
      date: new Date(2025, 9, 23, 12, 45),
      status: "completed",
      location: "Berna",
    },
    {
      id: "4",
      merchant: "Coop Pronto",
      category: "Alimentari",
      amount: -89.20,
      date: new Date(2025, 9, 22, 16, 20),
      status: "completed",
      location: "Ginevra",
    },
    {
      id: "5",
      merchant: "Migros Online",
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
      location: "Losanna",
    },
    {
      id: "7",
      merchant: "Migros M-Budget",
      category: "Alimentari",
      amount: -71.90,
      date: new Date(2025, 9, 16, 13, 30),
      status: "completed",
      location: "Basilea",
    },
    {
      id: "8",
      merchant: "Coop Supercard",
      category: "Alimentari",
      amount: -43.70,
      date: new Date(2025, 9, 15, 17, 10),
      status: "completed",
      location: "Zurigo",
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
      merchant: "Coop City Paradeplatz",
      category: "Alimentari",
      amount: -95.40,
      date: new Date(2025, 9, 11, 15, 50),
      status: "completed",
      location: "Zurigo",
    },
    {
      id: "11",
      merchant: "Migros Express",
      category: "Alimentari",
      amount: -38.80,
      date: new Date(2025, 9, 9, 9, 30),
      status: "completed",
      location: "Lugano",
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
      location: "San Gallo",
    },
    {
      id: "14",
      merchant: "Coop Vitality",
      category: "Alimentari",
      amount: -73.90,
      date: new Date(2025, 9, 3, 12, 20),
      status: "completed",
      location: "Berna",
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

  const spendingCategories = [
    { name: "Alimentari", amount: 829.80, color: "hsl(262, 83%, 58%)" },
    { name: "Casa", amount: 203.80, color: "hsl(170, 75%, 45%)" },
  ];

  const handleTransactionClick = (transaction: Transaction) => {
    // Check if it's a transfer transaction
    if (transaction.type === "transfer" && (transaction.id === "express-1" || transaction.id === "piai-1")) {
      setSelectedTransfer(transaction.id);
      return;
    }
    
    // Default behavior for other transactions
    toast({
      title: transaction.merchant,
      description: `${transaction.category} • ${new Intl.NumberFormat("de-CH", {
        style: "currency",
        currency: "CHF",
      }).format(Math.abs(transaction.amount))}`,
    });
  };

  // Show transfer details if a transfer is selected
  if (selectedTransfer) {
    return (
      <TransferDetails
        transferId={selectedTransfer}
        onBack={() => setSelectedTransfer(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Ciao, Nathan</h2>
            <p className="text-muted-foreground">Ecco una panoramica del tuo conto Yuh</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <AccountBalanceCard
                balance={350.18}
                accountNumber="CH93 0076 2011 6238 5295 7"
                availableBalance={350.18}
                pendingAmount={0}
              />
              <QuickActions />
              <SpendingChart 
                monthlySpending={1033.60}
                categories={spendingCategories}
              />
            </div>

            <div className="lg:col-span-2">
              <TransactionList 
                transactions={mockTransactions.map(t => ({
                  ...t,
                  onClick: () => handleTransactionClick(t)
                }))} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
