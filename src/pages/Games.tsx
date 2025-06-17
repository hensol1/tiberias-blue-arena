
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Trophy } from "lucide-react";

const Games = () => {
  const upcomingGames = [
    {
      opponent: "הפועל חיפה",
      date: "25 דצמבר 2024",
      time: "20:00",
      venue: "אצטדיון עירוני טבריה",
      competition: "ליגה ב'",
      isHome: true
    },
    {
      opponent: "מכבי נתניה",
      date: "2 ינואר 2025",
      time: "19:30",
      venue: "אצטדיון נתניה",
      competition: "ליגה ב'",
      isHome: false
    },
    {
      opponent: "בני סכנין",
      date: "9 ינואר 2025",
      time: "20:00",
      venue: "אצטדיון עירוני טבריה",
      competition: "ליגה ב'",
      isHome: true
    }
  ];

  const recentResults = [
    {
      opponent: "הפועל רעננה",
      result: "2-1",
      date: "18 דצמבר 2024",
      venue: "אצטדיון עירוני טבריה",
      competition: "ליגה ב'",
      isHome: true,
      won: true
    },
    {
      opponent: "מכבי אום אל פחם",
      result: "1-1",
      date: "11 דצמבר 2024",
      venue: "אצטדיון אום אל פחם",
      competition: "ליגה ב'",
      isHome: false,
      won: null
    },
    {
      opponent: "הפועל עכו",
      result: "3-0",
      date: "4 דצמבר 2024",
      venue: "אצטדיון עירוני טבריה",
      competition: "ליגה ב'",
      isHome: true,
      won: true
    },
    {
      opponent: "מכבי קבליו",
      result: "0-2",
      date: "27 נובמבר 2024",
      venue: "אצטדיון קבליו",
      competition: "ליגה ב'",
      isHome: false,
      won: false
    }
  ];

  const getResultBadge = (won: boolean | null) => {
    if (won === true) return <Badge className="bg-green-500 hover:bg-green-500">ניצחון</Badge>;
    if (won === false) return <Badge className="bg-red-500 hover:bg-red-500">הפסד</Badge>;
    return <Badge className="bg-yellow-500 hover:bg-yellow-500">תיקו</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-team-primary to-team-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">משחקים</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            לוח משחקים, תוצאות ועדכונים מהעונה הנוכחית
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Season Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">8</div>
                <div className="text-sm text-muted-foreground">ניצחונות</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-yellow-600 mb-2">4</div>
                <div className="text-sm text-muted-foreground">תיקו</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-red-600 mb-2">3</div>
                <div className="text-sm text-muted-foreground">הפסדים</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-team-primary mb-2">7</div>
                <div className="text-sm text-muted-foreground">מיקום בטבלה</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Upcoming Games */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">משחקים קרובים</h2>
          <div className="space-y-6">
            {upcomingGames.map((game, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div className="text-right md:order-1">
                      <h3 className="text-xl font-semibold text-team-dark mb-2">
                        עירוני טבריה נגד {game.opponent}
                      </h3>
                      <Badge variant="outline" className="mb-2">
                        {game.competition}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {game.isHome ? 'משחק בית' : 'משחק חוץ'}
                      </div>
                    </div>
                    
                    <div className="text-center md:order-2">
                      <div className="flex items-center justify-center mb-2">
                        <span className="ml-2">{game.date}</span>
                        <Calendar className="h-4 w-4 text-team-primary" />
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="ml-2">{game.time}</span>
                        <Clock className="h-4 w-4 text-team-primary" />
                      </div>
                    </div>
                    
                    <div className="text-center md:order-3">
                      <div className="flex items-center justify-center">
                        <span className="ml-2">{game.venue}</span>
                        <MapPin className="h-4 w-4 text-team-primary" />
                      </div>
                    </div>
                    
                    <div className="text-center md:order-4">
                      <Button className="bg-team-primary hover:bg-team-secondary w-full md:w-auto">
                        קנה כרטיסים
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Results */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">תוצאות אחרונות</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentResults.map((game, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    {getResultBadge(game.won)}
                    <CardTitle className="text-right text-lg">
                      עירוני טבריה נגד {game.opponent}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-team-primary">{game.result}</div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground text-right">
                    <div className="flex items-center justify-end">
                      <span className="ml-2">{game.date}</span>
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-end">
                      <span className="ml-2">{game.venue}</span>
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-end">
                      <span className="ml-2">{game.competition}</span>
                      <Trophy className="h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Games;
