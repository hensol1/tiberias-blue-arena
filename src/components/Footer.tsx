import { Facebook, Instagram, Youtube, Mail, Phone } from "lucide-react";

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
              <div className="flex justify-end space-x-3 space-x-reverse">
                <a href="https://www.facebook.com/Tiberias.FC/" target="_blank" rel="noopener noreferrer" className="bg-team-secondary/20 p-2 rounded-full hover:bg-team-secondary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/iron_tiberias_f.c?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="bg-team-secondary/20 p-2 rounded-full hover:bg-team-secondary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-team-secondary/20 p-2 rounded-full hover:bg-team-secondary transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

          </div>
        </div>

        <div className="border-t border-team-secondary/20 mt-5 pt-4 text-center">
          <p className="text-blue-200 text-sm">
            © 2024 עירוני טבריה. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
