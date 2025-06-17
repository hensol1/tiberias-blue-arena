
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NewsCard from "./NewsCard";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  views: number;
  featured: boolean;
}

const NewsFeed = () => {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNews, setNewNews] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "כללי",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop"
  });

  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: "ניצחון מרשים 3-1 על הפועל חיפה",
      excerpt: "הקבוצה הציגה משחק מעולה ורשמה ניצחון חשוב בליגה. שלושה שערים מדהימים והופעה מרשימה של כל השחקנים.",
      content: "פרטים מלאים על המשחק...",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop",
      date: "15 דצמבר 2024",
      category: "משחקים",
      views: 1250,
      featured: true
    },
    {
      id: 2,
      title: "חתימה על חוזה חדש עם השחקן הבוגר",
      excerpt: "המועדון חתם על הארכת חוזה עם אחד השחקנים הוותיקים והמוערכים ביותר. החוזה ייכנס לתוקף מיד.",
      content: "פרטים על החוזה...",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop",
      date: "14 דצמבר 2024",
      category: "העברות",
      views: 890,
      featured: false
    },
    {
      id: 3,
      title: "מחלקת הנוער זוכה באליפות האזורית",
      excerpt: "בני הנוער של המועדון זכו באליפות האזורית לאחר עונה מדהימה. הישג גדול לעתיד המועדון.",
      content: "פרטים על הזכייה...",
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=400&fit=crop",
      date: "13 דצמבר 2024",
      category: "נוער",
      views: 650,
      featured: false
    }
  ]);

  const handleAddNews = () => {
    if (!newNews.title || !newNews.excerpt) {
      toast({
        title: "שגיאה",
        description: "אנא מלא את כל השדות הנדרשים",
        variant: "destructive"
      });
      return;
    }

    const newsItem: NewsItem = {
      id: Date.now(),
      ...newNews,
      date: new Date().toLocaleDateString('he-IL'),
      views: 0,
      featured: false
    };

    setNews([newsItem, ...news]);
    setNewNews({
      title: "",
      excerpt: "",
      content: "",
      category: "כללי",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop"
    });
    setShowAddForm(false);

    toast({
      title: "החדשה נוספה בהצלחה!",
      description: "החדשה החדשה פורסמה באתר"
    });
  };

  const categories = ["כללי", "משחקים", "העברות", "נוער", "אימונים"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-team-primary hover:bg-team-secondary"
        >
          <Plus className="h-4 w-4 ml-2" />
          הוסף חדשה
        </Button>
        <h2 className="text-2xl font-bold text-right">חדשות ועדכונים</h2>
      </div>

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
            title={item.title}
            excerpt={item.excerpt}
            image={item.image}
            date={item.date}
            category={item.category}
            views={item.views}
            featured={item.featured}
          />
        ))}
      </div>

      {news.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">אין חדשות להצגה</p>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
