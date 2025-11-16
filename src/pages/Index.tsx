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
      {[
        { label: "ימים", value: timeLeft.days },
        { label: "שעות", value: timeLeft.hours },
        { label: "דקות", value: timeLeft.minutes },
        { label: "שניות", value: timeLeft.seconds }
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="relative px-2 py-1.5 md:px-3 md:py-2 min-w-[42px] md:min-w-[56px] rounded-xl border border-cyan-300/60 bg-gradient-to-b from-white/15 via-white/5 to-white/0 text-white shadow-[0_0_15px_rgba(103,232,249,0.5)]">
            <div className="text-sm md:text-base font-bold tracking-tight">
              {item.value.toString().padStart(2, "0")}
            </div>
            <div className="text-[10px] md:text-xs opacity-80">{item.label}</div>
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
          </div>
        </div>
      ))}
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
      
      {/* Hero Section - Image Carousel (desktop and tablet only) */}
      <section className="hidden md:block relative h-72 md:h-[380px] overflow-hidden">
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

      {/* Next Game Countdown Section - compact, futuristic layout */}
      {nextGame && !isLoadingGame && (
        <section className="py-3 bg-gradient-to-r from-[#0f172a] via-[#020617] to-[#0b1120]">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-blue-600/60 via-indigo-600/50 to-sky-500/60 border border-cyan-300/40 shadow-[0_0_25px_rgba(59,130,246,0.75)] text-white rounded-2xl overflow-hidden">
              <CardContent className="px-3 py-2.5 md:px-5 md:py-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-5">
                  {/* Left: title + countdown */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] md:text-xs uppercase tracking-[0.12em] text-cyan-100/80">
                        NEXT MATCH
                      </span>
                      <span className="text-xs md:text-sm font-semibold">
                        עד המשחק הבא
                      </span>
                    </div>
                    <CountdownTimer targetDate={new Date(nextGame.date)} />
                  </div>

                  {/* Middle: Teams */}
                  <div className="flex items-center justify-center gap-3 md:gap-4">
                    {(() => {
                      const isHomeGame = nextGame.venue.includes("גרין") || nextGame.venue.includes("הגליל") || nextGame.venue.includes("טבריה");
                      const homeTeam = isHomeGame ? "עירוני טבריה" : nextGame.opponent;
                      const awayTeam = isHomeGame ? nextGame.opponent : "עירוני טבריה";
                      
                      return (
                        <>
                          <div className="flex items-center gap-1.5">
                            <img src={getTeamLogo(homeTeam)} alt={homeTeam} className="w-7 h-7 md:w-9 md:h-9 object-contain drop-shadow-[0_0_8px_rgba(15,23,42,0.8)]" />
                            <span className="hidden xs:inline text-xs md:text-sm font-semibold">
                              {homeTeam}
                            </span>
                          </div>
                          <span className="text-xs md:text-sm font-bold px-1.5 py-0.5 rounded-full bg-white/15 border border-white/30">
                            VS
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="hidden xs:inline text-xs md:text-sm font-semibold">
                              {awayTeam}
                            </span>
                            <img src={getTeamLogo(awayTeam)} alt={awayTeam} className="w-7 h-7 md:w-9 md:h-9 object-contain drop-shadow-[0_0_8px_rgba(15,23,42,0.8)]" />
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Right: Details + tickets */}
                  <div className="flex flex-col items-end gap-1 text-[11px] md:text-xs">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <img src={getCompetitionLogo(nextGame.competition)} alt={nextGame.competition} className="h-4 w-4 object-contain drop-shadow-[0_0_6px_rgba(15,23,42,0.9)]" />
                        <span className="font-semibold line-clamp-1">
                          {nextGame.competition}{nextGame.stage && ` - ${nextGame.stage}`}
                        </span>
                      </div>
                      <span className="hidden md:inline text-white/60">•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(nextGame.date).toLocaleDateString('he-IL')}</span>
                      </div>
                      <span className="text-white/60">•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(nextGame.date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="max-w-[130px] md:max-w-[190px] truncate">
                          {nextGame.venue}
                        </span>
                      </div>
                      {nextGame.ticketLink && (
                        <Button
                          asChild
                          size="sm"
                          className="h-7 px-3 bg-white text-team-primary hover:bg-gray-100 text-[11px] font-semibold rounded-full shadow-[0_0_12px_rgba(248,250,252,0.9)]"
                        >
                          <a href={nextGame.ticketLink} target="_blank" rel="noopener noreferrer">
                            קנה כרטיסים
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Main Content - News */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-right mb-3 text-gray-900">ALL NEWS</h2>
            <NewsFeed isCompact={true} />
          </div>
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
