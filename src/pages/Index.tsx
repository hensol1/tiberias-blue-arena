import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { getTeamLogo } from "@/lib/team-logo-map";
import burgerSaloonLogo from "@/assets/sponsors/burger-saloon.jpg";
import dorotLogo from "@/assets/sponsors/dorot.png";
import goOutLogo from "@/assets/sponsors/go-out.png";
import nofGinosarLogo from "@/assets/sponsors/nof-ginosar.png";
import leagueManagerLogo from "@/assets/sponsors/league-manager.png";
import { useIsMobile } from "@/hooks/use-mobile";
import mobileSponsors from "@/assets/sponsors/mobile sponsors.png";
import NewsCard from "@/components/NewsCard";

// League table data - showing only relevant teams (team position + 1 above and 1 below)
const leagueTable = [
  {
    position: 11,
    team: "הפועל פ\"ת",
    played: 10,
    goalsDiff: -2,
    points: 11,
  },
  {
    position: 12,
    team: "עירוני טבריה",
    played: 10,
    goalsDiff: -14,
    points: 10,
  },
  {
    position: 13,
    team: "הפועל י-ם",
    played: 10,
    goalsDiff: -11,
    points: 4,
  },
];

interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  category: string;
  date: string;
  views?: number;
  duration?: string;
}

const Index = () => {
  const [nextGame, setNextGame] = useState<any>(null);
  const [lastGame, setLastGame] = useState<any>(null);
  const [featuredNews, setFeaturedNews] = useState<any[]>([]);
  const [latestVideos, setLatestVideos] = useState<VideoItem[]>([]);
  const [isLoadingGame, setIsLoadingGame] = useState(true);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const videoScrollRef = useRef<HTMLDivElement>(null);

  // Fetch games (next and last)
  useEffect(() => {
    const fetchGames = async () => {
      if (!db) {
        console.warn("Firebase not available.");
        setIsLoadingGame(false);
        return;
      }
      try {
        const gamesCollection = collection(db, "games");
        const q = query(gamesCollection, orderBy("date", "desc"));
        const gamesSnapshot = await getDocs(q);
        const gamesList = gamesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
        
        // Filter for senior team games
        const seniorGames = gamesList.filter((g: any) => g.team === 'senior');
        
        // Get last game (with result)
        const lastGameData = seniorGames.find((g: any) => g.status === 'result');
        setLastGame(lastGameData || null);
        
        // Get next game (upcoming)
        const nextGameData = seniorGames.find((g: any) => g.status === 'upcoming');
        setNextGame(nextGameData || null);
      } catch (error) {
        console.error("Error fetching games:", error);
        toast({ title: "שגיאה בטעינת המשחקים", variant: "destructive" });
      } finally {
        setIsLoadingGame(false);
      }
    };

    fetchGames();
  }, [toast]);

  // Fetch featured news for hero and grid
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoadingNews(true);
      if (!db) {
        setIsLoadingNews(false);
        return;
      }
      try {
        const newsCollection = collection(db, "news");
        const q = query(newsCollection, orderBy("date", "desc"));
        const newsSnapshot = await getDocs(q);
        const newsList = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
        // Get first 7 news items (1 for hero + 6 for grid)
        setFeaturedNews(newsList.slice(0, 7));
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

  // Fetch latest videos
  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoadingVideos(true);
      if (!db) {
        setIsLoadingVideos(false);
        return;
      }
      try {
        const videosCollection = collection(db, "videos");
        const q = query(videosCollection, orderBy("date", "desc"));
        const videosSnapshot = await getDocs(q);
        const videosList = videosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as VideoItem[];
        // Get first 3 videos for the carousel
        setLatestVideos(videosList.slice(0, 3));
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoadingVideos(false);
      }
    };

    fetchVideos();
  }, []);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Format date for video metadata
  const formatVideoDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "24 HOURS AGO";
    if (diffDays <= 7) return `${diffDays} DAYS AGO`;
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
  };

  // Format date for news metadata
  const formatNewsDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffHours < 1) return "JUST NOW";
    if (diffHours < 24) return `${diffHours} HOUR${diffHours > 1 ? 'S' : ''} AGO`;
    if (diffDays === 1) return "YESTERDAY";
    if (diffDays <= 7) return `${diffDays} DAYS AGO`;
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
  };

  // Get category label in English
  const getCategoryLabel = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      'כללי': 'FEATURES',
      'משחקים': 'MATCHES',
      'אימונים': 'TRAINING',
      'העברות': 'TRANSFERS',
      'נוער': 'YOUTH',
      'ראיונות': 'INTERVIEWS',
      'תמונות': 'PICTURE SPECIAL',
      'מועדון': 'CLUB',
      'קרן': 'FOUNDATION'
    };
    return categoryMap[category] || category.toUpperCase();
  };

  // Calculate reading time (estimate: 200 words per minute)
  const getReadingTime = (text: string): string => {
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} MINS READ`;
  };

  // Scroll videos horizontally
  const scrollVideos = (direction: 'left' | 'right') => {
    if (videoScrollRef.current) {
      const scrollAmount = 400;
      videoScrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Get featured news for hero and grid
  const heroNews = featuredNews[0] || null;
  const gridNews = featuredNews.slice(1, 7) || [];

  // Format score for display
  const formatScore = (score: string, won: boolean | null) => {
    if (!score) return "N/A";
    const parts = score.split('-');
    if (parts.length !== 2) return score;
    const [ourScore, theirScore] = parts;
    return `${ourScore} - ${theirScore}`;
  };

  // Get result text
  const getResultText = (game: any) => {
    if (!game.score) return "N/A";
    if (game.won === true) return "WIN";
    if (game.won === false) return "LOSS";
    return "DRAW";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Main Hero Section with Sidebar */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Hero Image with Text Overlay */}
            <div className="lg:col-span-2">
              {heroNews ? (
                <Link to={`/article/${heroNews.id}`} className="block">
                  <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg group cursor-pointer">
                    <img
                      src={heroNews.image}
                      alt={heroNews.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="text-xs font-semibold text-white uppercase tracking-wider bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                        {heroNews.category || "FIRST-TEAM"}
                      </span>
                    </div>

                    {/* Text Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                        {heroNews.title}
                      </h1>
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <span>{new Date(heroNews.date).toLocaleDateString('he-IL')}</span>
                        <span>•</span>
                        <span>3 MINS READ</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">אין חדשות להצגה</span>
                </div>
              )}
            </div>

            {/* Right: Sidebar with Last Match, Next Match, and League Table */}
            <div className="lg:col-span-1 space-y-4">
              {/* Last Match Section */}
              {lastGame && (
                <Card className="border-2 border-gray-200">
                  <CardContent className="p-4">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                      משחק אחרון
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img 
                            src={getTeamLogo(lastGame.opponent)} 
                            alt={lastGame.opponent} 
                            className="w-8 h-8 object-contain"
                          />
                          <span className="text-sm font-semibold">{lastGame.opponent}</span>
                        </div>
                        <span className="text-xs text-gray-500">(A)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-lg font-bold ${
                          lastGame.won === true ? 'text-green-600' : 
                          lastGame.won === false ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {getResultText(lastGame)} {formatScore(lastGame.score, lastGame.won)}
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full bg-red-600 hover:bg-red-700 text-white border-red-600"
                        asChild
                      >
                        <Link to="/tv">
                          <Play className="w-4 h-4 ml-2" />
                          תקציר
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Next Match Section */}
              {nextGame && (
                <Card className="border-2 border-gray-200">
                  <CardContent className="p-4">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                      המשחק הבא
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img 
                            src={getTeamLogo(nextGame.opponent)} 
                            alt={nextGame.opponent} 
                            className="w-8 h-8 object-contain"
                          />
                          <span className="text-sm font-semibold">{nextGame.opponent}</span>
                        </div>
                        <span className="text-xs text-gray-500">(H)</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(nextGame.date).toLocaleDateString('he-IL', { 
                          weekday: 'short', 
                          day: 'numeric', 
                          month: 'short' 
                        }).toUpperCase()}, {new Date(nextGame.date).toLocaleTimeString('he-IL', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      {nextGame.ticketLink && (
                        <Button 
                          size="sm" 
                          className="w-full bg-red-600 hover:bg-red-700 text-white"
                          asChild
                        >
                          <a href={nextGame.ticketLink} target="_blank" rel="noopener noreferrer">
                            כרטיסים
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* League Table Section */}
              <Card className="border-2 border-gray-200">
                <CardContent className="p-4">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    טבלת הליגה
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <tbody>
                        {leagueTable.map((team) => (
                          <tr 
                            key={team.position}
                            className={`border-b border-gray-100 ${
                              team.team === "עירוני טבריה" ? "bg-blue-50 font-semibold" : ""
                            }`}
                          >
                            <td className="py-2">{team.position}</td>
                            <td className="py-2">{team.team}</td>
                            <td className="text-center py-2">{team.played}</td>
                            <td className="text-center py-2">{team.goalsDiff > 0 ? '+' : ''}{team.goalsDiff}</td>
                            <td className="text-center py-2 font-semibold">{team.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-right mb-6 text-gray-900">חדשות</h2>
          {isLoadingNews ? (
            <div className="text-center py-12">טוען חדשות...</div>
          ) : gridNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridNews.map((item) => (
                <Link 
                  key={item.id} 
                  to={`/article/${item.id}`}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                    {/* Image */}
                    <div className="relative w-full h-64 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Text Block */}
                    <div className="p-5 bg-white">
                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                        {item.title}
                      </h3>
                      
                      {/* Category */}
                      <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                        {getCategoryLabel(item.category)}
                      </div>
                      
                      {/* Metadata */}
                      <div className="text-xs text-gray-500 font-normal">
                        {formatNewsDate(item.date)} // {getReadingTime(item.content || item.excerpt || '')}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">אין חדשות להצגה</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest Videos Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12 relative overflow-hidden">
        {/* Background watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 right-20 text-9xl font-bold text-white">TV טבריה</div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              טבריה TV
            </h2>
            <Link to="/tv">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 flex items-center gap-2 rounded-md">
                צפה בכל הסרטונים
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Video Carousel */}
          {isLoadingVideos ? (
            <div className="text-center py-12 text-white">טוען סרטונים...</div>
          ) : latestVideos.length > 0 ? (
            <div className="relative">
              <div 
                ref={videoScrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {latestVideos.map((video) => {
                  const videoId = getYouTubeVideoId(video.youtubeUrl);
                  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
                  
                  return (
                    <Link 
                      key={video.id} 
                      to={`/video/${video.id}`}
                      className="flex-shrink-0 w-full md:w-[400px] lg:w-[450px] group cursor-pointer"
                    >
                      <div className="relative">
                        {/* Thumbnail */}
                        <div className="relative w-full h-[250px] md:h-[280px] overflow-hidden rounded-lg">
                          <img
                            src={thumbnailUrl}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                          
                          {/* Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors shadow-2xl">
                              <Play className="w-10 h-10 text-white ml-1" fill="white" />
                            </div>
                          </div>

                          {/* Duration */}
                          {video.duration && (
                            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded text-white text-sm font-semibold">
                              ▷ {video.duration}
                            </div>
                          )}
                        </div>

                        {/* Title and Metadata */}
                        <div className="mt-4">
                          <h3 className="text-white text-lg font-semibold mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                            {video.title}
                          </h3>
                          <div className="text-gray-400 text-sm">
                            {video.category.toUpperCase()} {formatVideoDate(video.date)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Navigation Arrow */}
              {latestVideos.length > 3 && (
                <button
                  onClick={() => scrollVideos('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-6 rounded-l-lg transition-colors z-20 shadow-lg"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-10 h-10" />
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-white">
              <p>אין סרטונים להצגה</p>
            </div>
          )}
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
