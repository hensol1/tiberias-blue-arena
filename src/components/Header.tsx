
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

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
    <div>
      {/* Partner Logos Section */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 space-x-reverse">
            <img 
              src="/lovable-uploads/ccb18f9d-a882-4a2b-917a-ec289bf2bdba.png" 
              alt="קבוצת דורות" 
              className="h-12 object-contain"
            />
            <img 
              src="/lovable-uploads/dd6e1668-d05f-453f-b2f6-8634e77d314f.png" 
              alt="Burger Saloon" 
              className="h-12 object-contain"
            />
            <img 
              src="/lovable-uploads/8bb54cc5-8f24-41e6-aa2b-c554ae0e0136.png" 
              alt="Nof Ginosar" 
              className="h-12 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-team-primary text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and team name */}
            <Link to="/" className="flex items-center space-x-3 space-x-reverse">
              <img 
                src="/lovable-uploads/17488e86-af0c-4984-a0a1-de1aec2e3e4d.png" 
                alt="עירוני דורות טבריה לוגו" 
                className="w-10 h-10 rounded-full"
              />
              <div className="text-right">
                <h1 className="text-xl font-bold">עירוני דורות טבריה</h1>
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-8 space-x-reverse">
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
              </div>
            </nav>

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
                    <img 
                      src="/lovable-uploads/17488e86-af0c-4984-a0a1-de1aec2e3e4d.png" 
                      alt="עירוני דורות טבריה לוגו" 
                      className="w-8 h-8 rounded-full ml-3"
                    />
                    <div className="text-right">
                      <h2 className="text-lg font-bold text-white">עירוני דורות טבריה</h2>
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
      </header>
    </div>
  );
};

export default Header;
