import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface AddGameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGameAdded: (game: any) => void;
}

const AddGameDialog = ({ isOpen, onClose, onGameAdded }: AddGameDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gameData, setGameData] = useState({
    opponent: "",
    competition: "ליגה",
    venue: "",
    date: "",
    time: "",
    isHome: false,
    team: "senior" as "senior" | "youth",
    status: "upcoming" as "upcoming" | "recent",
    result: "",
    won: null as boolean | null | undefined,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setGameData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setGameData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!gameData.opponent || !gameData.date || !gameData.time) {
      toast({ title: "נא למלא שדות חובה (יריב, תאריך, שעה)", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
        const gamePayload: any = {
            ...gameData,
            createdAt: serverTimestamp(),
        };

        if (gameData.status === 'upcoming') {
            delete gamePayload.result;
            delete gamePayload.won;
        } else {
             // For recent games, parse the result to determine 'won'
             const [homeScore, awayScore] = gameData.result.split('-').map(Number);
             if (!isNaN(homeScore) && !isNaN(awayScore)) {
                 const ourScore = gameData.isHome ? homeScore : awayScore;
                 const opponentScore = gameData.isHome ? awayScore : homeScore;
                 if (ourScore > opponentScore) gamePayload.won = true;
                 else if (ourScore < opponentScore) gamePayload.won = false;
                 else gamePayload.won = null; // Tie
             }
        }

      const docRef = await addDoc(collection(db, "games"), gamePayload);
      onGameAdded({ ...gamePayload, id: docRef.id, date: gameData.date }); // pass new game to parent
      toast({ title: "המשחק נוסף בהצלחה!" });
      onClose();
    } catch (error) {
      console.error("Error adding game:", error);
      toast({ title: "שגיאה בהוספת המשחק", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] text-right" dir="rtl">
        <DialogHeader>
          <DialogTitle>הוספת משחק חדש</DialogTitle>
          <DialogDescription>
            מלא את הפרטים כדי להוסיף משחק חדש למערכת.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="opponent" className="text-right">
              קבוצה יריבה
            </Label>
            <Input id="opponent" name="opponent" value={gameData.opponent} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              תאריך
            </Label>
            <Input id="date" name="date" type="date" value={gameData.date} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              שעה
            </Label>
            <Input id="time" name="time" type="time" value={gameData.time} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="venue" className="text-right">
              מיקום
            </Label>
            <Input id="venue" name="venue" value={gameData.venue} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="competition" className="text-right">
              מסגרת
            </Label>
            <Select onValueChange={(v) => handleSelectChange("competition", v)} defaultValue={gameData.competition}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="בחר מסגרת" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ליגה">ליגה</SelectItem>
                <SelectItem value="גביע">גביע</SelectItem>
                <SelectItem value="גביע הטוטו">גביע הטוטו</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="team" className="text-right">
              קבוצה
            </Label>
            <Select onValueChange={(v) => handleSelectChange("team", v)} defaultValue={gameData.team}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="בחר קבוצה" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="senior">קבוצה בוגרת</SelectItem>
                <SelectItem value="youth">קבוצת נוער</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              סטטוס
            </Label>
            <Select onValueChange={(v) => handleSelectChange("status", v)} defaultValue={gameData.status}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="בחר סטטוס" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">משחק קרוב</SelectItem>
                <SelectItem value="recent">תוצאה אחרונה</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {gameData.status === 'recent' && (
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="result" className="text-right">
                    תוצאה
                </Label>
                <Input id="result" name="result" placeholder="לדוג': 2-1" value={gameData.result} onChange={handleInputChange} className="col-span-3" />
            </div>
          )}
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox id="isHome" name="isHome" checked={gameData.isHome} onCheckedChange={(c) => handleSelectChange("isHome", String(c))} />
            <Label htmlFor="isHome">משחק בית?</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>ביטול</Button>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting} className="bg-team-primary hover:bg-team-secondary">
            {isSubmitting ? "מוסיף..." : "הוסף משחק"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddGameDialog; 