import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ExpressTransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTransferSubmit?: (transferData: ExpressTransferData) => void;
}

export interface ExpressTransferData {
  recipient: string;
  amount: number;
  transferType: "express" | "standard";
  expectedArrival: string;
}

export default function ExpressTransferDialog({ 
  open, 
  onOpenChange, 
  onTransferSubmit 
}: ExpressTransferDialogProps) {
  const [recipient, setRecipient] = useState("Yousef Sniba");
  const [amount, setAmount] = useState("");
  const [transferType, setTransferType] = useState<"express" | "standard">("express");

  const getExpectedArrival = (type: "express" | "standard") => {
    return type === "express" ? "1-2 giorni lavorativi" : "3-5 giorni lavorativi";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !amount) return;

    const transferData: ExpressTransferData = {
      recipient,
      amount: parseFloat(amount),
      transferType,
      expectedArrival: getExpectedArrival(transferType),
    };

    onTransferSubmit?.(transferData);
    onOpenChange(false);
    
    // Reset form
    setRecipient("Yousef Sniba");
    setAmount("");
    setTransferType("express");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bonifico Express</DialogTitle>
          <DialogDescription>
            Invia denaro rapidamente con bonifico Express
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recipient */}
          <div className="space-y-2">
            <Label htmlFor="recipient">Destinatario</Label>
            <Input
              id="recipient"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Nome del destinatario"
              required
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Importo (CHF)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          {/* Transfer Type */}
          <div className="space-y-2">
            <Label>Tipo di bonifico</Label>
            <Select 
              value={transferType} 
              onValueChange={(value: "express" | "standard") => setTransferType(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="express">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Express (1-2 giorni)</span>
                  </div>
                </SelectItem>
                <SelectItem value="standard">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Standard (3-5 giorni)</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transfer Information Card */}
          <Card className="p-4 bg-muted/50">
            <div className="flex items-center gap-3">
              {transferType === "express" ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Clock className="w-5 h-5 text-blue-600" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {transferType === "express" ? "Bonifico Express" : "Bonifico Standard"}
                  </span>
                  <Badge variant={transferType === "express" ? "default" : "secondary"}>
                    {getExpectedArrival(transferType)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {transferType === "express" 
                    ? "Arrivo rapido garantito entro 1-2 giorni lavorativi"
                    : "Arrivo standard entro 3-5 giorni lavorativi"
                  }
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Annulla
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={!recipient || !amount}
            >
              Conferma Bonifico
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}