import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Trophy, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import AddGameDialog from "@/components/AddGameDialog";
import { getTeamLogo } from "@/lib/team-logo-map";

const Games = () => {
  const [selectedTeam, setSelectedTeam] = useState<'senior' | 'youth'>('senior');
  const [allGames, setAllGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const { isAuthenticated } = useAuth();
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

  const upcomingGames = allGames.filter(g => g.team === selectedTeam && g.status === 'upcoming');
  const recentResults = allGames.filter(g => g.team === selectedTeam && g.status === 'recent');

  const teamData = {
    stats: {
        wins: recentResults.filter(g => g.won === true).length,
        draws: recentResults.filter(g => g.won === null).length,
        losses: recentResults.filter(g => g.won === false).length,
        // Position will need to be managed separately, maybe in a different collection or manually.
        // For now, let's hardcode it or derive it differently.
        position: selectedTeam === 'senior' ? 7 : 4
    }
  }

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
            {isAuthenticated && (
                <Button onClick={() => setShowAddDialog(true)} className="bg-team-primary hover:bg-team-secondary rounded-full">
                    <Plus className="h-4 w-4 ml-2" />
                    הוסף משחק
                </Button>
            )}
        </section>

        {/* Add Game Dialog */}
        {showAddDialog && (
            <AddGameDialog
                isOpen={showAddDialog}
                onClose={() => setShowAddDialog(false)}
                onGameAdded={handleGameAdded}
            />
        )}
        
        {/* Season Stats */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-team-dark">
            סטטיסטיקות עונה - {teamName}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{teamData.stats.wins}</div>
                <div className="text-sm text-muted-foreground">ניצחונות</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{teamData.stats.draws}</div>
                <div className="text-sm text-muted-foreground">תיקו</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-red-600 mb-2">{teamData.stats.losses}</div>
                <div className="text-sm text-muted-foreground">הפסדים</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-team-primary mb-2">{teamData.stats.position}</div>
                <div className="text-sm text-muted-foreground">מיקום בטבלה</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Upcoming Games */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">משחקים קרובים</h2>
          <div className="space-y-6">
            {isLoading ? <p>טוען משחקים...</p> : upcomingGames.length > 0 ? (
              upcomingGames.map((game) => (
              <Card key={game.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid grid-cols-5 gap-4 items-center">
                    
                    {/* Teams & Logos */}
                    <div className="col-span-2 flex flex-col items-center text-center">
                       <img src={getTeamLogo("עירוני טבריה")} alt="עירוני טבריה" className="w-16 h-16 mb-2 object-contain"/>
                       <h3 className="font-semibold">עירוני טבריה</h3>
                    </div>

                    <div className="text-center text-muted-foreground">VS</div>

                    <div className="col-span-2 flex flex-col items-center text-center">
                       <img src={getTeamLogo(game.opponent)} alt={game.opponent} className="w-16 h-16 mb-2 object-contain"/>
                       <h3 className="font-semibold">{game.opponent}</h3>
                    </div>
                    
                  </div>
                  
                  <div className="border-t my-4"></div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground text-right">
                      <div className="flex items-center justify-end">
                        <span className="mr-2">{game.date}</span>
                        <Calendar className="h-4 w-4 text-team-primary" />
                      </div>
                      <div className="flex items-center justify-end">
                        <span className="mr-2">{game.time}</span>
                        <Clock className="h-4 w-4 text-team-primary" />
                      </div>
                      <div className="flex items-center justify-end">
                        <span className="mr-2">{game.venue}</span>
                        <MapPin className="h-4 w-4 text-team-primary" />
                      </div>
                      <div className="flex items-center justify-end">
                        <span className="mr-2">{game.competition}</span>
                        <Trophy className="h-4 w-4 text-team-primary" />
                      </div>
                  </div>

                  <div className="mt-4 text-center">
                     <Button className="bg-team-primary hover:bg-team-secondary w-full md:w-auto">
                        קנה כרטיסים
                      </Button>
                  </div>
                </CardContent>
              </Card>
            ))) : <p>אין משחקים קרובים.</p>}
          </div>
        </section>

        {/* Recent Results */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">תוצאות אחרונות</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading ? <p>טוען תוצאות...</p> : recentResults.length > 0 ? (
              recentResults.map((game) => (
              <Card key={game.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    {getResultBadge(game.won)}
                    <Badge variant="outline">{game.competition}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-around text-center mb-4">
                    <div className="flex-1 flex flex-col items-center">
                      <img src={getTeamLogo("עירוני טבריה")} alt="עירוני טבריה" className="w-16 h-16 object-contain mb-2"/>
                      <h4 className="font-semibold">עירוני טבריה</h4>
                    </div>
                    <div className="text-3xl font-bold text-team-primary px-4">{game.result}</div>
                    <div className="flex-1 flex flex-col items-center">
                      <img src={getTeamLogo(game.opponent)} alt={game.opponent} className="w-16 h-16 object-contain mb-2"/>
                      <h4 className="font-semibold">{game.opponent}</h4>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3 space-y-2 text-sm text-muted-foreground text-right">
                    <div className="flex items-center justify-end">
                      <span className="mr-2">{new Date(game.date).toLocaleDateString('he-IL')}</span>
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="flex items-center justify-end">
                      <span className="mr-2">{game.venue}</span>
                      <MapPin className="h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))) : <p>אין תוצאות אחרונות.</p>}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Games;
