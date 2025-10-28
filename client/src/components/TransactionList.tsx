import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download } from "lucide-react";
import TransactionItem, { type Transaction } from "./TransactionItem";
import { useState } from "react";

interface TransactionListProps {
  transactions: (Transaction & { onClick?: () => void })[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filters = [
    { id: "all", label: "Tutte" },
    { id: "migros", label: "Migros" },
    { id: "coop", label: "Coop" },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.merchant
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "migros") {
      return matchesSearch && transaction.merchant.toLowerCase().includes("migros");
    }
    if (selectedFilter === "coop") {
      return matchesSearch && transaction.merchant.toLowerCase().includes("coop");
    }
    return matchesSearch;
  });

  return (
    <Card className="p-6 shadow-md">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-2xl font-bold">Transazioni</h2>
          <Button variant="outline" size="sm" data-testid="button-download">
            <Download className="w-4 h-4 mr-2" />
            Esporta
          </Button>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Cerca transazioni..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
              data-testid={`button-filter-${filter.id}`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="space-y-0 max-h-[600px] overflow-y-auto custom-scrollbar pr-2 -mr-2">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <div 
                key={transaction.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 20}ms` }}
              >
                <TransactionItem 
                  transaction={transaction}
                  onClick={transaction.onClick}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <p className="text-muted-foreground text-lg">Nessuna transazione trovata</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
