import { useState, useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trash2, Play } from "lucide-react";
import { Link } from "react-router-dom";

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  category: string;
  date: string;
  featured?: boolean;
  showDelete?: boolean;
  onDelete?: (id: string) => void;
}

const VideoCard = ({ 
  id, 
  title, 
  description, 
  youtubeUrl, 
  category, 
  date, 
  featured = false, 
  showDelete = false, 
  onDelete 
}: VideoCardProps) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(youtubeUrl);
  
  // YouTube thumbnail with fallback: try maxresdefault first, then hqdefault, then sddefault
  const getThumbnailUrl = (quality: 'maxresdefault' | 'hqdefault' | 'sddefault' = 'maxresdefault') => {
    return videoId ? `https://img.youtube.com/vi/${videoId}/${quality}.jpg` : '';
  };
  
  const [thumbnailUrl, setThumbnailUrl] = useState(getThumbnailUrl('maxresdefault'));
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const qualityRef = useRef<'maxresdefault' | 'hqdefault' | 'sddefault' | 'default'>('maxresdefault');
  
  const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    // Fallback to lower quality thumbnails if current quality fails
    if (qualityRef.current === 'maxresdefault') {
      qualityRef.current = 'hqdefault';
      const newUrl = getThumbnailUrl('hqdefault');
      setThumbnailUrl(newUrl);
      img.src = newUrl; // Directly update to ensure immediate fallback
    } else if (qualityRef.current === 'hqdefault') {
      qualityRef.current = 'sddefault';
      const newUrl = getThumbnailUrl('sddefault');
      setThumbnailUrl(newUrl);
      img.src = newUrl; // Directly update to ensure immediate fallback
    } else if (qualityRef.current === 'sddefault') {
      // Try default.jpg as last resort
      qualityRef.current = 'default';
      const newUrl = videoId ? `https://img.youtube.com/vi/${videoId}/default.jpg` : '';
      if (newUrl) {
        setThumbnailUrl(newUrl);
        img.src = newUrl;
      } else {
        // All thumbnails failed, show placeholder
        setShowPlaceholder(true);
      }
    } else {
      // All attempts failed, show placeholder
      setShowPlaceholder(true);
    }
  };

  return (
    <Card className={`group relative hover:shadow-lg transition-all duration-300 overflow-hidden ${
      featured ? 'ring-2 ring-team-secondary' : ''
    }`}>
      {showDelete && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 left-2 z-10 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              title="מחק סרטון"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle>האם אתה בטוח?</AlertDialogTitle>
              <AlertDialogDescription>
                פעולה זו תמחק את הסרטון לצמיתות. לא ניתן לשחזר את הפעולה.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>ביטול</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                מחק
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <Link to={`/video/${id}`}>
        <CardHeader className="p-0">
          <div className="relative">
            {showPlaceholder ? (
              <div className="w-full h-48 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm opacity-75">תמונה לא זמינה</p>
                </div>
              </div>
            ) : (
              <img 
                key={`${videoId}-${qualityRef.current}`}
                src={thumbnailUrl} 
                alt={title}
                onError={handleThumbnailError}
                onLoad={() => {
                  // Reset placeholder state if image loads successfully
                  if (showPlaceholder) {
                    setShowPlaceholder(false);
                  }
                }}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                <Play className="h-6 w-6 mr-2" />
                נגן
              </Button>
            </div>
            <Badge variant="secondary" className="absolute top-3 right-3">
              {category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-right mb-2 text-team-dark line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-right text-sm mb-4 line-clamp-3">
            {description}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-end text-xs text-muted-foreground w-full">
            <div className="flex items-center">
              <span className="ml-1">{new Date(date).toLocaleDateString('he-IL')}</span>
              <Calendar className="h-3 w-3" />
            </div>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default VideoCard; 