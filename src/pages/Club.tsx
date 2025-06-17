
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Users, MapPin } from "lucide-react";

const Club = () => {
  const achievements = [
    { year: "2019", title: "אליפות ליגה ב'", type: "זהב" },
    { year: "2017", title: "גביע המדינה - חצי גמר", type: "כסף" },
    { year: "2015", title: "אליפות ליגה ג'", type: "זהב" },
    { year: "2013", title: "גביע מחוז צפון", type: "זהב" },
  ];

  const milestones = [
    { year: "1967", event: "הקמת המועדון" },
    { year: "1975", event: "עלייה ראשונה לליגה הארצית" },
    { year: "1988", event: "הקמת מחלקת הנוער" },
    { year: "2001", event: "בניית אצטדיון חדש" },
    { year: "2015", event: "עלייה לליגה ב'" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-team-primary to-team-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">המועדון</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            מסורת של למעלה מ-50 שנה, גאווה עירונית ומחויבות לקהילה
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Club Overview */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-right">
              <h2 className="text-3xl font-bold mb-6 text-team-dark">אודות המועדון</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  מועדון כדורגל עירוני טבריה נוסד בשנת 1967 על ידי קבוצת תושבים מקומיים שרצו להקים מועדון כדורגל 
                  שיייצג את העיר טבריה בכבוד ובגאווה. מאז הקמתו, המועדון הפך לסמל של הקהילה המקומית.
                </p>
                <p>
                  המועדון פועל תחת הערכים של משחק הוגן, עבודת צוות, מחויבות לקהילה ופיתוח כישרונות צעירים.
                  לאורך השנים, עירוני טבריה טיפח דור אחר דור של שחקנים מוכשרים שייצגו את המועדון ברמות שונות.
                </p>
                <p>
                  היום, המועדון פועל במספר ליגות וכולל מחלקת נוער מפותחת שמטפחת את הדור הבא של כוכבי הכדורגל.
                  המטרה שלנו היא להמשיך לייצג את טבריה בכבוד ולהביא גאווה לעיר ולתושביה.
                </p>
              </div>
            </div>
            <div>
              <Card className="overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop" 
                  alt="אצטדיון עירוני טבריה"
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-right mb-2">אצטדיון עירוני טבריה</h3>
                  <p className="text-sm text-muted-foreground text-right">
                    הבית של המועדון, המארח את כל המשחקים הביתיים ואימוני הקבוצה
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Club Info Cards */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 text-team-primary mx-auto mb-2" />
                <CardTitle className="text-right">מיקום</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-right">
                  רחוב הספורט 1<br />
                  טבריה, ישראל<br />
                  14100
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-team-primary mx-auto mb-2" />
                <CardTitle className="text-right">שנת הקמה</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-team-primary mb-2">1967</div>
                <p className="text-muted-foreground text-right">למעלה מ-57 שנות פעילות</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-team-primary mx-auto mb-2" />
                <CardTitle className="text-right">חברי המועדון</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-team-primary mb-2">500+</div>
                <p className="text-muted-foreground text-right">חברים פעילים במועדון</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">הישגי המועדון</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={achievement.type === 'זהב' ? 'default' : 'secondary'}
                      className={achievement.type === 'זהב' ? 'bg-yellow-500' : 'bg-gray-400'}
                    >
                      {achievement.type}
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

        {/* Timeline */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-right text-team-dark">אבני דרך במועדון</h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <div className="font-semibold text-team-dark">{milestone.event}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-team-primary rounded-full flex items-center justify-center text-white font-bold">
                        {milestone.year.slice(-2)}
                      </div>
                      <div className="mr-4 text-lg font-semibold text-team-primary">
                        {milestone.year}
                      </div>
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

export default Club;
