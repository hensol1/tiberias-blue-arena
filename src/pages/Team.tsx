import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

import santos from "@/assets/lovable-uploads/santos.png";
import IdoSharon from "@/assets/lovable-uploads/Ido Sharon.png";
import jonas from "@/assets/lovable-uploads/jonas.png";
import OndrejBaco from "@/assets/lovable-uploads/Ondrej Baco.png";
import SambaKonte from "@/assets/lovable-uploads/Samba.png";
import OmerYitzhak from "@/assets/lovable-uploads/Omer Yitzhak.png";
import HaroonShapso from "@/assets/lovable-uploads/Haroon Shapso.png";
import EliBalilti from "@/assets/lovable-uploads/Eli Balilti.png";
import RonUnger from "@/assets/lovable-uploads/Ron Unger.png";
import DavidKeltjens from "@/assets/lovable-uploads/David Keltjens.png";
import Usman from "@/assets/lovable-uploads/Usman.png";
import YonatanTeper from "@/assets/lovable-uploads/Yonatan Teper.png";
import NivGotliv from "@/assets/lovable-uploads/Niv Gotliv.png";
import WahebHabiballah from "@/assets/lovable-uploads/Waheb Habiballah.png";
import StanislavBilenkyi from "@/assets/lovable-uploads/Stanislav Bilenkyi.png";
import EliranHodada from "@/assets/lovable-uploads/Eliran.jpg";
import MotiIvanir from "@/assets/lovable-uploads/Moti.png";
import NivTubul from "@/assets/lovable-uploads/53254.png";
import PeterMichael from "@/assets/lovable-uploads/Peter Michael.png";
import newSponsors from "@/assets/sponsors/newsponsers.png";
import ItamarShabir from "@/assets/lovable-uploads/Itamar Shvir.png";
import PiraAbuAkla from "@/assets/lovable-uploads/Feras Abu Akel.png";
import ItanWolblum from "@/assets/lovable-uploads/Eitan Velblum.png";
import YoniKashon from "@/assets/lovable-uploads/Yonatan Hason.png";
import hen from "@/assets/lovable-uploads/Nehoray Chen.png";
import swisa from "@/assets/lovable-uploads/Yarin Swisa.png";
import baranes from "@/assets/lovable-uploads/Idan Baranes.png";
import DanielGolony from "@/assets/lovable-uploads/Daniel Joulani.png";
import MatanDegani from "@/assets/lovable-uploads/Matan Dgani.png";



// Function to get country flag image URL
const getCountryFlagUrl = (country: string): string => {
  const flagMap: { [key: string]: string } = {
    "ישראל": "https://flagcdn.com/w40/il.png",
    "פורטוגל": "https://flagcdn.com/w40/pt.png",
    "צ'כיה": "https://flagcdn.com/w40/cz.png",
    "גינאה-ביסאו": "https://flagcdn.com/w40/gw.png",
    "ניגריה": "https://flagcdn.com/w40/ng.png",
    "אוקראינה": "https://flagcdn.com/w40/ua.png"
  };
  return flagMap[country] || "https://flagcdn.com/w40/xx.png";
};

const Team = () => {
  const players = [
    { name: "רוג'ריו סנטוס", position: "שוער", number: 1, age: 26, image: santos, country: "פורטוגל" },
    { name: "עידו שרון", position: "שוער", number: 22, age: 23, image: IdoSharon, country: "ישראל" },
    { name: "ג'ונאס אבו גאנימה", position: "שוער", number: 33, age: 21, image: jonas, country: "ישראל" },
    { name: "אונדז'יי באצ'ו", position: "הגנה", number: 37, age: 29, image: OndrejBaco, country: "צ'כיה" },
    { name: "סמביניה", position: "הגנה", number: 4, age: 32, image: SambaKonte, country: "גינאה-ביסאו" },
    { name: "עומר יצחק", position: "הגנה", number: 2, age: 24, image: OmerYitzhak, country: "ישראל" },
    { name: "הארון שפסו", position: "הגנה", number: 99, age: 26, image: HaroonShapso, country: "ישראל" },
    { name: "אלי בלילתי", position: "הגנה", number: 15, age: 31, image: EliBalilti, country: "ישראל" },
    { name: "רון אונגר", position: "הגנה", number: 17, age: 23, image: RonUnger, country: "ישראל" },
    { name: "דניאל גולני", position: "הגנה", number: 47, age: 22, image: DanielGolony, country: "ישראל" },
    { name: "נהוראי חן", position: "הגנה", number: 74, age: 20, image: hen, country: "ישראל" },
    { name: "יונתן חסון", position: "הגנה", number: 20, age: 20, image: YoniKashon, country: "ישראל" },
    { name: "דויד קלטינס", position: "קשר", number: 3, age: 30, image: DavidKeltjens, country: "ישראל" },
    { name: "פיראס אבו עקל", position: "קשר", number: 6, age: 28, image: PiraAbuAkla, country: "ישראל" },
    { name: "מוחמד אוסמן", position: "קשר", number: 10, age: 31, image: Usman, country: "ניגריה" },
    { name: "יונתן טפר", position: "קשר", number: 5, age: 24, image: YonatanTeper, country: "ישראל" },
    { name: "ניב גוטליב", position: "קשר", number: 11, age: 22, image: NivGotliv, country: "ישראל" },
    { name: "איתן וולבלום", position: "קשר", number: 8, age: 28, image: ItanWolblum, country: "ישראל" },
    { name: "ירין סויסה", position: "קשר", number: 27, age: 20, image: swisa, country: "ישראל" },
    { name: "מתן דגני", position: "קשר", number: 28, age: 20, image: MatanDegani, country: "ישראל" },
    { name: "וואהיב חביבאללה", position: "התקפה", number: 14, age: 27, image: WahebHabiballah, country: "ישראל" },
    { name: "סטניסלב בילנקי", position: "התקפה", number: 9, age: 26, image: StanislavBilenkyi, country: "אוקראינה" },
    { name: "פיטר מייקל", position: "התקפה", number: 90, age: 27, image: PeterMichael, country: "ניגריה" },
    { name: "איתמר שבירו", position: "התקפה", number: 19, age: 27, image: ItamarShabir, country: "ישראל" },
    { name: "עידן ברנס", position: "התקפה", number: 18, age: 21, image: baranes, country: "ישראל" }


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
    <div key={index} className="relative w-full aspect-[3/4] max-h-[280px] rounded-lg overflow-hidden shadow-lg group">
      {/* Background with grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-blue-400 to-blue-500 z-0">
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        ></div>
      </div>

      {/* Player image */}
      <div className="absolute inset-0 z-10">
        <img 
          src={player.image} 
          alt={player.name}
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>

      {/* Player number - top right */}
      <div className="absolute top-2 right-2 z-20">
        <span className="text-3xl md:text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          {player.number}
        </span>
      </div>

      {/* Country flag icon - top left */}
      <div className="absolute top-2 left-2 z-30">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center border-2 border-white shadow-xl ring-1 ring-blue-200/50 overflow-hidden p-0.5">
          <img 
            src={getCountryFlagUrl(player.country)} 
            alt={player.country}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              e.currentTarget.src = "https://flagcdn.com/w40/xx.png";
            }}
          />
        </div>
      </div>

      {/* Player name - bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-white p-2 md:p-3 z-20 border-t-2 border-blue-200">
        <h3 className="text-sm md:text-base font-bold text-blue-900 uppercase tracking-tight text-center leading-tight">
          {player.name}
        </h3>
      </div>
    </div>
  );

  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Sponsors Section - Under Header */}
      <section className="py-6 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex justify-center items-center">
            <img src={newSponsors} alt="Sponsors" className="w-full max-w-6xl object-contain" />
          </div>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-12">
        {/* Players Section */}
        <section className="mb-16">

          {/* Goalkeepers */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-sky-500 uppercase tracking-wide">שוערים</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {goalkeepers.map(renderPlayerCard)}
            </div>
          </div>

          {/* Defenders */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-sky-500 uppercase tracking-wide">הגנה</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {defenders.map(renderPlayerCard)}
            </div>
          </div>

          {/* Midfielders */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-sky-500 uppercase tracking-wide">קישור</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {midfielders.map(renderPlayerCard)}
            </div>
          </div>

          {/* Forwards */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-sky-500 uppercase tracking-wide">התקפה</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
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
      <section className="py-10 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex justify-center items-center">
            <img src={newSponsors} alt="Sponsors" className="w-full max-w-6xl object-contain" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
