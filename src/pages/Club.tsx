import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Club = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full">
        <img 
          src="/lovable-uploads/club page banner.png" 
          alt="שחקני עירוני דורות טבריה חוגגים"
          className="w-full h-auto max-h-[400px] object-cover object-top"
        />
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Club Overview */}
        <section className="mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-team-dark">אודות המועדון</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg max-w-4xl mx-auto text-right">
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
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Club;
