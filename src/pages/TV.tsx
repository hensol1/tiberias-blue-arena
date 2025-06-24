import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Eye, Plus, LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import VideoCard from "@/components/VideoCard";
import AddVideoDialog from "@/components/AddVideoDialog";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  category: string;
  date: string;
  views?: number;
  featured?: boolean;
}

// Demo data for when Firebase is not available
const demoVideos: VideoItem[] = [
  {
    id: "demo-1",
    title: "סיכום המשחק נגד הפועל רעננה",
    description: "כל השערים וההזדמנויות מהניצחון המרשים 2-1",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "תקצירים",
    date: new Date().toISOString(),
    views: 2340,
    featured: true
  },
  {
    id: "demo-2",
    title: "ראיון עם המאמן לאחר הניצחון",
    description: "המאמן מוחמד חסן מסכם את המשחק ומדבר על התכניות לעתיד",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "ראיונות",
    date: new Date(Date.now() - 86400000).toISOString(),
    views: 1890,
    featured: false
  }
];

const TV = () => {
  const { toast } = useToast();
  const { user, logout, hasPermission, isAuthenticated } = useAuth();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    const getVideos = async () => {
      setIsLoading(true);
      
      // Check if Firebase is available
      if (!db) {
        console.warn("Firebase not available - using demo data");
        setVideos(demoVideos);
        setIsLoading(false);
        return;
      }

      try {
        const videosCollectionRef = collection(db, "videos");
        const q = query(videosCollectionRef, orderBy("date", "desc"));
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        } as VideoItem));
        setVideos(filteredData);
      } catch (error) {
        console.error("Error fetching videos from Firestore: ", error);
        toast({ title: "שגיאה בטעינת הסרטונים", variant: "destructive" });
        // Fallback to demo data
        setVideos(demoVideos);
      } finally {
        setIsLoading(false);
      }
    };
    getVideos();
  }, [toast]);

  const handleVideoAdded = (newVideo: VideoItem) => {
    setVideos(prev => [newVideo, ...prev]);
  };

  const handleVideoUpdated = (updatedVideo: VideoItem) => {
    setVideos(prev => prev.map(v => v.id === updatedVideo.id ? updatedVideo : v));
  };

  const handleDeleteVideo = async (id: string) => {
    // Check if Firebase is available
    if (!db) {
      toast({ title: "Firebase לא זמין - לא ניתן למחוק סרטונים", variant: "destructive" });
      return;
    }

    try {
      const videoDoc = doc(db, "videos", id);
      await deleteDoc(videoDoc);
      setVideos(prev => prev.filter(item => item.id !== id));
      toast({ title: "הסרטון נמחק בהצלחה" });
    } catch (error) {
      console.error("Error deleting video: ", error);
      toast({ title: "שגיאה במחיקת סרטון", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    logout();
    toast({ title: "התנתקת בהצלחה מהמערכת." });
  };

  const closeAddOrEditDialog = () => {
    setShowAddDialog(false);
    setEditingVideo(null);
  };

  const featuredVideos = videos.filter(v => v.featured).slice(0, 2);
  const recentVideos = videos.slice(0, 4);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header />
        <div className="text-center py-12">טוען סרטונים...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-team-primary to-team-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">TV טבריה</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            כל התכנים, הסיכומים והראיונות של עירוני טבריה במקום אחד
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Admin Controls */}
        <section className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              {isAuthenticated && hasPermission('add_video') && db && (
                <Button onClick={() => setShowAddDialog(true)} className="bg-team-primary hover:bg-team-secondary">
                  <Plus className="h-4 w-4 ml-2" />
                  הוסף סרטון
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
        </section>

        {!db && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-right mb-8">
            <p className="text-yellow-800">
              <strong>מצב הדגמה:</strong> Firebase לא מוגדר. מציג נתוני דגמה בלבד.
            </p>
          </div>
        )}

        {/* Featured Videos */}
        {featuredVideos.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">סרטונים מובלטים</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  {...video}
                  showDelete={isAuthenticated && hasPermission('delete_video')}
                  onDelete={handleDeleteVideo}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recent Videos */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">סרטונים אחרונים</h2>
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  {...video}
                  showDelete={isAuthenticated && hasPermission('delete_video')}
                  onDelete={handleDeleteVideo}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">אין סרטונים להצגה</p>
            </div>
          )}
        </section>
      </div>

      {/* Add/Edit Video Dialog */}
      {showAddDialog && (
        <AddVideoDialog
          isOpen={showAddDialog}
          onClose={closeAddOrEditDialog}
          onVideoAdded={handleVideoAdded}
          onVideoUpdated={handleVideoUpdated}
          videoToEdit={editingVideo}
        />
      )}

      <Footer />
    </div>
  );
};

export default TV;
