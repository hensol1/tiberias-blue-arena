import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, Facebook, Instagram, Youtube, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

import facebookLogo from "@/assets/lovable-uploads/ccb18f9d-a882-4a2b-917a-ec289bf2bdba.png";
import instagramLogo from "@/assets/lovable-uploads/dd6e1668-d05f-453f-b2f6-8634e77d314f.png";
import youtubeLogo from "@/assets/lovable-uploads/8bb54cc5-8f24-41e6-aa2b-c554ae0e0136.png";
import mainLogo from "@/assets/lovable-uploads/17488e86-af0c-4984-a0a1-de1aec2e3e4d.png";
import burgerSaloonLogo from "@/assets/sponsors/burger-saloon.jpg";
import dorotLogo from "@/assets/sponsors/dorot.png";
import goOutLogo from "@/assets/sponsors/go-out.png";
import nofGinosarLogo from "@/assets/sponsors/nof-ginosar.png";
import leagueManagerLogo from "@/assets/sponsors/league-manager.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navigation = [
    { name: "עמוד ראשי", href: "/" },
    { name: "המועדון", href: "/club" },
    { name: "הקבוצה", href: "/team" },
    { name: "משחקים", href: "/games" },
    { name: "TV טבריה", href: "/tv" },
    { name: "מחלקת הנוער", href: "/youth" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <div>
      {/* Partner Logos Section */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between md:justify-center md:relative">
            <a
              href="https://www.go-out.co/event/1749454502160"
              target="_blank"
              rel="noopener noreferrer"
              className="md:absolute md:left-4 md:top-1/2 md:-translate-y-1/2 transition-transform duration-300 hover:scale-105"
            >
              <Button variant="secondary" className="text-white">לרכישת מנוי</Button>
            </a>
            <div className="flex items-center justify-end md:justify-center space-x-2 md:space-x-8 space-x-reverse">
              <a href="https://www.facebook.com/groupdorot" target="_blank" rel="noopener noreferrer">
                <img src={facebookLogo} alt="Facebook" className="h-10 md:h-12 object-contain" />
              </a>
              <a href="https://www.ginosar.co.il/" target="_blank" rel="noopener noreferrer">
                <img src={youtubeLogo} alt="YouTube" className="h-10 md:h-12 object-contain" />
              </a>
            </div>
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
                <h1 className="text-2xl font-bold tracking-wide">עירוני 'דורות' טבריה</h1>
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

            {/* Right side - Social Media and Auth */}
            <div className="hidden md:flex items-center space-x-3 space-x-reverse">
              {/* Social Media Icons */}
              <a href="https://www.facebook.com/Tiberias.FC/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-team-primary transition-all duration-300 hover:scale-110 border border-white/20">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/iron_tiberias_f.c?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-team-primary transition-all duration-300 hover:scale-110 border border-white/20">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@IroniDorotTiberiasF.C.Official" className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-team-primary transition-all duration-300 hover:scale-110 border border-white/20">
                <Youtube className="h-5 w-5" />
              </a>
              
              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="text-right">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs opacity-80">{user?.email}</p>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 rounded-full p-2"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full p-2">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
              )}
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

                  {/* Auth Section in Mobile Menu */}
                  <div className="mt-8">
                    {isAuthenticated ? (
                      <div className="space-y-4">
                        <div className="text-right p-4 bg-white/10 rounded-xl">
                          <p className="text-white font-medium">{user?.name}</p>
                          <p className="text-white/80 text-sm">{user?.email}</p>
                        </div>
                        <Button
                          onClick={handleLogout}
                          variant="ghost"
                          className="w-full text-white hover:bg-white/20 border border-white/20"
                        >
                          <LogOut className="h-4 w-4 ml-2" />
                          התנתק
                        </Button>
                      </div>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="block text-right py-3 px-6 rounded-xl transition-all duration-300 border text-white hover:bg-white/20 border-white/20 hover:border-white/40"
                      >
                        <User className="h-4 w-4 ml-2 inline" />
                        התחברות
                      </Link>
                    )}
                  </div>

                  {/* Social Media Icons in Mobile Menu */}
                  <div className="flex items-center justify-center space-x-4 space-x-reverse mt-8">
                    <a href="https://www.facebook.com/Tiberias.FC/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/20 text-white hover:bg-white hover:text-team-primary transition-all duration-300">
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a href="https://www.instagram.com/iron_tiberias_f.c?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/20 text-white hover:bg-white hover:text-team-primary transition-all duration-300">
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
