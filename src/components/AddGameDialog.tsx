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
// import { TEAM_NAMES } from "@/lib/team-logo-map";
// import { COMPETITION_NAMES } from "@/lib/competition-logo-map";

// Temporary hardcoded arrays until import issue is resolved
const TEAM_NAMES = [
    "עירוני טבריה", "מכבי חיפה", "מכבי תל אביב", "הפועל באר שבע", 
    "הפועל חיפה", "מכבי בני ריינה", "הפועל ירושלים", "מכבי פתח תקוה", 
    "הפועל חדרה", "הפועל תל אביב", "מ.ס. אשדוד", "בית\"ר ירושלים", 
    "מכבי נתניה", "הפועל פתח תקוה", "איחוד בני סכנין", "עירוני קרית שמונה"
];

const COMPETITION_NAMES = ["ליגת העל", "גביע המדינה", "גביע הטוטו"];

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
    const [venue, setVenue] = useState("home");
    const [competition, setCompetition] = useState("");
    const [stage, setStage] = useState("");
    const [score, setScore] = useState("");
    const [notes, setNotes] = useState("");
    const { toast } = useToast();

    const isEditMode = !!gameToEdit;

    useEffect(() => {
        console.log("AddGameDialog useEffect triggered:", { isEditMode, gameToEdit, isOpen });
        
        if (isEditMode && gameToEdit) {
            console.log("Populating form with game data:", gameToEdit);
            setTeam(gameToEdit.team || "senior");
            setOpponent(gameToEdit.opponent || "");
            setDate(gameToEdit.date ? new Date(gameToEdit.date).toISOString().substring(0, 16) : "");
            setVenue(gameToEdit.venue || "home");
            setCompetition(gameToEdit.competition || "");
            setStage(gameToEdit.stage || "");
            setScore(gameToEdit.score || "");
            setNotes(gameToEdit.notes || "");
        } else if (!isEditMode) {
             // Reset form when opening for a new game
            console.log("Resetting form for new game");
            setTeam("senior");
            setOpponent("");
            setDate("");
            setVenue("home");
            setCompetition("");
            setStage("");
            setScore("");
            setNotes("");
        }
    }, [gameToEdit, isEditMode, isOpen]);

    // Additional useEffect to handle form population when dialog opens
    useEffect(() => {
        if (isOpen && isEditMode && gameToEdit) {
            console.log("Dialog opened in edit mode, populating form:", gameToEdit);
            setTeam(gameToEdit.team || "senior");
            setOpponent(gameToEdit.opponent || "");
            setDate(gameToEdit.date ? new Date(gameToEdit.date).toISOString().substring(0, 16) : "");
            setVenue(gameToEdit.venue || "home");
            setCompetition(gameToEdit.competition || "");
            setStage(gameToEdit.stage || "");
            setScore(gameToEdit.score || "");
            setNotes(gameToEdit.notes || "");
        }
    }, [isOpen, isEditMode, gameToEdit]);

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
            <DialogContent className="sm:max-w-[425px]" dir="rtl">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? "עריכת משחק" : "הוספת משחק חדש"}</DialogTitle>
                    <DialogDescription>
                        {isEditMode ? "עדכן את פרטי המשחק כאן." : "מלא את פרטי המשחק החדש כאן."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Team Selection */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="team" className="text-right">קבוצה</Label>
                            <Select value={team} onValueChange={setTeam}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="בחר קבוצה" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="senior">קבוצה בוגרת</SelectItem>
                                    <SelectItem value="youth">קבוצת נוער</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Opponent Selection */}
                        <div className="grid grid-cols-4 items-center gap-4">
                           <Label htmlFor="opponent" className="text-right">יריבה*</Label>
                           <Select value={opponent} onValueChange={setOpponent}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="בחר יריבה" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TEAM_NAMES.map(name => <SelectItem key={name} value={name}>{name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Date and Time */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">תאריך ושעה*</Label>
                            <Input
                                id="date"
                                type="datetime-local"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        {/* Venue */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="venue" className="text-right">בית/חוץ</Label>
                            <Select value={venue} onValueChange={setVenue}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="בחר מיקום" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="home">בית</SelectItem>
                                    <SelectItem value="away">חוץ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         {/* Competition */}
                        <div className="grid grid-cols-4 items-center gap-4">
                             <Label htmlFor="competition" className="text-right">מפעל*</Label>
                             <Select value={competition} onValueChange={setCompetition}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="בחר מפעל" />
                                </SelectTrigger>
                                <SelectContent>
                                     {COMPETITION_NAMES.map(name => <SelectItem key={name} value={name}>{name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Stage */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="stage" className="text-right">שלב/מחזור*</Label>
                            <Input
                                id="stage"
                                value={stage}
                                onChange={(e) => setStage(e.target.value)}
                                className="col-span-3"
                                placeholder="לדוגמה: מחזור 14"
                            />
                        </div>
                        {/* Score */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="score" className="text-right">תוצאה</Label>
                            <Input
                                id="score"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                className="col-span-3"
                                placeholder="לדוגמה: 2-1 (התוצאה שלנו קודם)"
                            />
                        </div>
                        {/* Notes */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notes" className="text-right">הערות</Label>
                            <Textarea
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="col-span-3"
                                placeholder="הערות נוספות (כובשים, כרטיסים וכו')"
                            />
                        </div>
                         <p className="text-sm text-muted-foreground col-span-4">* שדה חובה</p>
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