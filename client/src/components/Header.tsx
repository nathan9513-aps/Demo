import { Button } from "@/components/ui/button";
import { Bell, Settings, User, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
              <h1 className="text-2xl font-bold">Yuh</h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" data-testid="button-nav-dashboard">
              Dashboard
            </Button>
            <Button variant="ghost" data-testid="button-nav-transactions">
              Transazioni
            </Button>
            <Button variant="ghost" data-testid="button-nav-cards">
              Carte
            </Button>
            <Button variant="ghost" data-testid="button-nav-settings">
              Impostazioni
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" data-testid="button-notifications">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-menu">
              <Menu className="w-5 h-5" />
            </Button>
            <Avatar className="w-9 h-9 cursor-pointer hover-elevate" data-testid="button-profile">
              <AvatarFallback className="bg-accent">
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
