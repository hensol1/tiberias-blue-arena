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
import { Calendar, Trash2 } from "lucide-react";
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
}

const NewsCard = ({ id, title, excerpt, image, date, category, featured = false, showDelete = false, onDelete }: NewsCardProps) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
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
