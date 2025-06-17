
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Calendar } from "lucide-react";

const Team = () => {
  const players = [
    {
      name: "יוסי כהן",
      position: "שוער",
      number: 1,
      age: 28,
      experience: "6 שנים",
      image: "https://images.unsplash.com/photo-1594736797933-d0c6d7a7e19b?w=300&h=300&fit=crop"
    },
    {
      name: "אמיר לוי",
      position: "הגנה",
      number: 4,
      age: 26,
      experience: "5 שנים",
      image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=300&h=300&fit=crop"
    },
    {
      name: "דוד משה",
      position: "קשר",
      number: 8,
      age: 24,
      experience: "3 שנים",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop"
    },
    {
      name: "מיכאל אברהם",
      position: "תוקף",
      number: 10,
      age: 22,
      experience: "2 שנים",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop"
    },
    {
      name: "רון דוד",
      position: "הגנה",
      number: 3,
      age: 27,
      experience: "4 שנים",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
    },
    {
      name: "עמרי שמואל",
      position: "קשר",
      number: 6,
      age: 25,
      experience: "3 שנים",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop"
    }
  ];

  const staff = [
    {
      name: "מוחמד חסן",
      role: "מאמן ראשי",
      experience: "10 שנות ניסיון",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=300&h=300&fit=crop"
    },
    {
      name: "יעקב ישראל",
      role: "עוזר מאמן",
      experience: "7 שנות ניסיון",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop"
    },
    {
      name: "שרה אלון",
      role: "פיזיותרפיסטית",
      experience: "5 שנות ניסיון",
      image: "https://images.unsplash.com/photo-1594824475470-42e6b7d6fc24?w=300&h=300&fit=crop"
    }
  ];

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'שוער': return 'bg-red-500';
      case 'הגנה': return 'bg-blue-500';
      case 'קשר': return 'bg-green-500';
      case 'תוקף': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-team-primary to-team-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">הקבוצה</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            הכירו את השחקנים והצוות המקצועי של עירוני טבריה
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Team Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-team-primary mx-auto mb-2" />
                <CardTitle className="text-right">סגל שחקנים</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-team-primary mb-2">28</div>
                <p className="text-muted-foreground text-right">שחקנים רשומים</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Trophy className="h-12 w-12 text-team-primary mx-auto mb-2" />
                <CardTitle className="text-right">גיל ממוצע</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-team-primary mb-2">24.5</div>
                <p className="text-muted-foreground text-right">שנים</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-team-primary mx-auto mb-2" />
                <CardTitle className="text-right">ניסיון ממוצע</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-team-primary mb-2">4.2</div>
                <p className="text-muted-foreground text-right">שנות ניסיון</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Players Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">שחקני הקבוצה</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img 
                      src={player.image} 
                      alt={player.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <div className="w-12 h-12 bg-team-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {player.number}
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <Badge className={`${getPositionColor(player.position)} hover:${getPositionColor(player.position)}`}>
                        {player.position}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-right mb-2 text-team-dark">{player.name}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground text-right">
                    <p>גיל: {player.age}</p>
                    <p>ניסיון: {player.experience}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Coaching Staff */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">הצוות המקצועי</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {staff.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="p-0">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </CardHeader>
                <CardContent className="p-4 text-right">
                  <h3 className="text-lg font-semibold mb-2 text-team-dark">{member.name}</h3>
                  <p className="text-team-primary font-medium mb-1">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.experience}</p>
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

export default Team;
