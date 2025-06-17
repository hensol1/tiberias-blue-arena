
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsFeed from "@/components/NewsFeed";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-l from-team-primary to-team-dark text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              עירוני טבריה
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in">
              מועדון כדורגל עם מסורת, גאווה ועתיד מבטיח
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse animate-fade-in">
              <Button size="lg" className="bg-white text-team-primary hover:bg-gray-100">
                <Link to="/team">הכר את הקבוצה</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-team-primary">
                <Link to="/games">משחקים קרובים</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - News Feed */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <NewsFeed />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
