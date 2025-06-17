
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "עמוד ראשי", href: "/" },
    { name: "המועדון", href: "/club" },
    { name: "הקבוצה", href: "/team" },
    { name: "משחקים", href: "/games" },
    { name: "TV טבריה", href: "/tv" },
    { name: "מחלקת הנוער", href: "/youth" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-team-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and team name */}
          <Link to="/" className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-team-primary font-bold text-lg">ע</span>
            </div>
            <div className="text-right">
              <h1 className="text-xl font-bold">עירוני טבריה</h1>
              <p className="text-xs text-blue-200">מועדון כדורגל</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-200 relative ${
                  isActive(item.href) ? "text-white" : "text-blue-100"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 right-0 left-0 h-0.5 bg-white rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="hidden sm:flex items-center">
              <Input
                type="search"
                placeholder="חיפוש..."
                className="w-40 bg-team-secondary/20 border-team-light text-white placeholder:text-blue-200"
              />
              <Button size="sm" variant="ghost" className="text-white hover:bg-team-secondary/20">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-white">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-team-primary border-team-secondary">
                <div className="flex flex-col h-full pt-6">
                  <div className="flex items-center mb-8">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center ml-3">
                      <span className="text-team-primary font-bold">ע</span>
                    </div>
                    <div className="text-right">
                      <h2 className="text-lg font-bold text-white">עירוני טבריה</h2>
                      <p className="text-xs text-blue-200">מועדון כדורגל</p>
                    </div>
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-right py-2 px-4 rounded-lg transition-colors ${
                          isActive(item.href)
                            ? "bg-team-secondary text-white"
                            : "text-blue-100 hover:bg-team-secondary/20"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
