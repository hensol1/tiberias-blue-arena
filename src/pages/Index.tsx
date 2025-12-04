import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Play, ArrowRight, ChevronRight, ChevronLeft, Instagram, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { getTeamLogo } from "@/lib/team-logo-map";
import { useAuth } from "@/hooks/use-auth";
import { useIsMobile } from "@/hooks/use-mobile";
import newSponsors from "@/assets/sponsors/newsponsers.png";
import NewsCard from "@/components/NewsCard";
import mainLogo from "@/assets/lovable-uploads/17488e86-af0c-4984-a0a1-de1aec2e3e4d.png";
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
import ItamarShabir from "@/assets/lovable-uploads/Itamar Shvir.png";
import PiraAbuAkla from "@/assets/lovable-uploads/Feras Abu Akel.png";
import ItanWolblum from "@/assets/lovable-uploads/Eitan Velblum.png";
import YoniKashon from "@/assets/lovable-uploads/Yonatan Hason.png";
import hen from "@/assets/lovable-uploads/Nehoray Chen.png";
import swisa from "@/assets/lovable-uploads/Yarin Swisa.png";
import baranes from "@/assets/lovable-uploads/Idan Baranes.png";
import DanielGolony from "@/assets/lovable-uploads/Daniel Joulani.png";
import MatanDegani from "@/assets/lovable-uploads/Matan Dgani.png";
import PeterMichael from "@/assets/lovable-uploads/Peter Michael.png";

// League table data - showing only relevant teams (team position + 1 above and 1 below)
const leagueTable = [
  {
    position: 9,
    team: "הפועל פ\"ת",
    played: 12,
    goalsDiff: -2,
    points: 13,
  },
  {
    position: 10,
    team: "עירוני טבריה",
    played: 12,
    goalsDiff: -17,
    points: 13,
  },
  {
    position: 11,
    team: "הפועל ק\"ש",
    played: 12,
    goalsDiff: -3,
    points: 12,
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

interface Player {
  name: string;
  position: string;
  number: number;
  age: number;
  image: string;
  country: string;
  appearances?: number;
  goals?: number;
  instagramLink?: string;
}

// Players data
const players: Player[] = [
  { name: "רוג'ריו סנטוס", position: "שוער", number: 1, age: 26, image: santos, country: "פורטוגל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "עידו שרון", position: "שוער", number: 22, age: 23, image: IdoSharon, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "ג'ונאס אבו גאנימה", position: "שוער", number: 33, age: 21, image: jonas, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "אונדז'יי באצ'ו", position: "הגנה", number: 37, age: 29, image: OndrejBaco, country: "צ'כיה", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "סמביניה", position: "הגנה", number: 4, age: 32, image: SambaKonte, country: "גינאה-ביסאו", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "עומר יצחק", position: "הגנה", number: 2, age: 24, image: OmerYitzhak, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "הארון שפסו", position: "הגנה", number: 99, age: 26, image: HaroonShapso, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "אלי בלילתי", position: "הגנה", number: 15, age: 31, image: EliBalilti, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "רון אונגר", position: "הגנה", number: 17, age: 23, image: RonUnger, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "דניאל גולני", position: "הגנה", number: 47, age: 22, image: DanielGolony, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "נהוראי חן", position: "הגנה", number: 74, age: 20, image: hen, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "יונתן חסון", position: "הגנה", number: 20, age: 20, image: YoniKashon, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "דויד קלטינס", position: "קשר", number: 3, age: 30, image: DavidKeltjens, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "פיראס אבו עקל", position: "קשר", number: 6, age: 28, image: PiraAbuAkla, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "מוחמד אוסמן", position: "קשר", number: 10, age: 31, image: Usman, country: "ניגריה", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "יונתן טפר", position: "קשר", number: 5, age: 24, image: YonatanTeper, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "ניב גוטליב", position: "קשר", number: 11, age: 22, image: NivGotliv, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "איתן וולבלום", position: "קשר", number: 8, age: 28, image: ItanWolblum, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "ירין סויסה", position: "קשר", number: 27, age: 20, image: swisa, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "מתן דגני", position: "קשר", number: 28, age: 20, image: MatanDegani, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "וואהיב חביבאללה", position: "התקפה", number: 14, age: 27, image: WahebHabiballah, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "סטניסלב בילנקי", position: "התקפה", number: 9, age: 26, image: StanislavBilenkyi, country: "אוקראינה", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "פיטר מייקל", position: "התקפה", number: 90, age: 27, image: PeterMichael, country: "ניגריה", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "איתמר שבירו", position: "התקפה", number: 19, age: 27, image: ItamarShabir, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
  { name: "עידן ברנס", position: "התקפה", number: 18, age: 21, image: baranes, country: "ישראל", instagramLink: "https://www.instagram.com/ironitiberiasf.c/" },
];

const Index = () => {
  const [nextGame, setNextGame] = useState<any>(null);
  const [lastGame, setLastGame] = useState<any>(null);
  const [featuredNews, setFeaturedNews] = useState<any[]>([]);
  const [allNews, setAllNews] = useState<any[]>([]);
  const [displayedNewsCount, setDisplayedNewsCount] = useState(3);
  const [latestVideos, setLatestVideos] = useState<VideoItem[]>([]);
  const [featuredPlayer, setFeaturedPlayer] = useState<Player | null>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isLoadingGame, setIsLoadingGame] = useState(true);
  const playerCarouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [showAddNewsForm, setShowAddNewsForm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [newNews, setNewNews] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "כללי",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop"
  });
  const { toast } = useToast();
  const { isAuthenticated, hasPermission } = useAuth();
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
        // Store all news items
        setAllNews(newsList);
        // Get first news item for hero
        setFeaturedNews(newsList.slice(0, 1));
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

  // Select featured player (rotates every time component mounts or refreshes)
  useEffect(() => {
    const selectFeaturedPlayer = () => {
      // Use current time to rotate players
      const now = new Date();
      const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
      const playerIndex = dayOfYear % players.length;
      setFeaturedPlayer(players[playerIndex]);
      setCurrentPlayerIndex(playerIndex);
    };

    selectFeaturedPlayer();
  }, []);

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swipe left - next player
      setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
    } else if (distance < -minSwipeDistance) {
      // Swipe right - previous player
      setCurrentPlayerIndex((prev) => (prev - 1 + players.length) % players.length);
    }
  };

  // Navigate to next/previous player
  const goToNextPlayer = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
  };

  const goToPreviousPlayer = () => {
    setCurrentPlayerIndex((prev) => (prev - 1 + players.length) % players.length);
  };

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

  // Handle image upload for news
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setNewNews({...newNews, image: result});
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle add news
  const handleAddNews = async () => {
    if (!newNews.title || !newNews.excerpt) {
      toast({ title: "נא למלא את כל השדות", variant: "destructive" });
      return;
    }

    if (!db) {
      toast({ title: "Firebase לא זמין - לא ניתן להוסיף חדשות", variant: "destructive" });
      return;
    }

    try {
      const newsCollectionRef = collection(db, "news");
      const docRef = await addDoc(newsCollectionRef, {
        ...newNews,
        date: new Date().toISOString(),
        views: 0,
        featured: false,
      });
      
      // Refresh news list
      const q = query(newsCollectionRef, orderBy("date", "desc"));
      const newsSnapshot = await getDocs(q);
      const newsList = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
      setAllNews(newsList);
      setFeaturedNews(newsList.slice(0, 1));

      setShowAddNewsForm(false);
      setNewNews({ title: "", excerpt: "", content: "", category: "כללי", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop" });
      setImageFile(null);
      setImagePreview("");
      toast({ title: "החדשה נוספה בהצלחה!" });
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({ title: "שגיאה בהוספת חדשה", variant: "destructive" });
    }
  };

  const categories = ["כללי", "משחקים", "העברות", "נוער", "אימונים"];

  // Handle delete news
  const handleDeleteNews = async (id: string) => {
    if (!db) {
      toast({ title: "Firebase לא זמין - לא ניתן למחוק חדשות", variant: "destructive" });
      return;
    }

    try {
      const newsDoc = doc(db, "news", id);
      await deleteDoc(newsDoc);
      
      // Refresh news list
      const newsCollection = collection(db, "news");
      const q = query(newsCollection, orderBy("date", "desc"));
      const newsSnapshot = await getDocs(q);
      const newsList = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
      setAllNews(newsList);
      setFeaturedNews(newsList.slice(0, 1));
      
      toast({ title: "החדשה נמחקה בהצלחה" });
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast({ title: "שגיאה במחיקת חדשה", variant: "destructive" });
    }
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
  // Get news items for grid (skip first one which is used for hero, show up to displayedNewsCount)
  const gridNews = allNews.slice(1, displayedNewsCount + 1) || [];
  const hasMoreNews = allNews.length > displayedNewsCount + 1;

  // Handle load more news
  const handleLoadMore = () => {
    setDisplayedNewsCount(prev => prev + 3);
  };

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
      
      {/* Sponsors Section - Under Header */}
      <section className="py-6 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <img src={newSponsors} alt="Sponsors" className="w-full max-w-6xl object-contain" />
          </div>
        </div>
      </section>
      
      {/* Main Hero Section with Sidebar */}
      <section className="bg-white">
        <div className="container mx-auto px-0">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 relative">
            {/* Hero Image */}
            <div className="lg:col-span-3 relative">
              {heroNews ? (
                <Link to={`/article/${heroNews.id}`} className="block h-full">
                  <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden group cursor-pointer">
                    <img
                      src={heroNews.image}
                      alt={heroNews.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    
                    {/* Text Overlay - directly on the image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 pointer-events-none">
                      <div className="group pointer-events-auto">
                        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight group-hover:text-blue-200 transition-colors">
                          {heroNews.title}
                        </h1>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">אין חדשות להצגה</span>
                </div>
              )}
            </div>

            {/* Right: Dark Blue/Black Sidebar with Last Match, Next Match, and League Table */}
            <div className="lg:col-span-2 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6 lg:p-6 text-white lg:h-[500px] flex flex-col lg:overflow-hidden">
              <div className="flex flex-col gap-2 md:gap-2 lg:gap-2.5 flex-1 min-h-0">
                {/* Last Match Section */}
                {lastGame && (
                  <div className="bg-white/5 rounded-lg p-2.5 md:p-3 lg:p-2.5 border border-white/10 flex-shrink-0">
                    <div className="text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5 md:mb-2 lg:mb-1.5">
                      משחק אחרון
                    </div>
                    <div className="space-y-1.5 md:space-y-2 lg:space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-2.5">
                          <img 
                            src={getTeamLogo(lastGame.opponent)} 
                            alt={lastGame.opponent} 
                            className="w-6 h-6 md:w-7 md:h-7 object-contain bg-white/10 p-1 rounded"
                          />
                          <span className="text-xs md:text-sm font-semibold">{lastGame.opponent}</span>
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <span className="text-sm md:text-base font-bold">
                            {formatScore(lastGame.score, lastGame.won)}
                          </span>
                          <span className="text-[10px] md:text-xs text-white/60 bg-white/5 px-1.5 md:px-2 py-0.5 rounded">(A)</span>
                        </div>
                      </div>
                      <div className="flex justify-center mt-2 lg:mt-1.5">
                        <Button 
                          size="lg" 
                          className="w-full px-6 py-3 lg:px-4 lg:py-2 text-base md:text-lg lg:text-sm font-semibold bg-red-600 hover:bg-red-700 text-white"
                          asChild
                        >
                          <Link to="/tv">
                            <Play className="w-5 h-5 md:w-6 md:h-6 lg:w-4 lg:h-4 ml-2 lg:ml-1.5" />
                            תקציר
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Next Match Section */}
                {nextGame && (
                  <div className="bg-white/5 rounded-lg p-2.5 md:p-3 lg:p-2.5 border border-white/10 flex-shrink-0">
                    <div className="text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5 md:mb-2 lg:mb-1.5">
                      המשחק הבא
                    </div>
                    <div className="space-y-1.5 md:space-y-2 lg:space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-2.5">
                          <img 
                            src={getTeamLogo(nextGame.opponent)} 
                            alt={nextGame.opponent} 
                            className="w-6 h-6 md:w-7 md:h-7 object-contain bg-white/10 p-1 rounded"
                          />
                          <span className="text-xs md:text-sm font-semibold">{nextGame.opponent}</span>
                        </div>
                        <span className="text-[10px] md:text-xs text-white/60 bg-white/5 px-1.5 md:px-2 py-0.5 rounded">(H)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] md:text-xs text-white/90 font-medium">
                          {new Date(nextGame.date).toLocaleDateString('he-IL', { 
                            weekday: 'short', 
                            day: 'numeric', 
                            month: 'short' 
                          }).toUpperCase()}
                        </div>
                        <div className="text-[10px] md:text-xs text-white/90 font-medium">
                          {new Date(nextGame.date).toLocaleTimeString('he-IL', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                      {nextGame.ticketLink && (
                        <div className="flex justify-center mt-2 lg:mt-1.5">
                          <Button 
                            size="lg" 
                            className="w-full px-6 py-3 lg:px-4 lg:py-2 text-base md:text-lg lg:text-sm font-semibold bg-red-600 hover:bg-red-700 text-white"
                            asChild
                          >
                            <a href={nextGame.ticketLink} target="_blank" rel="noopener noreferrer">
                              כרטיסים
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* League Table Section */}
                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                  <div className="text-xs font-bold text-white uppercase tracking-wider mb-1 lg:mb-1.5 flex-shrink-0">
                    טבלת הליגה
                  </div>
                <div className="flex-1 overflow-x-auto min-h-0">
                  <table className="w-full text-[10px] md:text-xs lg:text-[11px]">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-0.5 md:py-1 lg:py-0.5 text-white/80 font-semibold">POS</th>
                        <th className="text-left py-0.5 md:py-1 lg:py-0.5 text-white/80 font-semibold">CLUB</th>
                        <th className="text-center py-0.5 md:py-1 lg:py-0.5 text-white/80 font-semibold">PL</th>
                        <th className="text-center py-0.5 md:py-1 lg:py-0.5 text-white/80 font-semibold">GD</th>
                        <th className="text-center py-0.5 md:py-1 lg:py-0.5 text-white/80 font-semibold">PTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leagueTable.map((team) => (
                        <tr 
                          key={team.position}
                          className={`border-b border-white/10 ${
                            team.team === "עירוני טבריה" ? "bg-blue-700/50 font-semibold" : ""
                          }`}
                        >
                          <td className="py-0.5 md:py-1 lg:py-0.5">{team.position}</td>
                          <td className="py-0.5 md:py-1 lg:py-0.5">
                            <div className="flex items-center gap-1 md:gap-2 lg:gap-1.5">
                              <img 
                                src={getTeamLogo(team.team)} 
                                alt={team.team} 
                                className="w-5 h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 object-contain"
                              />
                              <span className="text-[10px] md:text-xs lg:text-[11px]">{team.team}</span>
                            </div>
                          </td>
                          <td className="text-center py-0.5 md:py-1 lg:py-0.5">{team.played}</td>
                          <td className="text-center py-0.5 md:py-1 lg:py-0.5">{team.goalsDiff > 0 ? '+' : ''}{team.goalsDiff}</td>
                          <td className="text-center py-0.5 md:py-1 lg:py-0.5 font-semibold">{team.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-right text-gray-900">חדשות</h2>
            {isAuthenticated && hasPermission('add_news') && db && (
              <Button 
                onClick={() => setShowAddNewsForm(!showAddNewsForm)} 
                className="bg-team-primary hover:bg-team-secondary"
              >
                <Plus className="h-4 w-4 ml-2" />
                {showAddNewsForm ? "בטל" : "הוסף חדשה"}
              </Button>
            )}
          </div>

          {/* Add News Form */}
          {showAddNewsForm && (
            <Card className="mb-6 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-right">הוסף חדשה חדשה</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">כותרת</label>
                  <Input
                    value={newNews.title}
                    onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                    placeholder="הכנס כותרת לחדשה..."
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">תקציר</label>
                  <Textarea
                    value={newNews.excerpt}
                    onChange={(e) => setNewNews({...newNews, excerpt: e.target.value})}
                    placeholder="הכנס תקציר קצר..."
                    className="text-right"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">תוכן מלא</label>
                  <Textarea
                    value={newNews.content}
                    onChange={(e) => setNewNews({...newNews, content: e.target.value})}
                    placeholder="הכנס את תוכן הכתבה המלא..."
                    className="text-right"
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">קטגוריה</label>
                  <select 
                    value={newNews.category}
                    onChange={(e) => setNewNews({...newNews, category: e.target.value})}
                    className="w-full p-2 border rounded-md text-right"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">תמונה</label>
                  <div className="flex flex-col space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="text-right"
                    />
                    {imagePreview && (
                      <div className="relative w-full h-32 rounded-md overflow-hidden">
                        <img 
                          src={imagePreview} 
                          alt="תצוגה מקדימה" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2 space-x-reverse">
                  <Button 
                    onClick={handleAddNews}
                    className="bg-team-primary hover:bg-team-secondary"
                  >
                    פרסם חדשה
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddNewsForm(false)}
                  >
                    ביטול
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {isLoadingNews ? (
            <div className="text-center py-12">טוען חדשות...</div>
          ) : gridNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridNews.map((item) => (
                <div key={item.id} className="group relative">
                  {/* Delete Button */}
                  {isAuthenticated && hasPermission('delete_news') && db && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 left-2 z-10 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="מחק חדשה"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent dir="rtl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>האם אתה בטוח?</AlertDialogTitle>
                          <AlertDialogDescription>
                            פעולה זו תמחק את החדשה לצמיתות. לא ניתן לשחזר את הפעולה.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>ביטול</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteNews(item.id)} 
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            מחק
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                  
                  <Link 
                    to={`/article/${item.id}`}
                    className="block cursor-pointer"
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
                      
                      {/* Text Block - White background */}
                      <div className="p-5 bg-white">
                        {/* Title */}
                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                          {item.title}
                        </h3>
                        
                        {/* Category and Metadata */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Category */}
                          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                            {getCategoryLabel(item.category)}
                          </div>
                          
                          {/* Metadata */}
                          <div className="text-xs text-gray-500 font-normal">
                            {formatNewsDate(item.date)} // {getReadingTime(item.content || item.excerpt || '')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">אין חדשות להצגה</p>
            </div>
          )}

          {/* Load More Button */}
          {!isLoadingNews && hasMoreNews && (
            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleLoadMore}
                className="bg-team-primary hover:bg-team-secondary text-white px-6 py-2"
              >
                טען עוד
              </Button>
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
                  const getThumbnailUrl = (quality: 'maxresdefault' | 'hqdefault' | 'sddefault' = 'maxresdefault') => {
                    return videoId ? `https://img.youtube.com/vi/${videoId}/${quality}.jpg` : '';
                  };
                  const thumbnailUrl = getThumbnailUrl('maxresdefault');
                  
                  const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const img = e.currentTarget;
                    if (img.src.includes('maxresdefault')) {
                      img.src = getThumbnailUrl('hqdefault');
                    } else if (img.src.includes('hqdefault')) {
                      img.src = getThumbnailUrl('sddefault');
                    }
                  };
                  
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
                            onError={handleThumbnailError}
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

      {/* Players Carousel Section */}
      {players.length > 0 && (
        <section className="bg-white py-8 md:py-12 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="relative">
              {/* Carousel Container */}
              <div 
                ref={playerCarouselRef}
                className="relative bg-white rounded-lg shadow-xl overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {players.map((player, index) => {
                  if (index !== currentPlayerIndex) return null;
                  
                  return (
                    <div key={player.name} className="relative">
                      {/* Mobile Layout */}
                      <div className="lg:hidden">
                        <div className="grid grid-cols-2 gap-0">
                          {/* Left Section - White Background */}
                          <div className="relative bg-white p-4 md:p-6 flex flex-col justify-between min-h-[300px] md:min-h-[400px]">
                            <div className="relative z-10">
                              {/* Player Number */}
                              <div className="text-5xl md:text-6xl font-bold text-red-600 mb-2 leading-none">
                                {player.number}
                              </div>
                              
                              {/* Player Name */}
                              <div className="mb-3">
                                <div className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-tight">
                                  {player.name.split(' ')[0]}
                                </div>
                                <div className="text-xl md:text-2xl font-bold text-gray-900 uppercase tracking-tight">
                                  {player.name.split(' ').slice(1).join(' ')}
                                </div>
                              </div>
                              
                              {/* Position */}
                              <div className="mb-4 inline-block border-2 border-blue-500 px-3 py-1 rounded">
                                <span className="text-xs font-semibold text-gray-900 uppercase">
                                  {player.position}
                                </span>
                              </div>
                            </div>

                            {/* Bottom Section */}
                            <div className="relative z-10 mt-auto">
                              <Link to="/team" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                                <span className="text-xs md:text-sm font-semibold uppercase">כל השחקנים</span>
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                              {player.instagramLink && (
                                <div className="mt-3">
                                  <a 
                                    href={player.instagramLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-flex items-center justify-center w-8 h-8"
                                  >
                                    <Instagram className="w-6 h-6 text-blue-600" />
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right Section - Player Image */}
                          <div className="relative flex items-center justify-center bg-gradient-to-br from-blue-50 to-white overflow-hidden">
                            <img
                              src={player.image}
                              alt={player.name}
                              className="w-full h-full object-cover object-center min-h-[300px] md:min-h-[400px]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden lg:grid grid-cols-2 gap-0" style={{ minHeight: '500px' }}>
                        {/* Left Section - White Background */}
                        <div className="relative bg-white p-8 lg:p-12 flex flex-col justify-between">
                          {/* Player Number */}
                          <div className="text-8xl md:text-9xl font-bold text-red-600 mb-4 leading-none">
                            {player.number}
                          </div>
                          
                          {/* Player Name */}
                          <div className="mb-4">
                            <div className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight">
                              {player.name.split(' ')[0]}
                            </div>
                            <div className="text-4xl md:text-5xl font-bold text-gray-900 uppercase tracking-tight">
                              {player.name.split(' ').slice(1).join(' ')}
                            </div>
                          </div>
                          
                          {/* Position */}
                          <div className="mb-8 inline-block border-2 border-blue-500 px-4 py-2 rounded">
                            <span className="text-sm font-semibold text-gray-900 uppercase">
                              {player.position}
                            </span>
                          </div>

                          {/* Bottom Links */}
                          <div className="mt-auto flex items-center justify-between">
                            <Link to="/team" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                              <span className="text-sm font-semibold uppercase">כל השחקנים</span>
                              <ArrowRight className="w-5 h-5" />
                            </Link>
                            {player.instagramLink && (
                              <a 
                                href={player.instagramLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center justify-center w-10 h-10 border-2 border-gray-300 rounded hover:border-gray-400 transition-colors"
                              >
                                <Instagram className="w-5 h-5 text-gray-600" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Right Section - Player Image */}
                        <div className="relative flex items-center justify-center bg-gradient-to-br from-blue-50 to-white overflow-hidden">
                          <img
                            src={player.image}
                            alt={player.name}
                            className="w-full h-full object-cover object-center min-h-[500px]"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
                <button
                  onClick={goToPreviousPlayer}
                  className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all z-10 items-center justify-center"
                  aria-label="Previous player"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNextPlayer}
                  className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all z-10 items-center justify-center"
                  aria-label="Next player"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {players.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPlayerIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentPlayerIndex ? 'bg-red-600 w-6' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to player ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sponsors Section - Bottom of the Page */}
      <section className="py-10 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <img src={newSponsors} alt="Sponsors" className="w-full max-w-6xl object-contain" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
