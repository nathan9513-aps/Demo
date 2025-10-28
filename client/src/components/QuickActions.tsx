import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, CreditCard, QrCode, Plus } from "lucide-react";

export default function QuickActions() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Azioni Rapide</h3>
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="h-auto py-4 flex-col gap-2"
          data-testid="button-send-money"
        >
          <Send className="w-5 h-5" />
          <span className="text-sm">Invia</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto py-4 flex-col gap-2"
          data-testid="button-cards"
        >
          <CreditCard className="w-5 h-5" />
          <span className="text-sm">Carte</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto py-4 flex-col gap-2"
          data-testid="button-qr-pay"
        >
          <QrCode className="w-5 h-5" />
          <span className="text-sm">QR Pay</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto py-4 flex-col gap-2"
          data-testid="button-top-up"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm">Ricarica</span>
        </Button>
      </div>
    </Card>
  );
}
