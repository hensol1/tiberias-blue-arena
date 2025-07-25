import { Facebook, Instagram, Youtube, Mail, Phone } from "lucide-react";
import TikTokIcon from "./TikTokIcon";
import XIcon from "./XIcon";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-team-dark text-white">
      <div className="container mx-auto px-4 py-5">
        <div className="flex flex-col md:flex-row justify-end items-center text-sm">
          <div className="flex items-start space-x-16 space-x-reverse">
            
            {/* Contact Info */}
            <div className="text-right">
              <h4 className="font-semibold mb-3 text-base">צור קשר</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-end">
                  <a href="mailto:office@tiberias-fc.co.il" className="text-blue-200 hover:text-white transition-colors ml-2">office@tiberias-fc.co.il</a>
                  <Mail className="h-4 w-4 text-blue-300" />
                </div>
                <div className="flex items-center justify-end">
                  <span className="text-blue-200 ml-2">04-6721234</span>
                  <Phone className="h-4 w-4 text-blue-300" />
                </div>
                <div className="text-blue-200 text-right pt-1">
                  בר כוכבא, טבריה
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-right">
              <h4 className="font-semibold mb-3 text-base">עקבו אחרינו</h4>
              <div className="flex justify-end space-x-2 md:space-x-3 space-x-reverse">
                <a href="https://www.facebook.com/Tiberias.FC/" target="_blank" rel="noopener noreferrer" className="bg-team-secondary/20 p-1.5 md:p-2 rounded-full hover:bg-team-secondary transition-colors">
                  <Facebook className="h-4 w-4 md:h-5 md:w-5" />
                </a>
                <a href="https://www.instagram.com/iron_tiberias_f.c?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="bg-team-secondary/20 p-1.5 md:p-2 rounded-full hover:bg-team-secondary transition-colors">
                  <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                </a>
                <a href="https://x.com/Ironi_Tiberias?t=3CGy4FaGpirWHP765MTfsg&s=08" target="_blank" rel="noopener noreferrer" className="bg-team-secondary/20 p-1.5 md:p-2 rounded-full hover:bg-team-secondary transition-colors">
                  <XIcon className="h-4 w-4 md:h-5 md:w-5" />
                </a>
                <a href="https://www.youtube.com/@IroniDorotTiberiasF.C.Official" className="bg-team-secondary/20 p-1.5 md:p-2 rounded-full hover:bg-team-secondary transition-colors">
                  <Youtube className="h-4 w-4 md:h-5 md:w-5" />
                </a>
                <a href="https://www.tiktok.com/@iron_tiberias_f.c?_t=ZS-8yBwrzAqeqw&_r=1" target="_blank" rel="noopener noreferrer" className="bg-team-secondary/20 p-1.5 md:p-2 rounded-full hover:bg-team-secondary transition-colors">
                  <TikTokIcon className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              </div>
            </div>

          </div>
        </div>

        <div className="border-t border-team-secondary/20 mt-5 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-blue-200">
              © 2025 עירוני טבריה. כל הזכויות שמורות.
            </p>
            <div className="flex space-x-6 space-x-reverse mt-2 md:mt-0">
              <Link to="/terms" className="text-blue-200 hover:text-white transition-colors">
                תנאי שימוש
              </Link>
              <Link to="/privacy" className="text-blue-200 hover:text-white transition-colors">
                מדיניות פרטיות
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
