import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Eye, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VideoData {
  title: string;
  description: string;
  youtubeUrl: string;
  category: string;
  date: string;
  views?: number;
}

// Demo video data for when Firebase is not available
const demoVideos: Record<string, VideoData> = {
  "demo-1": {
    title: "סיכום המשחק נגד הפועל רעננה",
    description: "כל השערים וההזדמנויות מהניצחון המרשים 2-1. המשחק התקיים באצטדיון הבית שלנו עם תמיכה גדולה מהקהל הנאמן.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "סיכומי משחקים",
    date: new Date().toISOString(),
    views: 2340
  },
  "demo-2": {
    title: "ראיון עם המאמן לאחר הניצחון",
    description: "המאמן מוחמד חסן מסכם את המשחק ומדבר על התכניות לעתיד. ראיון מעמיק על האסטרטגיה והמטרות של הקבוצה.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "ראיונות",
    date: new Date(Date.now() - 86400000).toISOString(),
    views: 1890
  }
};

const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!id) {
        setError("Video ID is missing.");
        setIsLoading(false);
        return;
      }

      // Check if Firebase is available
      if (!db) {
        console.warn("Firebase not available - checking demo videos");
        const demoVideo = demoVideos[id];
        if (demoVideo) {
          setVideo(demoVideo);
        } else {
          setError("הסרטון לא נמצא.");
        }
        setIsLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "videos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVideo(docSnap.data() as VideoData);
        } else {
          setError("הסרטון לא נמצא.");
        }
      } catch (err) {
        setError("אירעה שגיאה בטעינת הסרטון.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        טוען סרטון...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">שגיאה</h2>
        <p>{error}</p>
        <Link to="/tv" className="text-blue-500 hover:underline mt-4 inline-block">
          חזור לטבריה TV
        </Link>
      </div>
    );
  }
  
  if (!video) {
    return (
      <div className="flex justify-center items-center h-screen">
        הסרטון המבוקש אינו קיים.
      </div>
    );
  }

  const videoId = getYouTubeVideoId(video.youtubeUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {!db && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-right mb-6">
            <p className="text-yellow-800">
              <strong>מצב הדגמה:</strong> Firebase לא מוגדר. מציג נתוני דגמה בלבד.
            </p>
          </div>
        )}
        
        <article>
          <div className="mb-4">
            <Link to="/tv" className="text-sm text-blue-600 hover:underline flex items-center">
              <ArrowRight className="h-4 w-4 ml-1" />
              חזרה לטבריה TV
            </Link>
          </div>
          
          <h1 className="text-4xl font-extrabold text-right mb-3">{video.title}</h1>
          
          <div className="flex items-center space-x-4 space-x-reverse text-muted-foreground mb-4">
            <Badge>{video.category}</Badge>
            <div className="flex items-center">
              <span className="ml-1">{video.views || 0}</span>
              <Eye className="h-4 w-4" />
            </div>
            <div className="flex items-center">
              <span className="ml-1">{new Date(video.date).toLocaleDateString('he-IL')}</span>
              <Calendar className="h-4 w-4" />
            </div>
          </div>

          {/* YouTube Video Embed */}
          {embedUrl && (
            <div className="relative w-full h-0 pb-[56.25%] mb-8">
              <iframe
                src={embedUrl}
                title={video.title}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Video Description */}
          <div className="prose prose-lg max-w-none text-right">
            <p className="text-lg leading-relaxed">{video.description}</p>
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
};

export default VideoPage; 