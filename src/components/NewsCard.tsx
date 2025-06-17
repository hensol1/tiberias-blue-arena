
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye } from "lucide-react";

interface NewsCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  views?: number;
  featured?: boolean;
}

const NewsCard = ({ title, excerpt, image, date, category, views = 0, featured = false }: NewsCardProps) => {
  return (
    <Card className={`group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden ${
      featured ? 'ring-2 ring-team-secondary' : ''
    }`}>
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
    </Card>
  );
};

export default NewsCard;
