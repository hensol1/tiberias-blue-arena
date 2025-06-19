
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Club = () => {
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
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
                  מועדון הכדורגל עירוני 'דורות' טבריה מייצג את העיר טבריה ומשחק כיום בליגת העל – לראשונה בתולדותיו. המועדון נושא עבר עשיר וייחודי, הכולל עשרות שנות פעילות תחת השם בית"ר טבריה, עד לאיחוד בשנת 2004 עם הפועל גליל תחתון ושינוי שמו לעירוני טבריה.
                </p>
                <p>
                  לאורך השנים צמחה הקבוצה מליגות נמוכות והפכה לאחד הסיפורים המרגשים בכדורגל הישראלי. לאחר עליות, ירידות ואתגרים רבים – המהפך האמיתי התרחש בשנת 2021, כשניהול המועדון עבר לידי קבוצת דורות, סוכנות ביטוח מובילה, בראשות אריה קלמנזון ומיקי ביתן. מאז, הפך המועדון למקצועי ומסודר יותר, והשיג רצף הישגים יוצאי דופן.
                </p>
                <p>
                  במרץ 2022 העפילה הקבוצה לליגה הלאומית, ובעונת 2023/2024 רשמה את ההישג הגדול בתולדותיה – העפלה לליגת העל, לאחר עונה דרמטית שבסיומה הקדימה את בני יהודה בזכות הפרש שערים. בנוסף, זכתה הקבוצה בגביע הטוטו והגיעה לשמינית גמר גביע המדינה.
                </p>
                <p>
                  בעונת הבכורה בליגת העל (2024/2025), הבטיחה את הישארותה בליגה במשחק האחרון של העונה מול מכבי פתח תקווה.
                </p>
                
                <h3 className="text-2xl font-bold text-team-dark mt-8 mb-4">בית מקצועי וגאווה עירונית</h3>
                <p>
                  המועדון חרט על דגלו ערכים של מצוינות, קידום שחקנים צעירים, מחויבות לקהילה ופיתוח הכדורגל בצפון הארץ. עירוני טבריה מהווה סמל לגאווה מקומית עבור תושבי העיר והאזור כולו.
                </p>
                
                <h3 className="text-2xl font-bold text-team-dark mt-8 mb-4">מתקני הבית</h3>
                <p>
                  המועדון ממתין לסיום בניית האצטדיון החדש בטבריה, שיכלול כ-7,500 מקומות ישיבה. עד אז מארחת הקבוצה את משחקיה הביתיים באצטדיון גרין שבנוף הגליל.
                </p>
              </div>
            </div>
            <div>
              <Card className="overflow-hidden">
                <img 
                  src="/lovable-uploads/e2feb1ed-ae5f-41ee-a928-db691156bdce.png" 
                  alt="שחקני עירוני דורות טבריה"
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-right mb-2">שחקני עירוני דורות טבריה</h3>
                  <p className="text-sm text-muted-foreground text-right">
                    הקבוצה בחגיגת ניצחון במשחק חשוב
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Club;
