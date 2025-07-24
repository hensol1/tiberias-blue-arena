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
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useToast } from "@/hooks/use-toast";
import { TEAM_NAMES } from "@/lib/team-logo-map";
import { COMPETITION_NAMES } from "@/lib/competition-logo-map";
import { X, Upload, Image as ImageIcon } from "lucide-react";

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
    const [images, setImages] = useState<string[]>([]);
    const [uploadingImages, setUploadingImages] = useState(false);
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
            setImages(gameToEdit.images || []);
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
            setImages([]);
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

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setUploadingImages(true);
        const uploadedUrls: string[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    toast({ title: "רק קבצי תמונה נתמכים", variant: "destructive" });
                    continue;
                }

                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    toast({ title: "גודל הקובץ חייב להיות פחות מ-5MB", variant: "destructive" });
                    continue;
                }

                // Try Firebase Storage first
                if (storage) {
                    const timestamp = Date.now();
                    const fileName = `games/${timestamp}_${file.name}`;
                    const storageRef = ref(storage, fileName);
                    
                    try {
                        console.log(`Uploading file: ${fileName}`);
                        const snapshot = await uploadBytes(storageRef, file);
                        console.log(`File uploaded successfully: ${snapshot.ref.fullPath}`);
                        
                        const downloadURL = await getDownloadURL(snapshot.ref);
                        console.log(`Download URL: ${downloadURL}`);
                        uploadedUrls.push(downloadURL);
                    } catch (uploadError) {
                        console.error(`Error uploading file ${fileName}:`, uploadError);
                        
                        // Check for specific error types
                        if (uploadError instanceof Error) {
                            if (uploadError.message.includes('CORS')) {
                                console.warn("CORS error detected, falling back to base64");
                                // Fallback to base64
                                const base64Url = await convertToBase64(file);
                                uploadedUrls.push(base64Url);
                            } else if (uploadError.message.includes('permission')) {
                                toast({ 
                                    title: "אין הרשאה להעלות תמונות", 
                                    description: "בדוק את הרשאות המשתמש",
                                    variant: "destructive" 
                                });
                            } else {
                                console.warn("Upload error, falling back to base64");
                                // Fallback to base64 for other errors
                                const base64Url = await convertToBase64(file);
                                uploadedUrls.push(base64Url);
                            }
                        } else {
                            console.warn("Unknown upload error, falling back to base64");
                            // Fallback to base64
                            const base64Url = await convertToBase64(file);
                            uploadedUrls.push(base64Url);
                        }
                    }
                } else {
                    // No Firebase Storage available, use base64
                    console.log("Firebase Storage not available, using base64");
                    const base64Url = await convertToBase64(file);
                    uploadedUrls.push(base64Url);
                }
            }

            if (uploadedUrls.length > 0) {
                setImages(prev => [...prev, ...uploadedUrls]);
                toast({ 
                    title: `${uploadedUrls.length} תמונות הועלו בהצלחה`,
                    description: uploadedUrls.length < files.length ? `${files.length - uploadedUrls.length} תמונות נכשלו` : undefined
                });
            }
        } catch (error) {
            console.error("Error in image upload process:", error);
            toast({ title: "שגיאה בהעלאת התמונות", variant: "destructive" });
        } finally {
            setUploadingImages(false);
        }
    };

    // Helper function to convert file to base64
    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const removeImage = async (imageUrl: string, index: number) => {
        // If it's a base64 URL, just remove from state
        if (imageUrl.startsWith('data:')) {
            setImages(prev => prev.filter((_, i) => i !== index));
            toast({ title: "התמונה נמחקה בהצלחה" });
            return;
        }

        // If Firebase Storage is not available, just remove from state
        if (!storage) {
            setImages(prev => prev.filter((_, i) => i !== index));
            toast({ title: "התמונה נמחקה בהצלחה" });
            return;
        }

        try {
            // Extract the file path from the URL
            const urlParts = imageUrl.split('/');
            const fileName = urlParts[urlParts.length - 1];
            const filePath = `games/${fileName}`;
            
            const storageRef = ref(storage, filePath);
            await deleteObject(storageRef);
            
            setImages(prev => prev.filter((_, i) => i !== index));
            toast({ title: "התמונה נמחקה בהצלחה" });
        } catch (error) {
            console.error("Error deleting image:", error);
            // Even if deletion fails, remove from state
            setImages(prev => prev.filter((_, i) => i !== index));
            toast({ title: "התמונה נמחקה מהרשימה" });
        }
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
            images,
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
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
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

                        {/* Images Upload */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="images">תמונות מהמשחק</Label>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="images"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        disabled={uploadingImages}
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={uploadingImages}
                                        className="flex items-center gap-2"
                                    >
                                        <Upload className="h-4 w-4" />
                                        {uploadingImages ? "מעלה..." : "העלה תמונות"}
                                    </Button>
                                </div>
                                
                                {/* Storage Status */}
                                <div className="text-xs text-muted-foreground">
                                    {storage ? (
                                        <span className="text-green-600">✓ תמונות יישמרו ב-Firebase Storage</span>
                                    ) : (
                                        <span className="text-orange-600">⚠ תמונות יישמרו כקובץ מקומי (base64)</span>
                                    )}
                                </div>
                                
                                {/* Image Gallery */}
                                {images.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                        {images.map((imageUrl, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={imageUrl}
                                                    alt={`תמונה ${index + 1}`}
                                                    className="w-full h-24 object-cover rounded-md"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => removeImage(imageUrl, index)}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                                {/* Storage indicator */}
                                                {imageUrl.startsWith('data:') && (
                                                    <div className="absolute bottom-1 left-1 bg-orange-500 text-white text-xs px-1 py-0.5 rounded">
                                                        מקומי
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
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
                        <Button type="submit" disabled={uploadingImages}>
                            {isEditMode ? "שמור שינויים" : "הוסף משחק"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddGameDialog; 