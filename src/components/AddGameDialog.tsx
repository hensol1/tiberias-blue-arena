import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { TEAM_NAMES } from "@/lib/team-logo-map";
import { COMPETITION_NAMES } from "@/lib/competition-logo-map";

const AddGameDialog = ({ isOpen, onClose, onGameAdded, onGameUpdated, gameToEdit }: {
    isOpen: boolean;
    onClose: () => void;
    onGameAdded: (game: any) => void;
    onGameUpdated: (game: any) => void;
    gameToEdit?: any | null;
}) => {
    const [team, setTeam] = useState("senior");
    const [opponent, setOpponent] = useState("");
    const [date, setDate] = useState("");
    const [venue, setVenue] = useState("");
    const [competition, setCompetition] = useState("");
    const [stage, setStage] = useState("");
    const [ticketLink, setTicketLink] = useState("");
    const [score, setScore] = useState("");
    const [notes, setNotes] = useState("");
    const { toast } = useToast();

    const isEditMode = !!gameToEdit;

    useEffect(() => {
        if (isEditMode && gameToEdit) {
            setTeam(gameToEdit.team || "senior");
            setOpponent(gameToEdit.opponent || "");
            setDate(gameToEdit.date ? new Date(gameToEdit.date).toISOString().substring(0, 16) : "");
            setVenue(gameToEdit.venue || "");
            setCompetition(gameToEdit.competition || "");
            setStage(gameToEdit.stage || "");
            setScore(gameToEdit.score || "");
            setTicketLink(gameToEdit.ticketLink || "");
            setNotes(gameToEdit.notes || "");
        } else {
             // Reset form when opening for a new game
            setTeam("senior");
            setOpponent("");
            setDate("");
            setVenue("");
            setCompetition("");
            setStage("");
            setScore("");
            setTicketLink("");
            setNotes("");
        }
    }, [gameToEdit, isEditMode, isOpen]);


    const getGameStatus = (gameDate: string, gameScore: string) => {
        if (gameScore) {
            return 'result';
        }
        const now = new Date();
        const gDate = new Date(gameDate);
        return gDate < now ? 'result' : 'upcoming';
    };

    const determineWon = (gameScore: string) => {
        if (!gameScore || !gameScore.includes('-')) return null;

        const parts = gameScore.split('-').map(s => parseInt(s.trim(), 10));
        if (isNaN(parts[0]) || isNaN(parts[1])) return null;

        const [ourScore, theirScore] = parts;

        if (ourScore > theirScore) return true;
        if (ourScore < theirScore) return false;
        return null; // Draw
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!opponent || !date || !competition || !stage) {
            toast({ title: "נא למלא את כל שדות החובה", variant: "destructive" });
            return;
        }

        const gameData = {
            team,
            opponent,
            date,
            venue,
            competition,
            stage,
            score,
            notes,
            ticketLink,
            status: getGameStatus(date, score),
            won: determineWon(score),
            lastUpdated: serverTimestamp()
        };

        try {
            if (isEditMode) {
                const gameRef = doc(db, "games", gameToEdit.id);
                await updateDoc(gameRef, gameData);
                onGameUpdated({ ...gameData, id: gameToEdit.id });
                toast({ title: "המשחק עודכן בהצלחה" });
            } else {
                const docRef = await addDoc(collection(db, "games"), {
                    ...gameData,
                    createdAt: serverTimestamp()
                });
                onGameAdded({ ...gameData, id: docRef.id });
                toast({ title: "המשחק נוסף בהצלחה" });
            }
            onClose();
        } catch (error) {
            console.error("Error saving game: ", error);
            toast({ title: isEditMode ? "שגיאה בעדכון המשחק" : "שגיאה בהוספת המשחק", variant: "destructive" });
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl" dir="rtl">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "עריכת משחק" : "הוספת משחק חדש"}</DialogTitle>
                    <DialogDescription>
                        {isEditMode ? "עדכן את פרטי המשחק כאן." : "מלא את פרטי המשחק החדש כאן."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 py-4">
                        
                        {/* Team Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="team">קבוצה</Label>
                            <Select value={team} onValueChange={setTeam}>
                                <SelectTrigger>
                                    <SelectValue placeholder="בחר קבוצה" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="senior">קבוצה בוגרת</SelectItem>
                                    <SelectItem value="youth">קבוצת נוער</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Venue */}
                        <div className="space-y-2">
                            <Label htmlFor="venue">אצטדיון</Label>
                            <Input
                                id="venue"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                                placeholder="לדוגמה: אצטדיון עירוני טבריה"
                            />
                        </div>

                        {/* Opponent Selection */}
                        <div className="space-y-2">
                           <Label htmlFor="opponent">יריבה*</Label>
                           <Select value={opponent} onValueChange={setOpponent}>
                                <SelectTrigger>
                                    <SelectValue placeholder="בחר יריבה" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TEAM_NAMES.map(name => <SelectItem key={name} value={name}>{name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Date and Time */}
                        <div className="space-y-2">
                            <Label htmlFor="date">תאריך ושעה*</Label>
                            <Input
                                id="date"
                                type="datetime-local"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        
                         {/* Competition */}
                        <div className="space-y-2">
                             <Label htmlFor="competition">מפעל*</Label>
                             <Select value={competition} onValueChange={setCompetition}>
                                <SelectTrigger>
                                    <SelectValue placeholder="בחר מפעל" />
                                </SelectTrigger>
                                <SelectContent>
                                     {COMPETITION_NAMES.map(name => <SelectItem key={name} value={name}>{name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Stage */}
                        <div className="space-y-2">
                            <Label htmlFor="stage">שלב/מחזור*</Label>
                            <Input
                                id="stage"
                                value={stage}
                                onChange={(e) => setStage(e.target.value)}
                                placeholder="לדוגמה: מחזור 14"
                            />
                        </div>

                        {/* Ticket Link */}
                        <div className="space-y-2">
                            <Label htmlFor="ticketLink">קישור לכרטיסים</Label>
                            <Input
                                id="ticketLink"
                                value={ticketLink}
                                onChange={(e) => setTicketLink(e.target.value)}
                                placeholder="הדבק קישור כאן"
                            />
                        </div>

                        {/* Score */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="score">תוצאה</Label>
                            <Input
                                id="score"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                placeholder="לדוגמה: 2-1 (התוצאה שלנו קודם)"
                            />
                        </div>

                        {/* Notes */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="notes">הערות</Label>
                            <Textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="הערות נוספות (כובשים, כרטיסים וכו')"
                            />
                        </div>
                         <p className="text-sm text-muted-foreground md:col-span-2">* שדה חובה</p>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>ביטול</Button>
                        <Button type="submit">{isEditMode ? "שמור שינויים" : "הוסף משחק"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddGameDialog; 