import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Trophy, Plus, Edit, Trash2 } from "lucide-react";
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

const Games = () => {
  const [selectedTeam, setSelectedTeam] = useState<'senior' | 'youth'>('senior');
  const [allGames, setAllGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingGame, setEditingGame] = useState<any | null>(null);

  const { isAuthenticated, hasPermission } = useAuth();
  const { toast } = useToast();

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
  }

  const upcomingGames = allGames.filter(g => g.team === selectedTeam && g.status === 'upcoming');
  const recentResults = allGames.filter(g => g.team === selectedTeam && g.status === 'recent');

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
      <section className="bg-gradient-to-l from-team-primary to-team-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">משחקים</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            לוח משחקים, תוצאות ועדכונים מהעונה הנוכחית
          </p>
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

        {/* Upcoming Games */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">משחקים קרובים</h2>
          <div className="space-y-4">
            {isLoading ? <p>טוען משחקים...</p> : upcomingGames.length > 0 ? (
              upcomingGames.map((game) => (
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
                          <span>{new Date(game.date).toLocaleDateString('he-IL')}, {game.time}</span>
                      </div>
                      <div className="flex items-center justify-end gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4"/>
                          <span>{game.venue}</span>
                      </div>
                    </div>
                  <div className="pr-4">
                     <Button className="bg-team-primary hover:bg-team-secondary">
                        קנה כרטיסים
                      </Button>
                    </div>
                  </div>

                {/* Mobile View */}
                <CardContent className="md:hidden flex flex-col gap-4 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col items-center text-center w-20">
                            <img src={getTeamLogo("עירוני טבריה")} alt="עירוני טבריה" className="w-12 h-12 object-contain"/>
                            <h4 className="font-semibold text-sm mt-1">עירוני טבריה</h4>
                        </div>
                        <span className="text-xl font-light text-muted-foreground">VS</span>
                        <div className="flex flex-col items-center text-center w-20">
                            <img src={getTeamLogo(game.opponent)} alt={game.opponent} className="w-12 h-12 object-contain"/>
                            <h4 className="font-semibold text-sm mt-1">{game.opponent}</h4>
                        </div>
                    </div>
                    <Separator />
                    <div className="text-sm text-right space-y-2">
                        <div className="flex items-center justify-end gap-2">
                            <span>{game.competition}{game.stage && ` - ${game.stage}`}</span>
                            <img src={getCompetitionLogo(game.competition)} alt={game.competition} className="h-6 w-6 object-contain" />
                        </div>
                        <div className="flex items-center justify-end gap-2 text-muted-foreground">
                            <span>{new Date(game.date).toLocaleDateString('he-IL')}, {game.time}</span>
                            <Calendar className="w-4 h-4"/>
                        </div>
                        <div className="flex items-center justify-end gap-2 text-muted-foreground">
                            <span>{game.venue}</span>
                            <MapPin className="w-4 h-4"/>
                        </div>
                    </div>
                    <Button className="bg-team-primary hover:bg-team-secondary w-full mt-2">
                        קנה כרטיסים
                    </Button>
                </CardContent>
              </Card>
            ))) : <p className="text-center text-muted-foreground">אין משחקים קרובים.</p>}
          </div>
        </section>

        {/* Recent Results */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">תוצאות אחרונות</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {isLoading ? <p>טוען תוצאות...</p> : recentResults.length > 0 ? (
              recentResults.map((game) => (
              <Card key={game.id} className="hover:shadow-lg transition-shadow relative group">
                {isAuthenticated && (
                  <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
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
                <CardContent className="p-4 relative">
                  <div className="absolute top-3 left-3 z-10">{getResultBadge(game.won)}</div>
                  <div className="flex flex-row items-center gap-4">
                      {/* Matchup with Result */}
                      <div className="flex-grow flex items-center justify-center gap-2">
                          <div className="flex flex-col items-center text-center w-24">
                              <img src={getTeamLogo("עירוני טבריה")} alt="עירוני טבריה" className="w-12 h-12 mb-1 object-contain"/>
                              <h4 className="font-semibold text-sm text-center">עירוני טבריה</h4>
                          </div>
                          <div className="text-4xl font-bold text-team-primary px-2">{game.result}</div>
                          <div className="flex flex-col items-center text-center w-24">
                              <img src={getTeamLogo(game.opponent)} alt={game.opponent} className="w-12 h-12 mb-1 object-contain"/>
                              <h4 className="font-semibold text-sm text-center">{game.opponent}</h4>
                          </div>
                  </div>
                  
                      <Separator orientation="vertical" className="h-20" />

                      {/* Details Section */}
                      <div className="flex flex-col gap-2 text-right text-sm w-44">
                          <div className="flex items-center justify-end gap-2">
                              <span>{game.competition}{game.stage && ` - ${game.stage}`}</span>
                              <img src={getCompetitionLogo(game.competition)} alt={game.competition} className="h-8 w-8 object-contain"/>
                          </div>
                          <div className="flex items-center justify-end gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4"/>
                              <span>{new Date(game.date).toLocaleDateString('he-IL')}</span>
                    </div>
                          <div className="flex items-center justify-end gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4"/>
                              <span>{game.venue}</span>
                    </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))) : <p className="text-center text-muted-foreground col-span-full">אין תוצאות אחרונות.</p>}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Games;
