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

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  featured?: boolean;
  showDelete?: boolean;
  onDelete?: (id: string) => void;
  isLarge?: boolean;
  duration?: string;
}

// Map Hebrew categories to English labels
const getCategoryLabel = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    'כללי': 'FEATURES',
    'משחקים': 'MATCHES',
    'אימונים': 'TRAINING',
    'העברות': 'TRANSFERS',
    'נוער': 'YOUTH',
    'ראיונות': 'INTERVIEWS',
    'תמונות': 'PICTURE SPECIAL'
  };
  return categoryMap[category] || category.toUpperCase();
};

const NewsCard = ({ id, title, excerpt, image, date, category, featured = false, showDelete = false, onDelete, isLarge = false, duration }: NewsCardProps) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  if (isLarge) {
    return (
      <div className="group relative hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden bg-black">
        {showDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 left-2 z-10 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                title="מחק חדשה"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent dir="rtl">
              <AlertDialogHeader>
                <AlertDialogTitle>האם אתה בטוח?</AlertDialogTitle>
                <AlertDialogDescription>
                  פעולה זו תמחק את החדשה לצמיתות. לא ניתן לשחזר את הפעולה.
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

        <Link to={`/article/${id}`} className="cursor-pointer block">
          <div className="relative h-56 md:h-64 w-full overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              style={{ objectPosition: 'center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
              <Badge className="bg-white/10 backdrop-blur text-[10px] font-semibold px-2 py-0.5 border border-white/30">
                {getCategoryLabel(category)}
              </Badge>
              {duration && (
                <Badge className="bg-white/10 backdrop-blur text-[10px] font-semibold px-2 py-0.5 flex items-center gap-1 border border-white/30">
                  <Play className="h-3 w-3" />
                  {duration}
                </Badge>
              )}
            </div>

            <div className="absolute bottom-4 right-4 left-4 text-right">
              <h3 className="text-lg md:text-xl font-bold text-white leading-snug mb-1 line-clamp-2 group-hover:text-team-secondary transition-colors">
                {title}
              </h3>
              <div className="flex items-center justify-end gap-1 text-[11px] text-gray-200/90">
                <span className="ml-1">
                  {new Date(date).toLocaleDateString('he-IL')}
                </span>
                <Calendar className="h-3 w-3" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

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
              title="מחק חדשה"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle>האם אתה בטוח?</AlertDialogTitle>
              <AlertDialogDescription>
                פעולה זו תמחק את החדשה לצמיתות. לא ניתן לשחזר את הפעולה.
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

      <Link to={`/article/${id}`} className="cursor-pointer">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-48 md:h-32 lg:h-28 object-cover group-hover:scale-105 transition-transform duration-300"
              style={{ objectPosition: 'center top' }}
            />
            {featured && (
              <Badge className="absolute top-3 right-3 bg-team-secondary hover:bg-team-secondary text-xs">
                מומלץ
              </Badge>
            )}
            <Badge variant="secondary" className="absolute bottom-3 right-3 bg-white/90 text-xs">
              {category}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 md:p-3 lg:p-2">
          <h3 className="text-lg md:text-base lg:text-sm font-semibold text-right mb-2 group-hover:text-team-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-right text-sm md:text-xs leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        </CardContent>
        
        <CardFooter className="px-4 md:px-3 lg:px-2 pb-4 md:pb-3 lg:pb-2 pt-0 flex items-center justify-end">
          <div className="flex items-center text-xs md:text-xs text-muted-foreground">
            <span className="ml-1">{new Date(date).toLocaleDateString('he-IL')}</span>
            <Calendar className="h-3 w-3" />
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default NewsCard;
