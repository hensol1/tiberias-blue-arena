import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Trophy, Plus, Edit, Trash2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import AddGameDialog from "@/components/AddGameDialog";
import { getTeamLogo } from "@/lib/team-logo-map";
import { getCompetitionLogo } from "@/lib/competition-logo-map";
import { Separator } from "@/components/ui/separator";
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
import burgerSaloonLogo from "@/assets/sponsors/burger-saloon.jpg";
import dorotLogo from "@/assets/sponsors/dorot.png";
import goOutLogo from "@/assets/sponsors/go-out.png";
import nofGinosarLogo from "@/assets/sponsors/nof-ginosar.png";
import leagueManagerLogo from "@/assets/sponsors/league-manager.png";
import { useIsMobile } from "@/hooks/use-mobile";
import mobileSponsors from "@/assets/sponsors/mobile sponsors.png";
import fansHero from "@/assets/lovable-uploads/fans-hero.jpg";

const Games = () => {
  const [selectedTeam, setSelectedTeam] = useState<'senior' | 'youth'>('senior');
  const [allGames, setAllGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingGame, setEditingGame] = useState<any | null>(null);

  const { isAuthenticated, hasPermission } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Israeli Premier League Lower Playoff Table - Round 33
  const lowerPlayoffTable = [
    { position: 7, team: "הפועל ירושלים", played: 33, won: 11, drawn: 11, lost: 11, goalsFor: 47, goalsAgainst: 42, points: 44 },
    { position: 8, team: "מכבי בני ריינה", played: 33, won: 12, drawn: 5, lost: 16, goalsFor: 36, goalsAgainst: 43, points: 41 },
    { position: 9, team: "עירוני קרית שמונה", played: 33, won: 11, drawn: 4, lost: 18, goalsFor: 32, goalsAgainst: 52, points: 37 },
    { position: 10, team: "איחוד בני סכנין", played: 33, won: 10, drawn: 7, lost: 16, goalsFor: 26, goalsAgainst: 44, points: 36 },
    { position: 11, team: "מ.ס. אשדוד", played: 33, won: 8, drawn: 11, lost: 14, goalsFor: 48, goalsAgainst: 55, points: 35 },
    { position: 12, team: "עירוני טבריה", played: 33, won: 8, drawn: 11, lost: 14, goalsFor: 28, goalsAgainst: 45, points: 35 },
    { position: 13, team: "מכבי פתח תקוה", played: 33, won: 8, drawn: 9, lost: 16, goalsFor: 31, goalsAgainst: 50, points: 33 },
    { position: 14, team: "הפועל חדרה", played: 33, won: 5, drawn: 12, lost: 16, goalsFor: 31, goalsAgainst: 57, points: 27 },
  ];

  const getFormIcon = (result: string) => {
    switch (result) {
      case 'W': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'D': return <Minus className="w-3 h-3 text-yellow-500" />;
      case 'L': return <TrendingDown className="w-3 h-3 text-red-500" />;
      default: return null;
    }
  };

  useEffect(() => {
    const fetchGames = async () => {
      if (!db) {
        console.warn("Firebase not available. Using hardcoded data.");
        // We can add fallback data here if needed
        setIsLoading(false);
        return;
      }
      try {
        const gamesCollection = collection(db, "games");
        const q = query(gamesCollection, orderBy("date", "desc"));
        const gamesSnapshot = await getDocs(q);
        const gamesList = gamesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllGames(gamesList);
      } catch (error) {
        console.error("Error fetching games:", error);
        toast({ title: "שגיאה בטעינת המשחקים", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [toast]);

  const handleGameAdded = (newGame: any) => {
    setAllGames(prev => [newGame, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const handleGameUpdated = (updatedGame: any) => {
    setAllGames(prev => prev.map(g => g.id === updatedGame.id ? updatedGame : g));
  };
  
  const handleDeleteGame = async (gameId: string) => {
    if (!hasPermission('delete_game')) {
        toast({ title: "אין לך הרשאה למחוק משחקים", variant: "destructive" });
        return;
    }
    try {
        await deleteDoc(doc(db, "games", gameId));
        setAllGames(prev => prev.filter(g => g.id !== gameId));
        toast({ title: "המשחק נמחק בהצלחה" });
    } catch (error) {
        console.error("Error deleting game: ", error);
        toast({ title: "שגיאה במחיקת המשחק", variant: "destructive" });
    }
  };

  const openEditDialog = (game: any) => {
    setEditingGame(game);
    setShowAddDialog(true);
  };
  
  const closeAddOrEditDialog = () => {
    setShowAddDialog(false);
    setEditingGame(null);
  };

  const upcomingGames = allGames.filter(g => g.team === selectedTeam && g.status === 'upcoming');
  const recentResults = allGames.filter(g => g.team === selectedTeam && g.status === 'result');

  // Sort upcoming games by date and separate the next game
  const sortedUpcomingGames = upcomingGames.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const nextGame = sortedUpcomingGames.length > 0 ? sortedUpcomingGames[0] : null;
  const remainingUpcomingGames = sortedUpcomingGames.slice(1);

  const teamName = selectedTeam === 'senior' ? 'הקבוצה הבוגרת' : 'קבוצת הנוער';

  const getResultBadge = (won: boolean | null) => {
    if (won === true) return <Badge className="bg-green-500 hover:bg-green-500">ניצחון</Badge>;
    if (won === false) return <Badge className="bg-red-500 hover:bg-red-500">הפסד</Badge>;
    return <Badge className="bg-yellow-500 hover:bg-yellow-500">תיקו</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full">
        <div className="relative h-64 md:h-96">
          <img
            src={fansHero}
            alt="אוהדים עירוני טבריה"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center z-10">
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Team Selection Buttons */}
        <section className="mb-8 flex justify-center items-center gap-4">
            <div className="flex items-center space-x-2 space-x-reverse bg-gray-200/50 backdrop-blur-md rounded-full p-2 border border-gray-300/60 shadow-inner">
              <Button
                variant="ghost"
                onClick={() => setSelectedTeam('senior')}
                className={`px-8 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                  selectedTeam === 'senior' 
                    ? "bg-white text-team-primary shadow-md" 
                    : "text-team-primary/70 hover:text-team-primary"
                }`}
              >
                הקבוצה הבוגרת
              </Button>
              <Button
                variant="ghost"
                onClick={() => setSelectedTeam('youth')}
                className={`px-8 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                  selectedTeam === 'youth' 
                    ? "bg-white text-team-primary shadow-md" 
                    : "text-team-primary/70 hover:text-team-primary"
                }`}
              >
                קבוצת הנוער
              </Button>
          </div>
            {isAuthenticated && hasPermission('add_game') && (
                <Button onClick={() => setShowAddDialog(true)} className="bg-team-primary hover:bg-team-secondary rounded-full">
                    <Plus className="h-4 w-4 ml-2" />
                    הוסף משחק
                </Button>
            )}
        </section>

        {/* Add/Edit Game Dialog */}
        {showAddDialog && (
            <AddGameDialog
                isOpen={showAddDialog}
                onClose={closeAddOrEditDialog}
                onGameAdded={handleGameAdded}
                onGameUpdated={handleGameUpdated}
                gameToEdit={editingGame}
            />
        )}

        {/* Next Game */}
        {nextGame && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">המשחק הבא</h2>
            <div className="space-y-4">
              <Card className="hover:shadow-lg transition-shadow relative group border-2 border-team-primary">
                {isAuthenticated && (
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    {hasPermission('edit_game') && (
                      <Button variant="outline" size="icon" className="h-8 w-8 bg-white" onClick={() => openEditDialog(nextGame)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {hasPermission('delete_game') && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent dir="rtl">
                          <AlertDialogHeader><AlertDialogTitle>האם למחוק את המשחק?</AlertDialogTitle></AlertDialogHeader>
                          <AlertDialogDescription>פעולה זו לא ניתנת לשחזור.</AlertDialogDescription>
                          <AlertDialogFooter>
                            <AlertDialogCancel>ביטול</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteGame(nextGame.id)}>מחק</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                )}
                {/* Desktop View */}
                <div className="hidden md:flex flex-row items-center p-4 gap-4 justify-between">
                  <div className="flex-grow flex items-center justify-center gap-4 md:gap-8">
                      <div className="flex items-center flex-row-reverse gap-3">
                          <h3 className="text-lg font-bold text-right hidden sm:block">עירוני טבריה</h3>
                          <img src={getTeamLogo("עירוני טבריה")} alt="עירוני טבריה" className="w-12 h-12 object-contain" />
                      </div>
                      <span className="text-xl font-light text-muted-foreground">VS</span>
                      <div className="flex items-center gap-3">
                          <img src={getTeamLogo(nextGame.opponent)} alt={nextGame.opponent} className="w-12 h-12 object-contain" />
                          <h3 className="text-lg font-bold text-left hidden sm:block">{nextGame.opponent}</h3>
                      </div>
                    </div>
                  <Separator orientation="vertical" className="h-16 hidden md:block" />
                  <div className="hidden md:flex flex-col gap-2 text-right text-sm w-48">
                      <div className="flex items-center justify-end gap-2">
                          <span>{nextGame.competition}{nextGame.stage && ` - ${nextGame.stage}`}</span>
                          <img src={getCompetitionLogo(nextGame.competition)} alt={nextGame.competition} className="h-8 w-8 object-contain" />
                      </div>
                      <div className="flex items-center justify-end gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4"/>
                          <span>{new Date(nextGame.date).toLocaleDateString('he-IL')}, {new Date(nextGame.date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex items-center justify-end gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4"/>
                          <span>{nextGame.venue}</span>
                      </div>
                    </div>
                  <div className="pr-4">
                     {nextGame.ticketLink && (
                        <Button 
                          asChild 
                          className="bg-team-primary hover:bg-team-secondary"
                        >
                          <a href={nextGame.ticketLink} target="_blank" rel="noopener noreferrer">
                            קנה כרטיסים
                          </a>
                        </Button>
                     )}
                    </div>
                  </div>

                {/* Mobile View */}
                <CardContent className="md:hidden flex flex-col gap-4 p-4">
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center text-center w-20">
                            <img src={getTeamLogo("עירוני טבריה")} alt="עירוני טבריה" className="w-10 h-10 sm:w-12 sm:h-12 mb-1 object-contain"/>
                            <h4 className="font-semibold text-xs sm:text-sm text-center">עירוני טבריה</h4>
                        </div>
                        <span className="text-2xl sm:text-3xl font-light text-muted-foreground mx-2">VS</span>
                        <div className="flex flex-col items-center text-center w-20">
                            <img src={getTeamLogo(nextGame.opponent)} alt={nextGame.opponent} className="w-10 h-10 sm:w-12 sm:h-12 mb-1 object-contain"/>
                            <h4 className="font-semibold text-xs sm:text-sm text-center">{nextGame.opponent}</h4>
                        </div>
                    </div>
                    <Separator />
                    <div className="text-sm text-right space-y-2">
                        <div className="flex items-center justify-end gap-2">
                            <span>{nextGame.competition}{nextGame.stage && ` - ${nextGame.stage}`}</span>
                            <img src={getCompetitionLogo(nextGame.competition)} alt={nextGame.competition} className="h-6 w-6 object-contain" />
                        </div>
                        <div className="flex items-center justify-end gap-2 text-muted-foreground">
                            <span>{new Date(nextGame.date).toLocaleDateString('he-IL')}, {new Date(nextGame.date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</span>
                            <Calendar className="w-4 h-4"/>
                        </div>
                        <div className="flex items-center justify-end gap-2 text-muted-foreground">
                            <span>{nextGame.venue}</span>
                            <MapPin className="w-4 h-4"/>
                        </div>
                    </div>
                    {nextGame.ticketLink && (
                        <Button 
                          asChild 
                          className="bg-team-primary hover:bg-team-secondary w-full mt-2"
                        >
                           <a href={nextGame.ticketLink} target="_blank" rel="noopener noreferrer">
                            קנה כרטיסים
                          </a>
                        </Button>
                    )}
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Upcoming Games */}
        {remainingUpcomingGames.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">משחקים קרובים</h2>
            <div className="space-y-4">
              {remainingUpcomingGames.map((game) => (
              <Card key={game.id} className="hover:shadow-lg transition-shadow relative group">
                {isAuthenticated && (
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    {hasPermission('edit_game') && (
                      <Button variant="outline" size="icon" className="h-8 w-8 bg-white" onClick={() => openEditDialog(game)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {hasPermission('delete_game') && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent dir="rtl">
                          <AlertDialogHeader><AlertDialogTitle>האם למחוק את המשחק?</AlertDialogTitle></AlertDialogHeader>
                          <AlertDialogDescription>פעולה זו לא ניתנת לשחזור.</AlertDialogDescription>
                          <AlertDialogFooter>
                            <AlertDialogCancel>ביטול</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteGame(game.id)}>מחק</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                )}
                {/* Desktop View */}
                <div className="hidden md:flex flex-row items-center p-4 gap-4 justify-between">
                  <div className="flex-grow flex items-center justify-center gap-4 md:gap-8">
                      <div className="flex items-center flex-row-reverse gap-3">
                          <h3 className="text-lg font-bold text-right hidden sm:block">עירוני טבריה</h3>
                          <img src={getTeamLogo("עירוני טבריה")} alt="עירוני טבריה" className="w-12 h-12 object-contain" />
                      </div>
                      <span className="text-xl font-light text-muted-foreground">VS</span>
                      <div className="flex items-center gap-3">
                          <img src={getTeamLogo(game.opponent)} alt={game.opponent} className="w-12 h-12 object-contain" />
                          <h3 className="text-lg font-bold text-left hidden sm:block">{game.opponent}</h3>
                      </div>
                    </div>
                  <Separator orientation="vertical" className="h-16 hidden md:block" />
                  <div className="hidden md:flex flex-col gap-2 text-right text-sm w-48">
                      <div className="flex items-center justify-end gap-2">
                          <span>{game.competition}{game.stage && ` - ${game.stage}`}</span>
                          <img src={getCompetitionLogo(game.competition)} alt={game.competition} className="h-8 w-8 object-contain" />
                      </div>
                      <div className="flex items-center justify-end gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4"/>
                          <span>{new Date(game.date).toLocaleDateString('he-IL')}, {new Date(game.date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex items-center justify-end gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4"/>
                          <span>{game.venue}</span>
                      </div>
                    </div>
                  <div className="pr-4">
                     {game.ticketLink && (
                        <Button 
                          asChild 
                          className="bg-team-primary hover:bg-team-secondary"
                        >
                          <a href={game.ticketLink} target="_blank" rel="noopener noreferrer">
                            קנה כרטיסים
                          </a>
                        </Button>
                     )}
                    </div>
                  </div>

                {/* Mobile View */}
                <CardContent className="md:hidden flex flex-col gap-4 p-4">
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center text-center w-20">
                            <img src={getTeamLogo("עירוני טבריה")} alt="עירוני טבריה" className="w-10 h-10 sm:w-12 sm:h-12 mb-1 object-contain"/>
                            <h4 className="font-semibold text-xs sm:text-sm text-center">עירוני טבריה</h4>
                        </div>
                        <span className="text-2xl sm:text-3xl font-light text-muted-foreground mx-2">VS</span>
                        <div className="flex flex-col items-center text-center w-20">
                            <img src={getTeamLogo(game.opponent)} alt={game.opponent} className="w-10 h-10 sm:w-12 sm:h-12 mb-1 object-contain"/>
                            <h4 className="font-semibold text-xs sm:text-sm text-center">{game.opponent}</h4>
                        </div>
                    </div>
                    <Separator />
                    <div className="text-sm text-right space-y-2">
                        <div className="flex items-center justify-end gap-2">
                            <span>{game.competition}{game.stage && ` - ${game.stage}`}</span>
                            <img src={getCompetitionLogo(game.competition)} alt={game.competition} className="h-6 w-6 object-contain" />
                        </div>
                        <div className="flex items-center justify-end gap-2 text-muted-foreground">
                            <span>{new Date(game.date).toLocaleDateString('he-IL')}, {new Date(game.date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</span>
                            <Calendar className="w-4 h-4"/>
                        </div>
                        <div className="flex items-center justify-end gap-2 text-muted-foreground">
                            <span>{game.venue}</span>
                            <MapPin className="w-4 h-4"/>
                        </div>
                    </div>
                    {game.ticketLink && (
                        <Button 
                          asChild 
                          className="bg-team-primary hover:bg-team-secondary w-full mt-2"
                        >
                           <a href={game.ticketLink} target="_blank" rel="noopener noreferrer">
                            קנה כרטיסים
                          </a>
                        </Button>
                    )}
                </CardContent>
              </Card>
              ))}
            </div>
          </section>
        )}

        {/* Show message if no upcoming games */}
        {upcomingGames.length === 0 && !isLoading && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">משחקים קרובים</h2>
            <p className="text-center text-muted-foreground">אין משחקים קרובים.</p>
          </section>
        )}

        {/* Recent Results */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">תוצאות אחרונות</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {isLoading ? <p>טוען תוצאות...</p> : recentResults.length > 0 ? (
              recentResults.map((game) => {
                const isHomeGame = game.venue.includes("גרין") || game.venue.includes("הגליל") || game.venue.includes("טבריה");
                const homeTeam = isHomeGame ? "עירוני טבריה" : game.opponent;
                const awayTeam = isHomeGame ? game.opponent : "עירוני טבריה";
                const [homeScore, awayScore] = game.score.split('-').map((s: string) => s.trim());

                return (
                  <Card key={game.id} className="hover:shadow-lg transition-shadow relative group">
                    {isAuthenticated && (
                      <div className="absolute top-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        {hasPermission('edit_game') && (
                          <Button variant="outline" size="icon" className="h-8 w-8 bg-white" onClick={() => openEditDialog(game)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {hasPermission('delete_game') && (
                           <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="icon" className="h-8 w-8">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent dir="rtl">
                               <AlertDialogHeader><AlertDialogTitle>האם למחוק את המשחק?</AlertDialogTitle></AlertDialogHeader>
                               <AlertDialogDescription>פעולה זו לא ניתנת לשחזור.</AlertDialogDescription>
                               <AlertDialogFooter>
                                <AlertDialogCancel>ביטול</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteGame(game.id)}>מחק</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    )}
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        {/* Matchup */}
                        <div className="flex-1 flex items-center justify-center gap-2 sm:gap-4">
                          {/* Home team on the right */}
                          <div className="flex flex-col items-center text-center w-20 order-1">
                            <img src={getTeamLogo(homeTeam)} alt={homeTeam} className="w-10 h-10 sm:w-12 sm:h-12 mb-1 object-contain"/>
                            <h4 className="font-semibold text-xs sm:text-sm text-center">{homeTeam}</h4>
                          </div>
                          <div className="text-3xl sm:text-4xl font-bold text-team-dark px-1 order-2">
                            <span>{homeScore}</span>
                            <span className="mx-1">-</span>
                            <span>{awayScore}</span>
                          </div>
                          {/* Away team on the left */}
                          <div className="flex flex-col items-center text-center w-20 order-3">
                            <img src={getTeamLogo(awayTeam)} alt={awayTeam} className="w-10 h-10 sm:w-12 sm:h-12 mb-1 object-contain"/>
                            <h4 className="font-semibold text-xs sm:text-sm text-center">{awayTeam}</h4>
                          </div>
                        </div>

                        <Separator orientation="vertical" className="h-20 mx-4" />

                        {/* Game Details */}
                        <div className="flex flex-col text-right text-xs sm:text-sm space-y-1 text-muted-foreground w-28">
                          <p className="font-bold text-team-dark">{game.competition}</p>
                          {/* Only show מחזור if not already in competition */}
                          {!(game.competition && game.competition.includes("מחזור")) && (
                            <p>מחזור {game.stage}</p>
                          )}
                          <div className="pt-2 flex items-center justify-end gap-1.5">
                            <span>{new Date(game.date).toLocaleDateString('he-IL', {day: '2-digit', month: '2-digit', year: 'numeric'})}</span>
                            <Calendar className="w-3 h-3" />
                          </div>
                          <div className="flex items-center justify-end gap-1.5">
                            <span>{new Date(game.date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className="flex items-center justify-end gap-1.5">
                            <span className="truncate">{game.venue}</span>
                            <MapPin className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                      {game.notes && (
                        <>
                          <Separator className="my-3" />
                          <div className="text-sm text-right text-muted-foreground">
                            <span className="font-semibold text-team-dark">כובשים: </span>
                            <span className="whitespace-pre-line">{game.notes}</span>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            ) : <p className="text-center text-muted-foreground col-span-full">אין תוצאות אחרונות.</p>}
          </div>
        </section>

        {/* Israeli Premier League Table */}
        {selectedTeam === 'senior' && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-team-dark">פלייאוף תחתון - מחזור 33</h2>
            </div>
            
            <Card className="overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">מיקום</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">קבוצה</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">משחקים</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">נצחונות</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">תיקו</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">הפסדים</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">זכות</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">חובה</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">הפרש</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">נקודות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowerPlayoffTable.map((team) => (
                      <tr 
                        key={team.team} 
                        className={`border-b hover:bg-gray-50 transition-colors ${
                          team.team === "עירוני טבריה" ? "bg-blue-50 border-l-4 border-r-4 border-team-primary" : ""
                        } ${
                          team.position >= 13 ? "bg-red-50" : ""
                        }`}
                      >
                        <td className="px-4 py-3 text-center font-semibold">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                            team.position >= 13 ? "bg-red-500 text-white" : 
                            "bg-gray-200 text-gray-700"
                          }`}>
                            {team.position}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={getTeamLogo(team.team)} alt={team.team} className="w-6 h-6 object-contain" />
                            <span className="font-medium">{team.team}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">{team.played}</td>
                        <td className="px-4 py-3 text-center text-green-600 font-semibold">{team.won}</td>
                        <td className="px-4 py-3 text-center text-yellow-600 font-semibold">{team.drawn}</td>
                        <td className="px-4 py-3 text-center text-red-600 font-semibold">{team.lost}</td>
                        <td className="px-4 py-3 text-center">{team.goalsFor}</td>
                        <td className="px-4 py-3 text-center">{team.goalsAgainst}</td>
                        <td className={`px-4 py-3 text-center font-semibold ${
                          team.goalsFor - team.goalsAgainst > 0 ? "text-green-600" : 
                          team.goalsFor - team.goalsAgainst < 0 ? "text-red-600" : "text-gray-600"
                        }`}>
                          {team.goalsFor - team.goalsAgainst > 0 ? "+" : ""}{team.goalsFor - team.goalsAgainst}
                        </td>
                        <td className="px-4 py-3 text-center font-bold text-lg">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Table */}
              <div className="md:hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-1 py-2 text-center font-semibold text-gray-700 text-xs">#</th>
                      <th className="px-2 py-2 text-right font-semibold text-gray-700 text-xs">קבוצה</th>
                      <th className="px-1 py-2 text-center font-semibold text-gray-700 text-xs">מש'</th>
                      <th className="px-1 py-2 text-center font-semibold text-gray-700 text-xs">הפרש</th>
                      <th className="px-1 py-2 text-center font-semibold text-gray-700 text-xs">נק'</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowerPlayoffTable.map((team) => {
                      const goalDifference = team.goalsFor - team.goalsAgainst;
                      return (
                        <tr 
                          key={team.team} 
                          className={`border-b ${
                            team.team === "עירוני טבריה" ? "bg-blue-50" : ""
                          } ${
                            team.position >= 13 ? "bg-red-50" : ""
                          }`}
                        >
                          <td className="px-1 py-2 text-center font-semibold">
                            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                              team.position >= 13 ? "bg-red-500 text-white" : 
                              "bg-gray-200 text-gray-700"
                            }`}>
                              {team.position}
                            </span>
                          </td>
                          <td className="px-2 py-2 text-right">
                            <div className="flex items-center gap-2">
                              <img src={getTeamLogo(team.team)} alt={team.team} className="w-5 h-5 object-contain" />
                              <span className="font-medium text-sm">{team.team}</span>
                            </div>
                          </td>
                          <td className="px-1 py-2 text-center text-sm">{team.played}</td>
                          <td className={`px-1 py-2 text-center font-semibold text-sm ${
                            goalDifference > 0 ? "text-green-600" : 
                            goalDifference < 0 ? "text-red-600" : "text-gray-600"
                          }`}>
                            {goalDifference > 0 ? `+${goalDifference}` : goalDifference}
                          </td>
                          <td className="px-1 py-2 text-center font-bold">{team.points}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>
        )}
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

export default Games;
