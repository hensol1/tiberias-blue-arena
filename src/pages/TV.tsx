
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Eye, Clock } from "lucide-react";

const TV = () => {
  const featuredVideos = [
    {
      title: "סיכום המשחק נגד הפועל רעננה",
      description: "כל השערים וההזדמנויות מהניצחון המרשים 2-1",
      thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=300&fit=crop",
      duration: "8:45",
      views: 2340,
      date: "19 דצמבר 2024",
      category: "סיכומי משחקים"
    },
    {
      title: "ראיון עם המאמן לאחר הניצחון",
      description: "המאמן מוחמד חסן מסכם את המשחק ומדבר על התכניות לעתיד",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop",
      duration: "12:30",
      views: 1890,
      date: "19 דצמבר 2024",
      category: "ראיונות"
    }
  ];

  const videoCategories = [
    {
      title: "סיכומי משחקים",
      count: 25,
      icon: "🎯",
      description: "סיכומים מפורטים של כל המשחקים"
    },
    {
      title: "ראיונות",
      count: 18,
      icon: "🎤",
      description: "ראיונות עם שחקנים ואנשי צוות"
    },
    {
      title: "אימונים",
      count: 12,
      icon: "💪",
      description: "מבט מאחורי הקלעים על האימונים"
    },
    {
      title: "אירועי מועדון",
      count: 8,
      icon: "🎉",
      description: "אירועים מיוחדים ופעילויות קהילה"
    }
  ];

  const recentVideos = [
    {
      title: "אימון לקראת המשחק הבא",
      thumbnail: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=200&fit=crop",
      duration: "5:22",
      views: 890,
      date: "17 דצמבר 2024"
    },
    {
      title: "שער השבוע - יוסי כהן",
      thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=200&fit=crop",
      duration: "1:15",
      views: 1250,
      date: "16 דצמבר 2024"
    },
    {
      title: "מאחורי הקלעים - יום האוהדים",
      thumbnail: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=200&fit=crop",
      duration: "10:30",
      views: 2100,
      date: "15 דצמבר 2024"
    },
    {
      title: "ראיון עם הקפטן אמיר לוי",
      thumbnail: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=200&fit=crop",
      duration: "8:45",
      views: 1670,
      date: "14 דצמבר 2024"
    }
  ];

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
        {/* Featured Videos */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">סרטונים מובלטים</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredVideos.map((video, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <Play className="h-6 w-6 mr-2" />
                        נגן
                      </Button>
                    </div>
                    <Badge className="absolute bottom-3 left-3 bg-black/80">
                      {video.duration}
                    </Badge>
                    <Badge variant="secondary" className="absolute top-3 right-3">
                      {video.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-right mb-2 text-team-dark">
                    {video.title}
                  </h3>
                  <p className="text-muted-foreground text-right text-sm mb-4">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <span className="ml-1">{video.views}</span>
                      <Eye className="h-3 w-3" />
                    </div>
                    <div className="flex items-center">
                      <span className="ml-1">{video.date}</span>
                      <Calendar className="h-3 w-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Video Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">קטגוריות וידאו</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoCategories.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-team-dark mb-2">{category.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{category.description}</p>
                  <Badge variant="outline" className="text-team-primary border-team-primary">
                    {category.count} סרטונים
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Videos */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">סרטונים אחרונים</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentVideos.map((video, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                    <Badge className="absolute bottom-2 left-2 bg-black/80 text-xs">
                      {video.duration}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-3">
                  <h4 className="font-medium text-right text-sm mb-2 text-team-dark line-clamp-2">
                    {video.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <span className="ml-1">{video.views}</span>
                      <Eye className="h-3 w-3" />
                    </div>
                    <div className="flex items-center">
                      <span className="ml-1">{video.date}</span>
                      <Calendar className="h-3 w-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default TV;
