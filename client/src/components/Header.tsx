import { Button } from "@/components/ui/button";
import { Bell, User, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary via-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">Y</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Yuh
                </h1>
                <p className="text-xs text-muted-foreground">Swiss Banking</p>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" data-testid="button-nav-dashboard">
              Panoramica
            </Button>
            <Button variant="ghost" data-testid="button-nav-transactions">
              Movimenti
            </Button>
            <Button variant="ghost" data-testid="button-nav-cards">
              Carte
            </Button>
            <Button variant="ghost" data-testid="button-nav-invest">
              Investimenti
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Button variant="ghost" size="icon" data-testid="button-notifications">
                <Bell className="w-5 h-5" />
              </Button>
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
              >
                3
              </Badge>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-menu">
              <Menu className="w-5 h-5" />
            </Button>
            <Avatar className="w-9 h-9 cursor-pointer hover-elevate active-elevate-2" data-testid="button-profile">
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-purple-600/20 text-primary font-semibold">
                N
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
