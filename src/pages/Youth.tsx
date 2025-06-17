
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Trophy, Calendar, Star, MapPin, Phone } from "lucide-react";

const Youth = () => {
  const ageGroups = [
    {
      name: "בוגרי 2016",
      age: "8 שנים",
      players: 18,
      coach: "דני כהן",
      trainingDays: "ב', ד'",
      trainingTime: "16:00-17:30"
    },
    {
      name: "בוגרי 2014",
      age: "10 שנים", 
      players: 22,
      coach: "מיכאל לוי",
      trainingDays: "א', ג'",
      trainingTime: "16:30-18:00"
    },
    {
      name: "בוגרי 2012",
      age: "12 שנים",
      players: 20,
      coach: "יוסי אברהם",
      trainingDays: "ב', ד', ו'",
      trainingTime: "17:00-18:30"
    },
    {
      name: "בוגרי 2010",
      age: "14 שנים",
      players: 19,
      coach: "רון דוד",
      trainingDays: "א', ג', ה'",
      trainingTime: "17:30-19:00"
    },
    {
      name: "בוגרי 2008",
      age: "16 שנים",
      players: 24,
      coach: "עמיר שמואל",
      trainingDays: "א', ג', ה'",
      trainingTime: "18:00-19:30"
    },
    {
      name: "בוגרי 2006",
      age: "18 שנים",
      players: 21,
      coach: "יעקב ישראל",
      trainingDays: "ב', ד', ו'",
      trainingTime: "18:30-20:00"
    }
  ];

  const achievements = [
    {
      year: "2024",
      title: "אליפות מחוז צפון - בוגרי 2010",
      trophy: "זהב"
    },
    {
      year: "2024",
      title: "גביע המחוז - בוגרי 2012",
      trophy: "כסף"
    },
    {
      year: "2023",
      title: "אליפות האזור - בוגרי 2008",
      trophy: "זהב"
    },
    {
      year: "2023",
      title: "טורניר הקיץ - בוגרי 2014",
      trophy: "ארד"
    }
  ];

  const programs = [
    {
      title: "אקדמיית הכדורגל",
      description: "תכנית מקצועית לפיתוח כישרונות צעירים",
      ages: "8-18",
      features: ["אימונים 3 פעמים בשבוע", "מאמנים מוסמכים", "ליווי רפואי", "טורנירים"]
    },
    {
      title: "כדורגל קהילתי",
      description: "תכנית המיועדת לכל הילדים והילדות בעיר",
      ages: "6-16",
      features: ["אימונים שבועיים", "דגש על הנאה", "עלות סמלית", "אירועים משפחתיים"]
    },
    {
      title: "מחנה קיץ",
      description: "מחנה קיץ בחופשת הקיץ הגדולה",
      ages: "7-15",
      features: ["פעילות יומית", "ארוחת צהריים", "טיולים", "טורנירים פנימיים"]
    }
  ];

  const getTrophyColor = (trophy: string) => {
    switch (trophy) {
      case 'זהב': return 'bg-yellow-500';
      case 'כסף': return 'bg-gray-400';
      case 'ארד': return 'bg-orange-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-team-primary to-team-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">מחלקת הנוער</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            מטפחים את הדור הבא של כוכבי הכדורגל - מגיל 6 עד 18
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Department Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-team-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-team-primary mb-2">124</div>
                <div className="text-sm text-muted-foreground">שחקני נוער</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Trophy className="h-12 w-12 text-team-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-team-primary mb-2">12</div>
                <div className="text-sm text-muted-foreground">תארים השנה</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Star className="h-12 w-12 text-team-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-team-primary mb-2">8</div>
                <div className="text-sm text-muted-foreground">מאמני נוער</div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Calendar className="h-12 w-12 text-team-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-team-primary mb-2">6</div>
                <div className="text-sm text-muted-foreground">שכבות גיל</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Age Groups */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">שכבות הגיל</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ageGroups.map((group, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-right text-team-dark">{group.name}</CardTitle>
                  <Badge variant="outline" className="w-fit self-end">
                    {group.age}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">מאמן</div>
                    <div className="font-medium">{group.coach}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">מספר שחקנים</div>
                    <div className="font-medium">{group.players}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">ימי אימון</div>
                    <div className="font-medium">{group.trainingDays}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">שעות אימון</div>
                    <div className="font-medium">{group.trainingTime}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Programs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">תכניות ההכשרה</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-right text-team-dark">{program.title}</CardTitle>
                  <Badge className="w-fit self-end bg-team-secondary">
                    גילאים {program.ages}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-right text-sm">
                    {program.description}
                  </p>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-right">מה כלול:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="text-right">• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-team-primary hover:bg-team-secondary">
                    הרשמה לתכנית
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">הישגי הנוער</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <Badge 
                      className={`${getTrophyColor(achievement.trophy)} hover:${getTrophyColor(achievement.trophy)}`}
                    >
                      {achievement.trophy}
                    </Badge>
                    <div className="text-right">
                      <div className="font-semibold text-team-dark">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.year}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Registration & Contact */}
        <section className="bg-team-accent/20 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">הצטרפו אלינו</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-right">פרטי הרשמה</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-right">
                  <h4 className="font-medium mb-2">דרישות הרשמה:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="text-right">• תעודת זהות של הילד</li>
                    <li className="text-right">• אישור רפואי לפעילות ספורט</li>
                    <li className="text-right">• תמונה עדכנית</li>
                    <li className="text-right">• מילוי טופס הרשמה</li>
                  </ul>
                </div>
                
                <div className="text-right">
                  <h4 className="font-medium mb-2">עלויות חודשיות:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="text-right">• כדורגל קהילתי: ₪100</li>
                    <li className="text-right">• אקדמיית הכדורגל: ₪200</li>
                    <li className="text-right">• מחנה קיץ: ₪150 לשבוע</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-right">צור קשר</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-right">
                  <h4 className="font-medium mb-2">רכז מחלקת הנוער</h4>
                  <p className="text-muted-foreground">אבי כהן</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-end">
                    <span className="text-muted-foreground ml-2">04-6721235</span>
                    <Phone className="h-4 w-4 text-team-primary" />
                  </div>
                  <div className="flex items-center justify-end">
                    <span className="text-muted-foreground ml-2">youth@ironitiberias.co.il</span>
                    <span className="text-team-primary">@</span>
                  </div>
                  <div className="flex items-center justify-end">
                    <span className="text-muted-foreground ml-2">אצטדיון עירוני טבריה</span>
                    <MapPin className="h-4 w-4 text-team-primary" />
                  </div>
                </div>
                
                <Button className="w-full bg-team-primary hover:bg-team-secondary mt-4">
                  יצירת קשר לפרטים נוספים
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Youth;
