import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, Facebook, Instagram, Youtube } from "lucide-react";

import facebookLogo from "@/assets/lovable-uploads/ccb18f9d-a882-4a2b-917a-ec289bf2bdba.png";
import instagramLogo from "@/assets/lovable-uploads/dd6e1668-d05f-453f-b2f6-8634e77d314f.png";
import youtubeLogo from "@/assets/lovable-uploads/8bb54cc5-8f24-41e6-aa2b-c554ae0e0136.png";
import mainLogo from "@/assets/lovable-uploads/17488e86-af0c-4984-a0a1-de1aec2e3e4d.png";

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
            <a href="https://www.facebook.com/IroniTveryaFC" target="_blank" rel="noopener noreferrer">
              <img src={facebookLogo} alt="Facebook" className="h-12 object-contain" />
            </a>
            <a href="https://www.instagram.com/ironitveryafc/" target="_blank" rel="noopener noreferrer">
              <img src={instagramLogo} alt="Instagram" className="h-12 object-contain" />
            </a>
            <a href="https://www.youtube.com/channel/your-channel" target="_blank" rel="noopener noreferrer">
              <img src={youtubeLogo} alt="YouTube" className="h-12 object-contain" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-gradient-to-r from-team-primary via-team-secondary to-team-primary text-white shadow-xl sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo and team name - Bigger */}
            <Link to="/" className="flex items-center space-x-4 space-x-reverse group">
              <div className="relative">
                <img 
                  src={mainLogo} 
                  alt="עירוני דורות טבריה לוגו" 
                  className="w-16 h-16 rounded-full shadow-lg ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-black/10"></div>
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold tracking-wide">עירוני דורות טבריה</h1>
              </div>
            </Link>

            {/* Desktop Navigation - Modern Design */}
            <nav className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-2 space-x-reverse bg-white/10 backdrop-blur-md rounded-full px-6 py-2 border border-white/20">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-white/20 hover:backdrop-blur-sm relative ${
                      isActive(item.href) 
                        ? "bg-white text-team-primary shadow-lg" 
                        : "text-white hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Social Media Icons - Modern Design */}
            <div className="hidden md:flex items-center space-x-3 space-x-reverse">
              <a href="#" className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-team-primary transition-all duration-300 hover:scale-110 border border-white/20">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-team-primary transition-all duration-300 hover:scale-110 border border-white/20">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-team-primary transition-all duration-300 hover:scale-110 border border-white/20">
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-white hover:bg-white/20 rounded-full p-3">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gradient-to-b from-team-primary to-team-secondary border-team-secondary backdrop-blur-md">
                <div className="flex flex-col h-full pt-6">
                  <div className="flex items-center mb-8">
                    <img 
                      src={mainLogo} 
                      alt="עירוני דורות טבריה לוגו" 
                      className="w-12 h-12 rounded-full ml-3 ring-2 ring-white/30"
                    />
                    <div className="text-right">
                      <h2 className="text-xl font-bold text-white">עירוני דורות טבריה</h2>
                    </div>
                  </div>
                  
                  <nav className="flex flex-col space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-right py-3 px-6 rounded-xl transition-all duration-300 border ${
                          isActive(item.href)
                            ? "bg-white text-team-primary shadow-lg border-white"
                            : "text-white hover:bg-white/20 border-white/20 hover:border-white/40"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Social Media Icons in Mobile Menu */}
                  <div className="flex items-center justify-center space-x-4 space-x-reverse mt-8">
                    <a href="#" className="p-3 rounded-full bg-white/20 text-white hover:bg-white hover:text-team-primary transition-all duration-300">
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a href="#" className="p-3 rounded-full bg-white/20 text-white hover:bg-white hover:text-team-primary transition-all duration-300">
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a href="#" className="p-3 rounded-full bg-white/20 text-white hover:bg-white hover:text-team-primary transition-all duration-300">
                      <Youtube className="h-6 w-6" />
                    </a>
                  </div>
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
