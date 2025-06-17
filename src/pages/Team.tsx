
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Team = () => {
  const players = [
    {
      name: "יוסי כהן",
      position: "שוער",
      number: 1,
      age: 28,
      country: "ישראל",
      image: "/lovable-uploads/3be6f079-4154-461f-a0d1-42db45709a35.png"
    },
    {
      name: "אמיר לוי",
      position: "הגנה",
      number: 4,
      age: 26,
      country: "ישראל",
      image: "/lovable-uploads/1ac693b6-dd76-4e81-a060-577f043a54ca.png"
    },
    {
      name: "דוד משה",
      position: "קשר",
      number: 8,
      age: 24,
      country: "ישראל",
      image: "/lovable-uploads/72bb95fd-d0bd-45a9-9089-7a819e42fba6.png"
    },
    {
      name: "מיכאל אברהם",
      position: "תוקף",
      number: 10,
      age: 22,
      country: "ישראל",
      image: "/lovable-uploads/52b96baa-cfae-425d-b47a-f14bfe8cefbc.png"
    },
    {
      name: "רון דוד",
      position: "הגנה",
      number: 3,
      age: 27,
      country: "ישראל",
      image: "/lovable-uploads/6f8c229d-3ff0-41d8-8fcd-ba9c6d1a475a.png"
    },
    {
      name: "עמרי שמואל",
      position: "קשר",
      number: 6,
      age: 25,
      country: "ישראל",
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
              <div key={index} className="relative w-full h-80 perspective-1000 group">
                <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                  {/* Front of card */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rounded-lg overflow-hidden shadow-lg">
                    <div className="relative w-full h-full">
                      <img 
                        src={player.image} 
                        alt={player.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-bold text-xl mb-1">{player.name}</h3>
                        <div className="w-full h-0.5 bg-team-secondary mb-2"></div>
                        <p className="text-white/80 text-sm">{player.number}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Back of card */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-team-primary to-team-dark">
                    <div className="flex flex-col justify-center items-center h-full p-6 text-white text-center">
                      <h3 className="text-2xl font-bold mb-4">{player.name}</h3>
                      <div className="space-y-3 text-lg">
                        <p><span className="font-semibold">גיל:</span> {player.age}</p>
                        <p><span className="font-semibold">עמדה:</span> {player.position}</p>
                        <p><span className="font-semibold">מדינה:</span> {player.country}</p>
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mt-4">
                          <span className="text-xl font-bold">{player.number}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coaching Staff */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">הצוות המקצועי</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {staff.map((member, index) => (
              <div key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group bg-white rounded-lg shadow-sm">
                <div className="p-0">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-right">
                  <h3 className="text-lg font-semibold mb-2 text-team-dark">{member.name}</h3>
                  <p className="text-team-primary font-medium mb-1">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Team;
