import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Zap, Copy, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface TransferDetailsProps {
  transferId: string;
  onBack?: () => void;
}

export default function TransferDetails({ transferId, onBack }: TransferDetailsProps) {
  const { toast } = useToast();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Mock transfer data - in a real app this would come from an API
  const getTransferData = () => {
    if (transferId === "express-1") {
      return {
        id: transferId,
        amount: 1600.00,
        recipient: "Danijela Milosevic",
        iban: "CH45 8080 8009 4021 0880 2",
        bank: "Raiffeisen",
        status: "completed",
        date: new Date(2025, 10, 7, 7, 0),
        transferType: "express",
        expectedArrival: "Completato - L'accredito sul conto del destinatario avviene entro 24 ore dal completamento",
        reference: "Bonifico Express",
        address: "6600 Locarno"
      };
    } else if (transferId === "piai-1") {
      return {
        id: transferId,
        amount: 149.82,
        recipient: "Edoardo Piai",
        iban: "LT13 3250 0580 5630 3841",
        bank: "Revolut Payments UAB",
        status: "completed",
        date: new Date(2025, 10, 10, 10, 30),
        transferType: "standard",
        expectedArrival: "Completato",
        reference: "Bonifico a Edoardo Piai",
        address: ""
      };
    }
    return null;
  };
  
  const transferData = getTransferData();

  if (!transferData) {
    return <div>Transfer non trovato</div>;
  }

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast({
      title: "Copiato",
      description: `${fieldName} copiato negli appunti`,
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("de-CH", {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("it-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            In elaborazione
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">
            Completato
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Dettagli Bonifico</h1>
              <p className="text-muted-foreground">#{transferData.id}</p>
            </div>
          </div>

          {/* Transfer Overview Card */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-950 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Bonifico Express</h3>
                  <p className="text-muted-foreground">a {transferData.recipient}</p>
                </div>
              </div>
              {getStatusBadge(transferData.status)}
            </div>

            <div className="text-center py-6">
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                -{formatCurrency(transferData.amount)}
              </p>
              <p className="text-muted-foreground mt-1">
                {formatDateTime(transferData.date)}
              </p>
            </div>
          </Card>

          {/* Transfer Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Dettagli del Bonifico</h3>
            
            <div className="space-y-4">
              {/* Recipient */}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Destinatario</span>
                <div className="text-right">
                  <div className="font-medium">{transferData.recipient}</div>
                  <div className="text-sm text-muted-foreground">{transferData.address}</div>
                </div>
              </div>

              <Separator />

              {/* IBAN */}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">IBAN</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{transferData.iban}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleCopy(transferData.iban, "IBAN")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Bank */}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Banca</span>
                <span className="font-medium">{transferData.bank}</span>
              </div>

              <Separator />

              {/* Transfer Type */}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tipo</span>
                <Badge variant="default" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
                  <Zap className="w-3 h-3 mr-1" />
                  Express
                </Badge>
              </div>

              <Separator />

              {/* Expected Arrival */}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Arrivo previsto</span>
                <span className="font-medium">{transferData.expectedArrival}</span>
              </div>

              <Separator />

              {/* Reference */}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Riferimento</span>
                <span className="font-medium">{transferData.reference}</span>
              </div>
            </div>
          </Card>

          {/* Status Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Stato Pagamento</h3>
            
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="font-medium">In elaborazione</span>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Importante:</strong> Questo bonifico non può più essere annullato. 
                Si prega di contattare l'hotline per maggiori dettagli.
              </p>
              
              <div className="flex items-center gap-2 mt-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <Button
                  variant="link"
                  className="h-auto p-0 text-sm"
                  onClick={() => handleCopy("+41 44 123 45 67", "Numero hotline")}
                >
                  +41 44 123 45 67
                </Button>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => handleCopy(transferData.iban, "IBAN")}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copia IBAN
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                toast({
                  title: "Supporto",
                  description: "Ti stiamo reindirizzando al supporto clienti...",
                });
              }}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contatta Supporto
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}