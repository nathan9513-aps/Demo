import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, CreditCard, QrCode, Plus } from "lucide-react";

export default function QuickActions() {
  return (
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
  );
}
