import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Team = () => {
  const players = [
    {
      name: "עידו שרון",
      position: "שוער",
      number: 1,
      age: 24,
      country: "ישראל",
      image: "/lovable-uploads/Ido Sharon.webp"
    },
    {
      name: "אונרדז באצו",
      position: "הגנה",
      number: 37,
      age: 29,
      country: "צ'כיה",
      image: "/lovable-uploads/Ondrej Baco.webp"
    },
    {
      name: "סמביניה",
      position: "הגנה",
      number: 8,
      age: 32,
      country: "גינאה-ביסאו",
      image: "/lovable-uploads/Samba.webp"
    },
    {
      name: "עומר יצחק",
      position: "הגנה",
      number: 17,
      age: 24,
      country: "ישראל",
      image: "/lovable-uploads/Omer Yitzhak.webp"
    },
    {
      name: "הארון שאפסו",
      position: "הגנה",
      number: 99,
      age: 26,
      country: "ישראל",
      image: "/lovable-uploads/Haroon Shapso.webp"
    },
    {
      name: "אלי בלילטי",
      position: "הגנה",
      number: 15,
      age: 31,
      country: "ישראל",
      image: "/lovable-uploads/Eli Balilti.webp"
    },
    {
      name: "רון אונגר",
      position: "הגנה",
      number: 99,
      age: 23,
      country: "ישראל",
      image: "/lovable-uploads/Ron Unger.webp"
    },
    {
      name: "דוד קלטינס",
      position: "קשר",
      number: 3,
      age: 30,
      country: "ישראל",
      image: "/lovable-uploads/David Keltjens.webp"
    },
    {
      name: "עילאי אלמקייס",
      position: "קשר",
      number: 99,
      age: 25,
      country: "ישראל",
      image: "/lovable-uploads/Ilay Elmkies.webp"
    },
    {
      name: "יונתן טפר",
      position: "קשר",
      number: 5,
      age: 24,
      country: "ישראל",
      image: "/lovable-uploads/Yonatan Teper.webp"
    },
    {
      name: "ניב גוטליב",
      position: "קשר",
      number: 5,
      age: 22,
      country: "ישראל",
      image: "/lovable-uploads/53254.png"
    },
    {
      name: "ואהיב חביבאללה",
      position: "התקפה",
      number: 14,
      age: 27,
      country: "ישראל",
      image: "/lovable-uploads/Waheb Habiballah.webp"
    },
    {
      name: "סטניסלב בילנקי",
      position: "התקפה",
      number: 9,
      age: 26,
      country: "אוקראינה",
      image: "/lovable-uploads/Stanislav Bilenkyi.webp"
    }







  ];

  const staff = [
    {
      name: "אלירן חודידה",
      role: "מאמן ראשי",
      image: "/lovable-uploads/Eliran.jpg"
    },
    {
      name: "מוטי קריספיל",
      role: "עוזר מאמן",
      image: "/lovable-uploads/Moti.png"
    },
    {
      name: "שרה אלון",
      role: "פיזיותרפיסטית",
      experience: "5 שנות ניסיון",
      image: "https://images.unsplash.com/photo-1594824475470-42e6b7d6fc24?w=300&h=300&fit=crop"
    }
  ];

  const goalkeepers = players.filter(p => p.position === 'שוער');
  const defenders = players.filter(p => p.position === 'הגנה');
  const midfielders = players.filter(p => p.position === 'קשר');
  const forwards = players.filter(p => p.position === 'התקפה');

  const renderPlayerCard = (player, index) => (
    <div key={index} className="relative w-full h-64 md:h-80 group perspective-1000">
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
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-right">
              <h3 className="text-white font-bold text-lg md:text-xl mb-1">{player.name}</h3>
              <div className="w-full h-0.5 bg-team-secondary mb-2"></div>
              <p className="text-white/80 text-sm">{player.number}</p>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-team-primary to-team-dark rotate-y-180">
          {/* Background image */}
          <img 
              src={player.image} 
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-top opacity-30"
          />
           {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 w-full h-full bg-team-dark/60"></div>

          <div className="relative flex flex-col justify-center items-center h-full p-4 md:p-6 text-white text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-4">{player.name}</h3>
            <div className="flex flex-col items-center space-y-2 md:space-y-3 text-base md:text-lg">
              <p><span className="font-semibold">גיל:</span> {player.age}</p>
              <p><span className="font-semibold">עמדה:</span> {player.position}</p>
              <p><span className="font-semibold">מדינה:</span> {player.country}</p>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center mt-3 md:mt-4">
                <span className="text-lg md:text-xl font-bold">{player.number}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-team-primary to-team-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">הקבוצה</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            הכירו את השחקנים והצוות המקצועי של עירוני דורות טבריה
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Players Section */}
        <section className="mb-16">

          {/* Goalkeepers */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-right text-team-primary border-r-4 border-team-secondary pr-4">שוערים</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {goalkeepers.map(renderPlayerCard)}
            </div>
          </div>

          {/* Defenders */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-right text-team-primary border-r-4 border-team-secondary pr-4">הגנה</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {defenders.map(renderPlayerCard)}
            </div>
          </div>

          {/* Midfielders */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-right text-team-primary border-r-4 border-team-secondary pr-4">קישור</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {midfielders.map(renderPlayerCard)}
            </div>
          </div>

          {/* Forwards */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-right text-team-primary border-r-4 border-team-secondary pr-4">התקפה</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {forwards.map(renderPlayerCard)}
            </div>
          </div>
        </section>

        {/* Coaching Staff */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">הצוות המקצועי</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {staff.map((member, index) => (
              <div key={index} className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg group">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-right">
                  <h3 className="text-white font-bold text-lg md:text-xl mb-1">{member.name}</h3>
                  <div className="w-full h-0.5 bg-team-secondary mb-2"></div>
                  <p className="text-white/80 text-sm">{member.role}</p>
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
