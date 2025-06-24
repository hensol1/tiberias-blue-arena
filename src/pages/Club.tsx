import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import clubBanner from "@/assets/lovable-uploads/club page banner.png";
import burgerSaloonLogo from "@/assets/sponsors/burger-saloon.jpg";
import dorotLogo from "@/assets/sponsors/dorot.png";
import goOutLogo from "@/assets/sponsors/go-out.png";
import nofGinosarLogo from "@/assets/sponsors/nof-ginosar.png";
import leagueManagerLogo from "@/assets/sponsors/league-manager.png";


const Club = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full">
        <div className="relative h-64 md:h-96">
          <img
            src={clubBanner}
            alt="אצטדיון טבריה"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          </div>
        </div>
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
      {/* Sponsors Section - Bottom of the Page */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-5 items-center">
            <div className="flex justify-center items-center py-2">
              <img src={burgerSaloonLogo} alt="Burger Saloon" className="h-20 object-contain grayscale hover:grayscale-0 transition duration-300" />
            </div>
            <div className="flex justify-center items-center py-2">
              <img src={dorotLogo} alt="Dorot Group" className="h-20 md:h-28 object-contain grayscale hover:grayscale-0 transition duration-300" />
            </div>
            <div className="flex justify-center items-center py-2">
              <img src={goOutLogo} alt="Go-Out" className="h-20 md:h-20 object-contain grayscale hover:grayscale-0 transition duration-300" />
            </div>
            <div className="flex justify-center items-center py-2">
              <img src={nofGinosarLogo} alt="Nof Ginosar" className="h-20 md:h-28 object-contain grayscale hover:grayscale-0 transition duration-300" />
            </div>
            <div className="flex justify-center items-center py-2">
              <img src={leagueManagerLogo} alt="מנהלת הליגות לכדורגל" className="h-20 object-contain grayscale hover:grayscale-0 transition duration-300" />
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Club;
