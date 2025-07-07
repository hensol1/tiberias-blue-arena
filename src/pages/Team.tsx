import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

import IdoSharon from "@/assets/lovable-uploads/Ido Sharon.png";
import OndrejBaco from "@/assets/lovable-uploads/Ondrej Baco.png";
import SambaKonte from "@/assets/lovable-uploads/Samba.png";
import OmerYitzhak from "@/assets/lovable-uploads/Omer Yitzhak.png";
import HaroonShapso from "@/assets/lovable-uploads/Haroon Shapso.png";
import EliBalilti from "@/assets/lovable-uploads/Eli Balilti.png";
import RonUnger from "@/assets/lovable-uploads/Ron Unger.png";
import DavidKeltjens from "@/assets/lovable-uploads/David Keltjens.webp";
import IlayElmkies from "@/assets/lovable-uploads/Ilay Elmkies.webp";
import Usman from "@/assets/lovable-uploads/Usman.png";
import YonatanTeper from "@/assets/lovable-uploads/Yonatan Teper.webp";
import NivGotliv from "@/assets/lovable-uploads/Niv Gotliv.png";
import WahebHabiballah from "@/assets/lovable-uploads/Waheb Habiballah.webp";
import StanislavBilenkyi from "@/assets/lovable-uploads/Stanislav Bilenkyi.webp";
import IdanDahan from "@/assets/lovable-uploads/Idan Dahan.png";
import EliranHodada from "@/assets/lovable-uploads/Eliran.jpg";
import MotiIvanir from "@/assets/lovable-uploads/Moti.png";
import NivTubul from "@/assets/lovable-uploads/53254.png";
import PeterMichael from "@/assets/lovable-uploads/Peter Michael.webp";
import burgerSaloonLogo from "@/assets/sponsors/burger-saloon.jpg";
import dorotLogo from "@/assets/sponsors/dorot.png";
import goOutLogo from "@/assets/sponsors/go-out.png";
import nofGinosarLogo from "@/assets/sponsors/nof-ginosar.png";
import leagueManagerLogo from "@/assets/sponsors/league-manager.png";
import mobileSponsors from "@/assets/sponsors/mobile sponsors.png";



const Team = () => {
  const players = [
    { name: "עידו שרון", position: "שוער", number: 1, age: 23, image: IdoSharon, country: "ישראל" },
    { name: "אונדז'יי באצ'ו", position: "הגנה", number: 37, age: 29, image: OndrejBaco, country: "צ'כיה" },
    { name: "סמביניה", position: "הגנה", number: 4, age: 32, image: SambaKonte, country: "גינאה-ביסאו" },
    { name: "עומר יצחק", position: "הגנה", number: 17, age: 24, image: OmerYitzhak, country: "ישראל" },
    { name: "הארון שפסו", position: "הגנה", number: 99, age: 26, image: HaroonShapso, country: "ישראל" },
    { name: "אלי בלילתי", position: "הגנה", number: 15, age: 31, image: EliBalilti, country: "ישראל" },
    { name: "רון אונגר", position: "הגנה", number: 2, age: 23, image: RonUnger, country: "ישראל" },
    { name: "דויד קלטינס", position: "קשר", number: 3, age: 30, image: DavidKeltjens, country: "ישראל" },
    { name: "עילאי אלמקייס", position: "קשר", number: 10, age: 25, image: IlayElmkies, country: "ישראל" },
    { name: "מוחמד אוסמן", position: "קשר", number: 10, age: 31, image: Usman, country: "ניגריה" },
    { name: "יונתן טפר", position: "קשר", number: 5, age: 24, image: YonatanTeper, country: "ישראל" },
    { name: "ניב גוטליב", position: "קשר", number: 80, age: 22, image: NivGotliv, country: "ישראל" },
    { name: "וואהיב חביבאללה", position: "התקפה", number: 14, age: 27, image: WahebHabiballah, country: "ישראל" },
    { name: "סטניסלב בילנקי", position: "התקפה", number: 9, age: 26, image: StanislavBilenkyi, country: "אוקראינה" },
    { name: "עידן דהאן", position: "התקפה", number: 11, age: 24, image: IdanDahan, country: "ישראל" },
    { name: "פיטר מייקל", position: "התקפה", number: 10, age: 27, image: PeterMichael, country: "ניגריה" }
  ];

  const staff = [
    { name: "אלירן חודדה", position: "מאמן ראשי", image: EliranHodada },
    { name: "מוטי קריספיל", position: "עוזר מאמן", image: MotiIvanir },
    { name: "דודו גורש", position: "מאמן שוערים", image: NivTubul },
    { name: "שלומי ורדרו", position: "מאמן כושר", image: NivTubul },

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

  const isMobile = useIsMobile();

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
              <Card key={index} className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg group">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg"></div>
                  <div className="absolute bottom-4 right-4 text-right">
                    <h3 className="text-white font-bold text-lg md:text-xl mb-1">{member.name}</h3>
                    <div className="w-full h-0.5 bg-team-secondary mb-2"></div>
                    <p className="text-white/80 text-sm">{member.position}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Sponsors Section - Bottom of the Page */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          {/* Desktop sponsors grid */}
          {!isMobile && (
            <div className="hidden md:grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-5 items-center">
              <div className="flex justify-center items-center py-2">
                <img src={burgerSaloonLogo} alt="Burger Saloon" className="h-20 object-contain grayscale hover:grayscale-0 transition duration-300" />
              </div>
              <div className="flex justify-center items-center py-2">
                <img src={dorotLogo} alt="Dorot Group" className="h-20 md:h-28 object-contain grayscale hover:grayscale-0 transition duration-300" />
              </div>
              <div className="flex justify-center items-center py-2">
                <img src={goOutLogo} alt="Go-Out" className="h-20 md:h-20 object-contain grayscale hover:grayscale-0 transition duration-300" />
              </div>
              <div className="flex justify-center items-center py-2">
                <img src={nofGinosarLogo} alt="Nof Ginosar" className="h-20 md:h-28 object-contain grayscale hover:grayscale-0 transition duration-300" />
              </div>
              <div className="flex justify-center items-center py-2">
                <img src={leagueManagerLogo} alt="מנהלת הליגות לכדורגל" className="h-20 object-contain grayscale hover:grayscale-0 transition duration-300" />
              </div>
            </div>
          )}
          {/* Mobile sponsors image */}
          {isMobile && (
            <div className="md:hidden flex justify-center items-center">
              <img src={mobileSponsors} alt="Sponsors" className="w-full max-w-xs object-contain" />
            </div>
          )}
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Team;
