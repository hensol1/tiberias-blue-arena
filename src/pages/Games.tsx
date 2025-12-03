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
import { useIsMobile } from "@/hooks/use-mobile";
import newSponsors from "@/assets/sponsors/newsponsers.png";
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

  // League table - updated data
  const premierLeagueTable = [
    {
      position: 1,
      team: "הפועל ב\"ש",
      played: 12,
      won: 9,
      drawn: 2,
      lost: 1,
      goalsFor: 31,
      goalsAgainst: 12,
      points: 29,
    },
    {
      position: 2,
      team: "מכבי ת\"א",
      played: 11,
      won: 7,
      drawn: 3,
      lost: 1,
      goalsFor: 27,
      goalsAgainst: 12,
      points: 24,
    },
    {
      position: 3,
      team: "בית\"ר י-ם",
      played: 11,
      won: 7,
      drawn: 2,
      lost: 2,
      goalsFor: 27,
      goalsAgainst: 15,
      points: 23,
    },
    {
      position: 4,
      team: "הפועל ת\"א",
      played: 12,
      won: 6,
      drawn: 2,
      lost: 4,
      goalsFor: 20,
      goalsAgainst: 16,
      points: 18,
    },
    {
      position: 5,
      team: "מכבי נתניה",
      played: 11,
      won: 6,
      drawn: 0,
      lost: 5,
      goalsFor: 22,
      goalsAgainst: 24,
      points: 18,
    },
    {
      position: 6,
      team: "מכבי חיפה",
      played: 12,
      won: 3,
      drawn: 7,
      lost: 2,
      goalsFor: 21,
      goalsAgainst: 14,
      points: 16,
    },
    {
      position: 7,
      team: "מ.ס. אשדוד",
      played: 11,
      won: 4,
      drawn: 4,
      lost: 3,
      goalsFor: 19,
      goalsAgainst: 21,
      points: 16,
    },
    {
      position: 8,
      team: "בני סכנין",
      played: 12,
      won: 3,
      drawn: 5,
      lost: 4,
      goalsFor: 14,
      goalsAgainst: 17,
      points: 14,
    },
    {
      position: 9,
      team: "הפועל פ\"ת",
      played: 12,
      won: 2,
      drawn: 7,
      lost: 3,
      goalsFor: 17,
      goalsAgainst: 19,
      points: 13,
    },
    {
      position: 10,
      team: "עירוני טבריה",
      played: 11,
      won: 4,
      drawn: 1,
      lost: 6,
      goalsFor: 13,
      goalsAgainst: 25,
      points: 13,
    },
    {
      position: 11,
      team: "הפועל חיפה",
      played: 11,
      won: 3,
      drawn: 3,
      lost: 5,
      goalsFor: 15,
      goalsAgainst: 18,
      points: 12,
    },
    {
      position: 12,
      team: "הפועל ק\"ש",
      played: 12,
      won: 3,
      drawn: 3,
      lost: 6,
      goalsFor: 14,
      goalsAgainst: 17,
      points: 12,
    },
    {
      position: 13,
      team: "הפועל י-ם",
      played: 12,
      won: 1,
      drawn: 4,
      lost: 7,
      goalsFor: 10,
      goalsAgainst: 19,
      points: 7,
    },
    {
      position: 14,
      team: "מכבי בני ריינה",
      played: 12,
      won: 1,
      drawn: 1,
      lost: 10,
      goalsFor: 10,
      goalsAgainst: 31,
      points: 4,
    },
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

  // State for showing more upcoming games
  const [showMoreUpcoming, setShowMoreUpcoming] = useState(false);

  // Number of recent results to show (load more in chunks of 3)
  const [resultsToShow, setResultsToShow] = useState(3);

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
                      {(() => {
                        const isHomeGame = nextGame.venue.includes("גרין") || nextGame.venue.includes("הגליל") || nextGame.venue.includes("טבריה");
                        const homeTeam = isHomeGame ? "עירוני טבריה" : nextGame.opponent;
                        const awayTeam = isHomeGame ? nextGame.opponent : "עירוני טבריה";
                        
                        return (
                          <>
                            <div className="flex items-center flex-row-reverse gap-3">
                                <h3 className="text-lg font-bold text-right hidden sm:block">{homeTeam}</h3>
                                <img src={getTeamLogo(homeTeam)} alt={homeTeam} className="w-12 h-12 object-contain" />
                            </div>
                            <span className="text-xl font-light text-muted-foreground">VS</span>
                            <div className="flex items-center gap-3">
                                <img src={getTeamLogo(awayTeam)} alt={awayTeam} className="w-12 h-12 object-contain" />
                                <h3 className="text-lg font-bold text-left hidden sm:block">{awayTeam}</h3>
                            </div>
                          </>
                        );
                      })()}
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
                        {(() => {
                          const isHomeGame = nextGame.venue.includes("גרין") || nextGame.venue.includes("הגליל") || nextGame.venue.includes("טבריה");
                          const homeTeam = isHomeGame ? "עירוני טבריה" : nextGame.opponent;
                          const awayTeam = isHomeGame ? nextGame.opponent : "עירוני טבריה";
                          
                          return (
                            <>
                              <div className="flex flex-col items-center text-center w-20">
                                  <img src={getTeamLogo(homeTeam)} alt={homeTeam} className="w-10 h-10 sm:w-12 sm:h-12 mb-1 object-contain"/>
                                  <h4 className="font-semibold text-xs sm:text-sm text-center">{homeTeam}</h4>
                              </div>
                              <span className="text-2xl sm:text-3xl font-light text-muted-foreground mx-2">VS</span>
                              <div className="flex flex-col items-center text-center w-20">
                                  <img src={getTeamLogo(awayTeam)} alt={awayTeam} className="w-10 h-10 sm:w-12 sm:h-12 mb-1 object-contain"/>
                                  <h4 className="font-semibold text-xs sm:text-sm text-center">{awayTeam}</h4>
                              </div>
                            </>
                          );
                        })()}
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
              {/* Show only the next upcoming game initially */}
              {remainingUpcomingGames.slice(0, showMoreUpcoming ? remainingUpcomingGames.length : 1).map((game) => (
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
                      {(() => {
                        const isHomeGame = game.venue.includes("גרין") || game.venue.includes("הגליל") || game.venue.includes("טבריה");
                        const homeTeam = isHomeGame ? "עירוני טבריה" : game.opponent;
                        const awayTeam = isHomeGame ? game.opponent : "עירוני טבריה";
                        
                        return (
                          <>
                            <div className="flex items-center flex-row-reverse gap-3">
                                <h3 className="text-lg font-bold text-right hidden sm:block">{homeTeam}</h3>
                                <img src={getTeamLogo(homeTeam)} alt={homeTeam} className="w-12 h-12 object-contain" />
                            </div>
                            <span className="text-xl font-light text-muted-foreground">VS</span>
                            <div className="flex items-center gap-3">
                                <img src={getTeamLogo(awayTeam)} alt={awayTeam} className="w-12 h-12 object-contain" />
                                <h3 className="text-lg font-bold text-left hidden sm:block">{awayTeam}</h3>
                            </div>
                          </>
                        );
                      })()}
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
                        {(() => {
                          const isHomeGame = game.venue.includes("גרין") || game.venue.includes("הגליל") || game.venue.includes("טבריה");
                          const homeTeam = isHomeGame ? "עירוני טבריה" : game.opponent;
                          const awayTeam = isHomeGame ? game.opponent : "עירוני טבריה";
                          
                          return (
                            <>
                              <div className="flex flex-col items-center text-center w-20">
                                  <img src={getTeamLogo(homeTeam)} alt={homeTeam} className="w-10 h-10 sm:w-12 sm:h-12 mb-1 object-contain"/>
                                  <h4 className="font-semibold text-xs sm:text-sm text-center">{homeTeam}</h4>
                              </div>
                              <span className="text-2xl sm:text-3xl font-light text-muted-foreground mx-2">VS</span>
                              <div className="flex flex-col items-center text-center w-20">
                                  <img src={getTeamLogo(awayTeam)} alt={awayTeam} className="w-10 h-10 sm:w-12 sm:h-12 mb-1 object-contain"/>
                                  <h4 className="font-semibold text-xs sm:text-sm text-center">{awayTeam}</h4>
                              </div>
                            </>
                          );
                        })()}
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
              
              {/* Show More/Less Button */}
              {remainingUpcomingGames.length > 1 && (
                <div className="flex justify-center mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowMoreUpcoming(!showMoreUpcoming)}
                    className="bg-white hover:bg-gray-50 border-team-primary text-team-primary hover:text-team-secondary"
                  >
                    {showMoreUpcoming ? "הצג פחות" : "עוד"}
                  </Button>
                </div>
              )}
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
          recentResults.slice(0, resultsToShow).map((game) => {
                const isHomeGame = game.venue.includes("גרין") || game.venue.includes("הגליל") || game.venue.includes("טבריה");
                const homeTeam = isHomeGame ? "עירוני טבריה" : game.opponent;
                const awayTeam = isHomeGame ? game.opponent : "עירוני טבריה";
                const [homeScore, awayScore] = game.score.split('-').map((s: string) => s.trim());

                return (
                  <Card key={game.id} className="hover:shadow-lg transition-shadow relative group w-full box-border">
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
                    <CardContent className="p-4 px-6 w-full box-border">
                      <div className="flex justify-between items-center flex-wrap">
                        {/* Matchup */}
                        <div className="flex-1 flex items-center justify-center gap-2 sm:gap-4 min-w-0">
                          {/* Home team on the right */}
                          <div className="flex flex-col items-center text-center w-20 order-1 min-w-0">
                            <img src={getTeamLogo(homeTeam)} alt={homeTeam} className="w-10 h-10 sm:w-12 sm:h-12 mb-1 object-contain"/>
                            <h4 className="font-semibold text-xs sm:text-sm text-center break-words">{homeTeam}</h4>
                          </div>
                          <div className="text-3xl sm:text-4xl font-bold text-team-dark px-1 order-2">
                            <span>{homeScore}</span>
                            <span className="mx-1">-</span>
                            <span>{awayScore}</span>
                          </div>
                          {/* Away team on the left */}
                          <div className="flex flex-col items-center text-center w-20 order-3 min-w-0">
                            <img src={getTeamLogo(awayTeam)} alt={awayTeam} className="w-10 h-10 sm:w-12 sm:h-12 mb-1 object-contain"/>
                            <h4 className="font-semibold text-xs sm:text-sm text-center break-words">{awayTeam}</h4>
                          </div>
                        </div>

                        <Separator orientation="vertical" className="h-20 mx-4 hidden xs:block" />

                        {/* Game Details */}
                        <div className="flex flex-col text-right text-xs sm:text-sm space-y-1 text-muted-foreground w-28 min-w-0 break-words">
                          <p className="font-bold text-team-dark break-words">{game.competition}</p>
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
                          <div className="text-sm text-right text-muted-foreground break-words">
                            <span className="font-semibold text-team-dark">כובשים: </span>
                            <span className="whitespace-pre-line break-words">{game.notes}</span>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            ) : <p className="text-center text-muted-foreground col-span-full">אין תוצאות אחרונות.</p>}
          </div>
          {/* Load more results */}
          {recentResults.length > resultsToShow && (
            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                onClick={() => setResultsToShow(prev => prev + 3)}
                className="bg-white hover:bg-gray-50 border-team-primary text-team-primary hover:text-team-secondary"
              >
                טען עוד
              </Button>
            </div>
          )}
        </section>

        {/* Israeli Premier League Table */}
        {selectedTeam === 'senior' && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl md:text-3xl font-bold text-team-dark">
                טבלת הליגה - עונה 2025/26
              </h2>
            </div>
            
            <Card className="overflow-hidden shadow-md border-0 bg-white/80 backdrop-blur">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[600px] border-separate border-spacing-0">
                  <thead className="bg-gradient-to-l from-team-primary/90 to-team-secondary/80 text-white">
                    <tr>
                      <th className="px-4 py-3 text-center text-xs font-semibold tracking-wide">מיקום</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold tracking-wide">קבוצה</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold tracking-wide">משחקים</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold tracking-wide">נצחונות</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold tracking-wide">תיקו</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold tracking-wide">הפסדים</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold tracking-wide">זכות</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold tracking-wide">חובה</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold tracking-wide">הפרש</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold tracking-wide">נקודות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {premierLeagueTable.map((team) => (
                      <tr 
                        key={team.team} 
                        className={`
                          transition-colors
                          ${team.team === "עירוני טבריה" ? "bg-blue-50/80" : "odd:bg-white even:bg-slate-50/70"}
                          ${team.position >= 13 && team.team !== "עירוני טבריה" ? "bg-red-50/80" : ""}
                          hover:bg-slate-100
                        `}
                      >
                        <td className="px-4 py-3 text-center font-semibold sticky right-0 bg-inherit">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shadow-sm ${
                            team.position === 1
                              ? "bg-amber-400 text-slate-900"
                              : team.position <= 3
                                ? "bg-emerald-500 text-white"
                                : team.position >= 13
                                  ? "bg-red-500 text-white"
                                  : "bg-slate-200 text-slate-800"
                          }`}>
                            {team.position}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3 justify-start">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
                              <img src={getTeamLogo(team.team)} alt={team.team} className="w-6 h-6 object-contain" />
                            </div>
                            <span className={`font-semibold text-sm ${
                              team.team === "עירוני טבריה" ? "text-team-primary" : "text-slate-800"
                            }`}>
                              {team.team}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">{team.played}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex min-w-[2.5rem] justify-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                            {team.won}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex min-w-[2.5rem] justify-center rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                            {team.drawn}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex min-w-[2.5rem] justify-center rounded-full bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700">
                            {team.lost}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">{team.goalsFor}</td>
                        <td className="px-4 py-3 text-center">{team.goalsAgainst}</td>
                        <td className={`px-4 py-3 text-center font-semibold ${
                          team.goalsFor - team.goalsAgainst > 0 ? "text-green-600" : 
                          team.goalsFor - team.goalsAgainst < 0 ? "text-red-600" : "text-gray-600"
                        }`}>
                          {team.goalsFor - team.goalsAgainst > 0 ? "+" : ""}{team.goalsFor - team.goalsAgainst}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex min-w-[3rem] justify-center rounded-full bg-team-primary text-white text-sm font-bold shadow-sm">
                            {team.points}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Table */}
              <div className="md:hidden">
                <table className="w-full border-separate border-spacing-y-1">
                  <thead className="bg-gradient-to-l from-team-primary/90 to-team-secondary/80 text-white">
                    <tr>
                      <th className="px-1 py-2 text-center font-semibold text-xs">#</th>
                      <th className="px-2 py-2 text-right font-semibold text-xs">קבוצה</th>
                      <th className="px-1 py-2 text-center font-semibold text-xs">מש'</th>
                      <th className="px-1 py-2 text-center font-semibold text-xs">הפרש</th>
                      <th className="px-1 py-2 text-center font-semibold text-xs">נק'</th>
                    </tr>
                  </thead>
                  <tbody>
                    {premierLeagueTable.map((team) => {
                      const goalDifference = team.goalsFor - team.goalsAgainst;
                      return (
                        <tr 
                          key={team.team} 
                          className={`
                            rounded-xl overflow-hidden bg-white shadow-sm
                            ${team.team === "עירוני טבריה" ? "ring-2 ring-team-primary/60" : ""}
                            ${team.position >= 13 && team.team !== "עירוני טבריה" ? "ring-1 ring-red-200 bg-red-50/80" : ""}
                          `}
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
                              <span className={`font-semibold text-xs ${
                                team.team === "עירוני טבריה" ? "text-team-primary" : "text-slate-800"
                              }`}>{team.team}</span>
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

export default Games;
