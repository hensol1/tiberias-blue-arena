
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Team = () => {
  const players = [
    {
      name: "יוסי כהן",
      position: "שוער",
      number: 1,
      age: 28,
      experience: "6 שנים",
      image: "/lovable-uploads/3be6f079-4154-461f-a0d1-42db45709a35.png"
    },
    {
      name: "אמיר לוי",
      position: "הגנה",
      number: 4,
      age: 26,
      experience: "5 שנים",
      image: "/lovable-uploads/1ac693b6-dd76-4e81-a060-577f043a54ca.png"
    },
    {
      name: "דוד משה",
      position: "קשר",
      number: 8,
      age: 24,
      experience: "3 שנים",
      image: "/lovable-uploads/72bb95fd-d0bd-45a9-9089-7a819e42fba6.png"
    },
    {
      name: "מיכאל אברהם",
      position: "תוקף",
      number: 10,
      age: 22,
      experience: "2 שנים",
      image: "/lovable-uploads/52b96baa-cfae-425d-b47a-f14bfe8cefbc.png"
    },
    {
      name: "רון דוד",
      position: "הגנה",
      number: 3,
      age: 27,
      experience: "4 שנים",
      image: "/lovable-uploads/6f8c229d-3ff0-41d8-8fcd-ba9c6d1a475a.png"
    },
    {
      name: "עמרי שמואל",
      position: "קשר",
      number: 6,
      age: 25,
      experience: "3 שנים",
      image: "/lovable-uploads/1ac693b6-dd76-4e81-a060-577f043a54ca.png"
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
        {/* Players Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">שחקני הקבוצה</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {players.map((player, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white border-0 shadow-lg">
                <CardHeader className="p-0">
                  <div className="relative bg-gradient-to-b from-team-primary to-team-dark">
                    <img 
                      src={player.image} 
                      alt={player.name}
                      className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-team-primary font-bold text-lg shadow-lg">
                        {player.number}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex justify-between items-end">
                        <Badge className={`${getPositionColor(player.position)} hover:${getPositionColor(player.position)} text-white font-medium`}>
                          {player.position}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 text-center">
                  <h3 className="text-lg font-bold text-team-dark mb-2">{player.name}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
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
