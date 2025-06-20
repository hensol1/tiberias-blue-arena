import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-team-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Club Info */}
          <div className="text-right">
            <div className="flex items-center justify-end mb-4">
              <div className="text-right ml-3">
                <h3 className="text-lg font-bold">עירוני טבריה</h3>
                <p className="text-sm text-blue-200">מועדון כדורגל</p>
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-team-primary font-bold text-xl">ע</span>
              </div>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">
              מועדון כדורגל עירוני טבריה - גאווה עירונית, מסורת ספורטיבית ועתיד מבטיח. 
              בואו להיות חלק מהמשפחה הכחולה!
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-right">
            <h4 className="text-lg font-semibold mb-4">קישורים מהירים</h4>
            <ul className="space-y-2">
              <li><Link to="/club" className="text-blue-200 hover:text-white transition-colors">המועדון</Link></li>
              <li><Link to="/team" className="text-blue-200 hover:text-white transition-colors">הקבוצה</Link></li>
              <li><Link to="/games" className="text-blue-200 hover:text-white transition-colors">משחקים</Link></li>
              <li><Link to="/tv" className="text-blue-200 hover:text-white transition-colors">TV טבריה</Link></li>
              <li><Link to="/youth" className="text-blue-200 hover:text-white transition-colors">מחלקת הנוער</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-right">
            <h4 className="text-lg font-semibold mb-4">צור קשר</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-end">
                <span className="text-blue-200 text-sm ml-2">office@ironitiberias.co.il</span>
                <Mail className="h-4 w-4 text-blue-300" />
              </div>
              <div className="flex items-center justify-end">
                <span className="text-blue-200 text-sm ml-2">04-6721234</span>
                <Phone className="h-4 w-4 text-blue-300" />
              </div>
              <div className="text-blue-200 text-sm">
                רחוב הספורט 1, טבריה
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-right">
            <h4 className="text-lg font-semibold mb-4">עקבו אחרינו</h4>
            <div className="flex justify-end space-x-4 space-x-reverse">
              <a href="https://www.facebook.com/Tiberias.FC/" target="_blank" rel="noopener noreferrer" className="bg-team-secondary/20 p-2 rounded-full hover:bg-team-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/iron_tiberias_f.c?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="bg-team-secondary/20 p-2 rounded-full hover:bg-team-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-team-secondary/20 p-2 rounded-full hover:bg-team-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-team-secondary/20 p-2 rounded-full hover:bg-team-secondary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-team-secondary/20 mt-8 pt-6 text-center">
          <p className="text-blue-200 text-sm">
            © 2024 עירוני טבריה. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
