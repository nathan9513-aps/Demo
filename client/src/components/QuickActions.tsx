import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, CreditCard, QrCode, Plus, Zap } from "lucide-react";
import { useState } from "react";
import ExpressTransferDialog, { type ExpressTransferData } from "./ExpressTransferDialog";
import { useToast } from "@/hooks/use-toast";

export default function QuickActions() {
  const [showExpressTransferDialog, setShowExpressTransferDialog] = useState(false);
  const { toast } = useToast();

  const handleExpressTransfer = (transferData: ExpressTransferData) => {
    toast({
      title: "Bonifico Express Inviato",
      description: `${transferData.amount.toFixed(2)} CHF a ${transferData.recipient} • Arrivo previsto: ${transferData.expectedArrival}`,
    });
  };

  return (
    <>
      <Card className="p-6 shadow-md">
        <h3 className="text-lg font-bold mb-5">Azioni Rapide</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-auto py-5 flex-col gap-2.5"
            data-testid="button-send-money"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Send className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium">Invia</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-5 flex-col gap-2.5"
            data-testid="button-cards"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium">Carte</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-5 flex-col gap-2.5"
            data-testid="button-express-transfer"
            onClick={() => setShowExpressTransferDialog(true)}
          >
            <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-950 flex items-center justify-center">
              <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-sm font-medium">Express</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-5 flex-col gap-2.5"
            data-testid="button-qr-pay"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium">QR Pay</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-5 flex-col gap-2.5"
            data-testid="button-top-up"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Plus className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium">Ricarica</span>
          </Button>
        </div>
      </Card>

      <ExpressTransferDialog
        open={showExpressTransferDialog}
        onOpenChange={setShowExpressTransferDialog}
        onTransferSubmit={handleExpressTransfer}
      />
    </>
  );
}
