import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsFeed from "@/components/NewsFeed";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { getTeamLogo } from "@/lib/team-logo-map";
import { getCompetitionLogo } from "@/lib/competition-logo-map";
import { Separator } from "@/components/ui/separator";
import sponsorLogo1 from "@/assets/lovable-uploads/ae653618-f246-48c4-84fb-31e6114b0b25.png";
import sponsorLogo2 from "@/assets/lovable-uploads/3eca3ff4-bae0-4b66-9c31-46793b15f049.png";
import burgerSaloonLogo from "@/assets/sponsors/burger-saloon.jpg";
import dorotLogo from "@/assets/sponsors/dorot.png";
import goOutLogo from "@/assets/sponsors/go-out.png";
import nofGinosarLogo from "@/assets/sponsors/nof-ginosar.png";
import leagueManagerLogo from "@/assets/sponsors/league-manager.png";
import { useIsMobile } from "@/hooks/use-mobile";
import mobileSponsors from "@/assets/sponsors/mobile sponsors.png";

const sponsorLogos = [
  "https://www.likud.org.il/wp-content/uploads/2021/09/likud-logo.png",
  "https://www.winner.co.il/content/images/winner-logo.svg",
  "https://upload.wikimedia.org/wikipedia/he/thumb/3/36/Hapoel_tveria.png/180px-Hapoel_tveria.png",
  sponsorLogo1,
  sponsorLogo2
];

// Countdown Timer Component
const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-2 md:gap-3">
      <div className="text-center">
        <div className="bg-white/20 backdrop-blur-sm text-white rounded-md p-2 min-w-[40px] md:min-w-[50px]">
          <div className="text-sm md:text-base font-bold">{timeLeft.days}</div>
          <div className="text-xs">ימים</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-white/20 backdrop-blur-sm text-white rounded-md p-2 min-w-[40px] md:min-w-[50px]">
          <div className="text-sm md:text-base font-bold">{timeLeft.hours}</div>
          <div className="text-xs">שעות</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-white/20 backdrop-blur-sm text-white rounded-md p-2 min-w-[40px] md:min-w-[50px]">
          <div className="text-sm md:text-base font-bold">{timeLeft.minutes}</div>
          <div className="text-xs">דקות</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-white/20 backdrop-blur-sm text-white rounded-md p-2 min-w-[40px] md:min-w-[50px]">
          <div className="text-sm md:text-base font-bold">{timeLeft.seconds}</div>
          <div className="text-xs">שניות</div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [nextGame, setNextGame] = useState<any>(null);
  const [isLoadingGame, setIsLoadingGame] = useState(true);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const bannerImages = [
    sponsorLogo1,
    sponsorLogo2
  ];

  // Fetch next game
  useEffect(() => {
    const fetchNextGame = async () => {
      if (!db) {
        console.warn("Firebase not available.");
        setIsLoadingGame(false);
        return;
      }
      try {
        const gamesCollection = collection(db, "games");
        const q = query(gamesCollection, orderBy("date", "asc"));
        const gamesSnapshot = await getDocs(q);
        const gamesList = gamesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
        
        // Filter for upcoming senior team games
        const upcomingGames = gamesList.filter((g: any) => g.team === 'senior' && g.status === 'upcoming');
        const nextGameData = upcomingGames.length > 0 ? upcomingGames[0] : null;
        setNextGame(nextGameData);
      } catch (error) {
        console.error("Error fetching next game:", error);
        toast({ title: "שגיאה בטעינת המשחק הבא", variant: "destructive" });
      } finally {
        setIsLoadingGame(false);
      }
    };

    fetchNextGame();
  }, [toast]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Hero Section - Image Carousel */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`עירוני טבריה ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}
        
        {/* Optional: Add dots indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 space-x-reverse">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentImage ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Next Game Countdown Section */}
      {nextGame && !isLoadingGame && (
        <section className="py-6 bg-gradient-to-r from-team-primary to-team-secondary">
          <div className="container mx-auto px-4">
            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between gap-4">
              {/* Countdown Timer */}
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-base">עד המשחק הבא:</span>
                <CountdownTimer targetDate={new Date(nextGame.date)} />
              </div>
              
              {/* Teams */}
              <div className="flex items-center gap-6">
                {(() => {
                  const isHomeGame = nextGame.venue.includes("גרין") || nextGame.venue.includes("הגליל") || nextGame.venue.includes("טבריה");
                  const homeTeam = isHomeGame ? "עירוני טבריה" : nextGame.opponent;
                  const awayTeam = isHomeGame ? nextGame.opponent : "עירוני טבריה";
                  
                  return (
                    <>
                      <div className="flex items-center gap-2">
                        <img src={getTeamLogo(homeTeam)} alt={homeTeam} className="w-10 h-10 object-contain"/>
                        <span className="text-white font-semibold text-base">{homeTeam}</span>
                      </div>
                      <span className="text-white font-bold text-xl">VS</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold text-base">{awayTeam}</span>
                        <img src={getTeamLogo(awayTeam)} alt={awayTeam} className="w-10 h-10 object-contain"/>
                      </div>
                    </>
                  );
                })()}
              </div>
              
              {/* Game Info */}
              <div className="flex items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center gap-1">
                  <img src={getCompetitionLogo(nextGame.competition)} alt={nextGame.competition} className="h-5 w-5 object-contain" />
                  <span className="font-semibold">{nextGame.competition}{nextGame.stage && ` - ${nextGame.stage}`}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4"/>
                  <span>{new Date(nextGame.date).toLocaleDateString('he-IL')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4"/>
                  <span>{new Date(nextGame.date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4"/>
                  <span className="max-w-24 truncate">{nextGame.venue}</span>
                </div>
              </div>
              
              {/* Buy Tickets Button */}
              <div className="flex items-center">
                {nextGame.ticketLink ? (
                  <Button 
                    asChild 
                    className="bg-white text-team-primary hover:bg-gray-100 px-4 py-2 text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <a href={nextGame.ticketLink} target="_blank" rel="noopener noreferrer">
                      קנה כרטיסים
                    </a>
                  </Button>
                ) : (
                  <span className="text-white/80 text-sm">כרטיסים יימכרו בקרוב</span>
                )}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-4">
              {/* Countdown Timer */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-white font-semibold text-sm">עד המשחק הבא:</span>
                </div>
                <div className="flex justify-center">
                  <CountdownTimer targetDate={new Date(nextGame.date)} />
                </div>
              </div>
              
              {/* Teams */}
              <div className="flex items-center justify-center gap-4">
                {(() => {
                  const isHomeGame = nextGame.venue.includes("גרין") || nextGame.venue.includes("הגליל") || nextGame.venue.includes("טבריה");
                  const homeTeam = isHomeGame ? "עירוני טבריה" : nextGame.opponent;
                  const awayTeam = isHomeGame ? nextGame.opponent : "עירוני טבריה";
                  
                  return (
                    <>
                      <div className="flex flex-col items-center text-center">
                        <img src={getTeamLogo(homeTeam)} alt={homeTeam} className="w-12 h-12 mb-1 object-contain"/>
                        <span className="text-white font-semibold text-xs text-center leading-tight">{homeTeam}</span>
                      </div>
                      <span className="text-white font-bold text-lg">VS</span>
                      <div className="flex flex-col items-center text-center">
                        <img src={getTeamLogo(awayTeam)} alt={awayTeam} className="w-12 h-12 mb-1 object-contain"/>
                        <span className="text-white font-semibold text-xs text-center leading-tight">{awayTeam}</span>
                      </div>
                    </>
                  );
                })()}
              </div>
              
              {/* Competition */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-white/90 text-xs">
                  <img src={getCompetitionLogo(nextGame.competition)} alt={nextGame.competition} className="h-4 w-4 object-contain" />
                  <span className="font-semibold">{nextGame.competition}{nextGame.stage && ` - ${nextGame.stage}`}</span>
                </div>
              </div>
              
              {/* Game Info */}
              <div className="flex items-center justify-center gap-4 text-white/90 text-xs">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3"/>
                  <span>{new Date(nextGame.date).toLocaleDateString('he-IL')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3"/>
                  <span>{new Date(nextGame.date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
              
              {/* Venue */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-white/90 text-xs">
                  <MapPin className="w-3 h-3"/>
                  <span className="max-w-48 truncate">{nextGame.venue}</span>
                </div>
              </div>
              
              {/* Buy Tickets Button */}
              <div className="flex justify-center">
                {nextGame.ticketLink ? (
                  <Button 
                    asChild 
                    className="bg-white text-team-primary hover:bg-gray-100 px-6 py-2 text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <a href={nextGame.ticketLink} target="_blank" rel="noopener noreferrer">
                      קנה כרטיסים
                    </a>
                  </Button>
                ) : (
                  <span className="text-white/80 text-xs">כרטיסים יימכרו בקרוב</span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content - News Feed */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <NewsFeed />
        </div>
      </section>

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

export default Index;
