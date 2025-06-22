import { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; // Import the Firestore instance
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Eye, Upload, LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import NewsCard from "./NewsCard";

interface NewsItem {
  id: string; // Firestore uses string IDs
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  views?: number;
  featured?: boolean;
}

// Demo data for when Firebase is not available
const demoNews: NewsItem[] = [
  {
    id: "demo-1",
    title: "ברוכים הבאים לאתר עירוני טבריה",
    excerpt: "האתר הרשמי של מועדון הכדורגל עירוני טבריה",
    content: "ברוכים הבאים לאתר הרשמי של מועדון הכדורגל עירוני טבריה. כאן תוכלו למצוא את כל החדשות, המשחקים והעדכונים על המועדון.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop",
    date: new Date().toLocaleDateString('he-IL'),
    category: "כללי",
    views: 0,
    featured: true
  },
  {
    id: "demo-2",
    title: "משחק הבית הבא",
    excerpt: "המועדון יארח את הקבוצה הבאה בשבת הקרובה",
    content: "בשבת הקרובה יארח המועדון את הקבוצה הבאה באצטדיון הבית. צפויה להיות משחק מרגש עם תמיכה גדולה מהקהל.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop",
    date: new Date(Date.now() - 86400000).toLocaleDateString('he-IL'),
    category: "משחקים",
    views: 0,
    featured: false
  }
];

const NewsFeed = () => {
  const { toast } = useToast();
  const { user, logout, hasPermission, isAuthenticated } = useAuth();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [newNews, setNewNews] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "כללי",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop"
  });

  useEffect(() => {
    const getNews = async () => {
      setIsLoading(true);
      
      // Check if Firebase is available
      if (!db) {
        console.warn("Firebase not available - using demo data");
        setNews(demoNews);
        setIsLoading(false);
        return;
      }

      try {
        const newsCollectionRef = collection(db, "news");
        const q = query(newsCollectionRef, orderBy("date", "desc"));
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        } as NewsItem));
        setNews(filteredData);
      } catch (error) {
        console.error("Error fetching news from Firestore: ", error);
        toast({ title: "שגיאה בטעינת החדשות", variant: "destructive" });
        // Fallback to demo data
        setNews(demoNews);
      } finally {
        setIsLoading(false);
      }
    };
    getNews();
  }, [toast]);

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

  const handleAddNews = async () => {
    if (!newNews.title || !newNews.excerpt) {
      toast({ title: "נא למלא את כל השדות", variant: "destructive" });
      return;
    }

    // Check if Firebase is available
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
      
      // Add new item to state to reflect change immediately
      setNews(prev => [{ id: docRef.id, ...newNews, date: new Date().toLocaleDateString('he-IL'), views: 0, featured: false }, ...prev]);

      setShowAddForm(false);
      setNewNews({ title: "", excerpt: "", content: "", category: "כללי", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop" });
      setImageFile(null);
      setImagePreview("");
      toast({ title: "החדשה נוספה בהצלחה!" });

    } catch (error) {
      console.error("Error adding document: ", error);
      toast({ title: "שגיאה בהוספת חדשה", variant: "destructive" });
    }
  };

  const handleDeleteNews = async (id: string) => {
    // Check if Firebase is available
    if (!db) {
      toast({ title: "Firebase לא זמין - לא ניתן למחוק חדשות", variant: "destructive" });
      return;
    }

    try {
      const newsDoc = doc(db, "news", id);
      await deleteDoc(newsDoc);
      setNews(prev => prev.filter(item => item.id !== id));
      toast({ title: "החדשה נמחקה בהצלחה" });
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast({ title: "שגיאה במחיקת חדשה", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    logout();
    toast({ title: "התנתקת בהצלחה מהמערכת." });
  };
  
  const categories = ["כללי", "משחקים", "העברות", "נוער", "אימונים"];

  if (isLoading) {
    return <div className="text-center py-12">טוען חדשות...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="relative flex justify-center items-center">
        <h2 className="text-2xl font-bold">חדשות ועדכונים</h2>
        <div className="absolute right-0 flex items-center space-x-2 space-x-reverse">
          {isAuthenticated && hasPermission('add_news') && db && (
            <Button onClick={() => setShowAddForm(s => !s)} className="bg-team-primary hover:bg-team-secondary">
              <Plus className="h-4 w-4 ml-2" />
              {showAddForm ? "בטל" : "הוסף חדשה"}
            </Button>
          )}
          {isAuthenticated && (
             <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-sm text-gray-600">שלום, {user?.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 ml-1" />
                התנתק
              </Button>
            </div>
          )}
        </div>
      </div>

      {!db && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-right">
          <p className="text-yellow-800">
            <strong>מצב הדגמה:</strong> Firebase לא מוגדר. מציג נתוני דגמה בלבד.
          </p>
        </div>
      )}

      {showAddForm && (
        <Card className="animate-fade-in">
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
                onClick={() => setShowAddForm(false)}
              >
                ביטול
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <NewsCard
            key={item.id}
            {...item}
            showDelete={isAuthenticated && hasPermission('delete_news')}
            onDelete={() => handleDeleteNews(item.id)}
          />
        ))}
      </div>
      
      {!isLoading && news.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">אין חדשות להצגה</p>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
