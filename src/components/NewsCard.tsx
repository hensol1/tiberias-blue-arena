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
import { Calendar, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  views?: number;
  featured?: boolean;
  showDelete?: boolean;
  onDelete?: (id: string) => void;
}

const NewsCard = ({ id, title, excerpt, image, date, category, views = 0, featured = false, showDelete = false, onDelete }: NewsCardProps) => {
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
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {featured && (
              <Badge className="absolute top-3 right-3 bg-team-secondary hover:bg-team-secondary">
                מומלץ
              </Badge>
            )}
            <Badge variant="secondary" className="absolute bottom-3 right-3 bg-white/90">
              {category}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-right mb-2 group-hover:text-team-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-right text-sm leading-relaxed">
            {excerpt}
          </p>
        </CardContent>
        
        <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="ml-1">{views}</span>
            <Eye className="h-3 w-3" />
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="ml-1">{date}</span>
            <Calendar className="h-3 w-3" />
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default NewsCard;
