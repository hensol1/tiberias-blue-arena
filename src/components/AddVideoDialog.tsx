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

const AddVideoDialog = ({ isOpen, onClose, onVideoAdded, onVideoUpdated, videoToEdit }: {
    isOpen: boolean;
    onClose: () => void;
    onVideoAdded: (video: any) => void;
    onVideoUpdated: (video: any) => void;
    videoToEdit?: any | null;
}) => {
    const { toast } = useToast();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [category, setCategory] = useState("תקצירים");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEditMode = !!videoToEdit;

    useEffect(() => {
        if (isEditMode && videoToEdit) {
            setTitle(videoToEdit.title || "");
            setDescription(videoToEdit.description || "");
            setYoutubeUrl(videoToEdit.youtubeUrl || "");
            setCategory(videoToEdit.category || "תקצירים");
        } else {
            setTitle("");
            setDescription("");
            setYoutubeUrl("");
            setCategory("תקצירים");
        }
    }, [isEditMode, videoToEdit, isOpen]);

    const validateYouTubeUrl = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title || !description || !youtubeUrl || !category) {
            toast({ title: "נא למלא את כל שדות החובה", variant: "destructive" });
            return;
        }

        if (!validateYouTubeUrl(youtubeUrl)) {
            toast({ title: "נא להזין כתובת YouTube תקינה", variant: "destructive" });
            return;
        }

        setIsSubmitting(true);

        const videoData = {
            title,
            description,
            youtubeUrl,
            category,
            date: new Date().toISOString(),
            views: 0,
            featured: false,
            lastUpdated: serverTimestamp()
        };

        try {
            if (isEditMode) {
                const videoRef = doc(db, "videos", videoToEdit.id);
                await updateDoc(videoRef, videoData);
                onVideoUpdated({ ...videoData, id: videoToEdit.id });
                toast({ title: "הסרטון עודכן בהצלחה" });
            } else {
                const docRef = await addDoc(collection(db, "videos"), {
                    ...videoData,
                    createdAt: serverTimestamp()
                });
                onVideoAdded({ ...videoData, id: docRef.id });
                toast({ title: "הסרטון נוסף בהצלחה" });
            }
            onClose();
        } catch (error) {
            console.error("Error saving video: ", error);
            toast({ 
                title: isEditMode ? "שגיאה בעדכון הסרטון" : "שגיאה בהוספת הסרטון", 
                variant: "destructive" 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const categories = [
        "תקצירים",
        "ראיונות", 
        "אימונים",
        "אירועי מועדון",
        "שערים מיוחדים",
        "מאחורי הקלעים"
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-right">
                        {isEditMode ? "ערוך סרטון" : "הוסף סרטון חדש"}
                    </DialogTitle>
                    <DialogDescription className="text-right">
                        {isEditMode ? "ערוך את פרטי הסרטון" : "הוסף סרטון YouTube חדש לטבריה TV"}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-right block">כותרת</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="הכנס כותרת לסרטון..."
                            className="text-right"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-right block">תיאור</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="הכנס תיאור קצר של הסרטון..."
                            className="text-right"
                            rows={3}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="youtubeUrl" className="text-right block">קישור YouTube</Label>
                        <Input
                            id="youtubeUrl"
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="text-right"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-right block">קטגוריה</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="text-right">
                                <SelectValue placeholder="בחר קטגוריה" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter className="flex space-x-2 space-x-reverse">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-team-primary hover:bg-team-secondary"
                        >
                            {isSubmitting ? "שומר..." : (isEditMode ? "עדכן סרטון" : "הוסף סרטון")}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            ביטול
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddVideoDialog; 