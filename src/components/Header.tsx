import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, Facebook, Instagram, Youtube, LogOut, User } from "lucide-react";
import TikTokIcon from "./TikTokIcon";
import XIcon from "./XIcon";
import { useAuth } from "@/hooks/use-auth";
import { useIsMobile } from "@/hooks/use-mobile";

import facebookLogo from "@/assets/lovable-uploads/ccb18f9d-a882-4a2b-917a-ec289bf2bdba.png";
import instagramLogo from "@/assets/lovable-uploads/dd6e1668-d05f-453f-b2f6-8634e77d314f.png";
import youtubeLogo from "@/assets/lovable-uploads/8bb54cc5-8f24-41e6-aa2b-c554ae0e0136.png";
import mainLogo from "@/assets/lovable-uploads/17488e86-af0c-4984-a0a1-de1aec2e3e4d.png";
import burgerSaloonLogo from "@/assets/sponsors/burger-saloon.jpg";
import dorotLogo from "@/assets/sponsors/dorot.png";
import goOutLogo from "@/assets/sponsors/go-out.png";
import nofGinosarLogo from "@/assets/sponsors/nof-ginosar.png";
import leagueManagerLogo from "@/assets/sponsors/league-manager.png";
import ylogon2Logo from "@/assets/sponsors/ylogon2.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const isMobile = useIsMobile();

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
    <div className="relative">
      {/* Glassmorphism Navigation Bar */}
      <header className="sticky top-0 z-50">
        <nav 
          className="container mx-auto px-4 md:px-6 lg:px-8"
          style={{
            background: 'linear-gradient(to right, #1e40af, #3b82f6, #1e40af)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
            {/* Left: Sponsor Logos */}
            <div className="hidden lg:flex items-center space-x-4 space-x-reverse flex-shrink-0">
              <a 
                href="https://www.facebook.com/groupdorot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110"
              >
                <img 
                  src={dorotLogo} 
                  alt="Dorot Group" 
                  className="h-8 md:h-10 object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" 
                />
              </a>
              <a 
                href="https://y-group.co.il/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110"
              >
                <img 
                  src={ylogon2Logo} 
                  alt="Yochelman Group" 
                  className="h-8 md:h-10 object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" 
                />
              </a>
              <a 
                href="https://www.ginosar.co.il/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110"
              >
                <img 
                  src={nofGinosarLogo} 
                  alt="Nof Ginosar" 
                  className="h-8 md:h-10 object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" 
                />
              </a>
            </div>

            {/* Center: Club Name */}
            <div className="flex-1 flex justify-center">
              <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-black text-white font-noto-hebrew tracking-tight text-center leading-tight drop-shadow-lg">
                עירוני 'דורות' טבריה
              </h1>
            </div>

            {/* Right: CTA Button and Team Logo */}
            <div className="flex items-center space-x-3 space-x-reverse flex-shrink-0">
              {/* CTA Button */}
              <a
                href="https://www.go-out.co/event/1749454502160"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block"
              >
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-black text-base md:text-lg px-5 md:px-8 py-3 md:py-4 rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl tracking-wide"
                  style={{ backgroundColor: '#ff6b35' }}
                >
                  לרכישת מנוי
                </Button>
              </a>

              {/* Team Logo - Larger, overlapping downwards */}
              <Link to="/" className="group">
                <img 
                  src={mainLogo} 
                  alt="עירוני דורות טבריה לוגו" 
                  className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full shadow-xl ring-2 ring-white/30 transition-transform duration-300 group-hover:scale-110"
                  style={{ marginBottom: '-8px' }}
                />
              </Link>

              {/* Mobile Menu Button */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="lg:hidden text-white hover:bg-white/20 rounded-full p-2"
                  >
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
                        <h2 className="text-2xl font-black text-white font-noto-hebrew">עירוני דורות טבריה</h2>
                      </div>
                    </div>
                    
                    <nav className="flex flex-col space-y-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`text-right py-4 px-6 rounded-xl transition-all duration-300 border text-lg font-black tracking-tight ${
                            isActive(item.href)
                              ? "bg-white text-team-primary shadow-lg border-white"
                              : "text-white hover:bg-white/20 border-white/20 hover:border-white/40"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>

                    {/* Mobile CTA Button */}
                    <div className="mt-6">
                      <a
                        href="https://www.go-out.co/event/1749454502160"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                          <Button 
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-lg py-4 rounded-lg shadow-lg transition-all duration-300 tracking-wide"
                            style={{ backgroundColor: '#ff6b35' }}
                          >
                            לרכישת מנוי
                          </Button>
                      </a>
                    </div>

                    {/* Auth Section in Mobile Menu */}
                    <div className="mt-8">
                      {isAuthenticated && (
                        <div className="space-y-4">
                            <div className="text-right p-4 bg-white/10 rounded-xl">
                              <p className="text-white font-black text-base">{user?.name}</p>
                              <p className="text-white/80 text-sm font-bold">{user?.email}</p>
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
                      )}
                    </div>

                    {/* Social Media Icons in Mobile Menu */}
                    <div className="flex items-center justify-center space-x-4 space-x-reverse mt-8">
                      <a href="https://www.facebook.com/Tiberias.FC/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/20 text-white hover:bg-white hover:text-team-primary transition-all duration-300">
                        <Facebook className="h-6 w-6" />
                      </a>
                      <a href="https://www.instagram.com/ironitiberiasf.c/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/20 text-white hover:bg-white hover:text-team-primary transition-all duration-300">
                        <Instagram className="h-6 w-6" />
                      </a>
                      <a href="https://x.com/Ironi_Tiberias?t=3CGy4FaGpirWHP765MTfsg&s=08" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/20 text-white hover:bg-white hover:text-team-primary transition-all duration-300">
                        <XIcon className="h-6 w-6" />
                      </a>
                      <a href="https://www.youtube.com/@IroniDorotTiberiasF.C.Official" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/20 text-white hover:bg-white hover:text-team-primary transition-all duration-300">
                        <Youtube className="h-6 w-6" />
                      </a>
                      <a href="https://www.tiktok.com/@ironitiberias" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/20 text-white hover:bg-white hover:text-team-primary transition-all duration-300">
                        <TikTokIcon className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>

        {/* Desktop Navigation Links - Below the glass bar */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-4" style={{ background: 'linear-gradient(to right, #1e40af, #3b82f6, #1e40af)' }}>
          <nav className="hidden lg:flex items-center justify-center">
            <div 
              className="flex items-center space-x-2 space-x-reverse rounded-full px-6 py-2"
              style={{
                background: 'rgba(30, 64, 175, 0.8)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-5 py-3 text-base md:text-lg font-black rounded-full transition-all duration-300 relative tracking-tight ${
                    isActive(item.href) 
                      ? "bg-white text-team-primary shadow-lg" 
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Desktop Social Media and Auth - Fixed position */}
      <div className="hidden lg:block fixed top-24 right-4 z-50">
        <div className="flex flex-col items-center space-y-3">
          {/* Social Media Icons */}
          <a href="https://www.facebook.com/Tiberias.FC/" target="_blank" rel="noopener noreferrer" 
            className="p-3 rounded-full text-white hover:bg-white hover:text-team-primary transition-all duration-300 hover:scale-110"
            style={{
              background: 'rgba(30, 64, 175, 0.9)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a href="https://www.instagram.com/ironitiberiasf.c/" target="_blank" rel="noopener noreferrer" 
            className="p-3 rounded-full text-white hover:bg-white hover:text-team-primary transition-all duration-300 hover:scale-110"
            style={{
              background: 'rgba(30, 64, 175, 0.9)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a href="https://x.com/Ironi_Tiberias?t=3CGy4FaGpirWHP765MTfsg&s=08" target="_blank" rel="noopener noreferrer" 
            className="p-3 rounded-full text-white hover:bg-white hover:text-team-primary transition-all duration-300 hover:scale-110"
            style={{
              background: 'rgba(30, 64, 175, 0.9)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <XIcon className="h-5 w-5" />
          </a>
          <a href="https://www.youtube.com/@IroniDorotTiberiasF.C.Official" target="_blank" rel="noopener noreferrer" 
            className="p-3 rounded-full text-white hover:bg-white hover:text-team-primary transition-all duration-300 hover:scale-110"
            style={{
              background: 'rgba(30, 64, 175, 0.9)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <Youtube className="h-5 w-5" />
          </a>
          <a href="https://www.tiktok.com/@ironitiberias" target="_blank" rel="noopener noreferrer" 
            className="p-3 rounded-full text-white hover:bg-white hover:text-team-primary transition-all duration-300 hover:scale-110"
            style={{
              background: 'rgba(30, 64, 175, 0.9)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <TikTokIcon className="h-5 w-5" />
          </a>
          
          {/* Auth Section - Only show when logged in */}
          {isAuthenticated && (
            <div 
              className="p-3 rounded-lg text-white"
              style={{
                background: 'rgba(30, 64, 175, 0.9)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <div className="text-right mb-2">
                <p className="text-sm font-black">{user?.name}</p>
                <p className="text-xs opacity-80 font-bold">{user?.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="w-full text-white hover:bg-white/20 rounded-full"
              >
                <LogOut className="h-4 w-4 ml-2" />
                התנתק
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
