
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsFeed from "@/components/NewsFeed";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Trophy, Users, Tv } from "lucide-react";
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

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Trophy className="h-8 w-8 text-team-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-team-primary">15</div>
                <div className="text-sm text-muted-foreground">תארים</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-team-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-team-primary">28</div>
                <div className="text-sm text-muted-foreground">שחקנים</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <CalendarDays className="h-8 w-8 text-team-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-team-primary">1967</div>
                <div className="text-sm text-muted-foreground">שנת הקמה</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Tv className="h-8 w-8 text-team-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-team-primary">50K</div>
                <div className="text-sm text-muted-foreground">צופים</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content - News Feed */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <NewsFeed />
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-team-accent/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-team-dark">גלה עוד על המועדון</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/club" className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-team-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-team-secondary transition-colors">
                    <span className="text-white text-2xl font-bold">ע</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-team-dark">המועדון</h3>
                  <p className="text-muted-foreground text-sm">היסטוריה, הישגים ומסורת</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/team" className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Users className="h-16 w-16 text-team-primary mx-auto mb-4 group-hover:text-team-secondary transition-colors" />
                  <h3 className="text-xl font-semibold mb-2 text-team-dark">הקבוצה</h3>
                  <p className="text-muted-foreground text-sm">שחקנים, צוות מקצועי וסגל</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/games" className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <CalendarDays className="h-16 w-16 text-team-primary mx-auto mb-4 group-hover:text-team-secondary transition-colors" />
                  <h3 className="text-xl font-semibold mb-2 text-team-dark">משחקים</h3>
                  <p className="text-muted-foreground text-sm">לוח משחקים ותוצאות</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/tv" className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Tv className="h-16 w-16 text-team-primary mx-auto mb-4 group-hover:text-team-secondary transition-colors" />
                  <h3 className="text-xl font-semibold mb-2 text-team-dark">TV טבריה</h3>
                  <p className="text-muted-foreground text-sm">ווידאו, ראיונות ותכנים</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
