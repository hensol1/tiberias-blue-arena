import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-team-dark">מדיניות פרטיות</h1>
            
            <div className="space-y-6 text-right">
              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">1. מבוא</h2>
                <p className="text-gray-700 leading-relaxed">
                  עירוני טבריה מחויבת להגנה על פרטיותכם. מדיניות פרטיות זו מסבירה 
                  כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלכם בעת השימוש באתר שלנו.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">2. מידע שאנו אוספים</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  אנו עשויים לאסוף את סוגי המידע הבאים:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                  <li>מידע אישי (שם, כתובת דוא"ל, מספר טלפון) בעת יצירת קשר</li>
                  <li>מידע טכני (כתובת IP, סוג דפדפן, מערכת הפעלה)</li>
                  <li>מידע על שימוש באתר (דפים שנצפו, זמן שהייה)</li>
                  <li>קובצי Cookie וטכנולוגיות דומות</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">3. כיצד אנו משתמשים במידע</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  אנו משתמשים במידע שנאסף למטרות הבאות:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                  <li>לספק ולשפר את השירותים שלנו</li>
                  <li>להגיב לבקשות ולשאלות שלכם</li>
                  <li>לשלוח עדכונים וחדשות על המועדון</li>
                  <li>לשפר את חוויית המשתמש באתר</li>
                  <li>לאבטח את האתר ולמנוע שימוש לרעה</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">4. שיתוף מידע</h2>
                <p className="text-gray-700 leading-relaxed">
                  אנו לא מוכרים, משכירים או חולקים את המידע האישי שלכם עם צדדים שלישיים, 
                  אלא אם כן נדרש על פי חוק או עם הסכמתכם המפורשת. אנו עשויים לשתף מידע 
                  עם ספקי שירות מהימנים המסייעים לנו להפעיל את האתר.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">5. אבטחת מידע</h2>
                <p className="text-gray-700 leading-relaxed">
                  אנו נוקטים באמצעי אבטחה מתאימים להגנה על המידע האישי שלכם מפני 
                  גישה בלתי מורשית, שימוש לרעה או חשיפה. עם זאת, אין אבטחה מושלמת באינטרנט.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">6. קובצי Cookie</h2>
                <p className="text-gray-700 leading-relaxed">
                  האתר שלנו משתמש בקובצי Cookie כדי לשפר את חוויית המשתמש. 
                  קובצי Cookie אלה עוזרים לנו לזכור העדפות ולנתח תנועה באתר. 
                  ניתן להשבית קובצי Cookie בהגדרות הדפדפן שלכם.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">7. קישורים לאתרים חיצוניים</h2>
                <p className="text-gray-700 leading-relaxed">
                  האתר שלנו עשוי להכיל קישורים לאתרים חיצוניים. אנו איננו אחראים 
                  למדיניות הפרטיות או לתוכן של אתרים אלה. אנו ממליצים לקרוא את 
                  מדיניות הפרטיות של כל אתר שבו אתם מבקרים.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">8. זכויותיכם</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  יש לכם הזכות:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                  <li>לגשת למידע האישי שיש לנו עליכם</li>
                  <li>לתקן מידע לא מדויק</li>
                  <li>למחוק את המידע האישי שלכם</li>
                  <li>להתנגד לעיבוד המידע שלכם</li>
                  <li>לבקש העברה של המידע שלכם</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">9. שינויים במדיניות</h2>
                <p className="text-gray-700 leading-relaxed">
                  אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. שינויים משמעותיים 
                  יפורסמו באתר עם תאריך העדכון. המשך השימוש באתר לאחר שינויים אלה 
                  מהווה הסכמה למדיניות המעודכנת.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">10. יצירת קשר</h2>
                <p className="text-gray-700 leading-relaxed">
                  לשאלות, בקשות או תלונות לגבי מדיניות פרטיות זו, ניתן ליצור קשר עם 
                  עירוני טבריה בכתובת: office@tiberias-fc.co.il
                </p>
              </div>

              <div className="border-t pt-6 mt-8">
                <p className="text-sm text-gray-600 text-center">
                  תאריך עדכון אחרון: {new Date().toLocaleDateString('he-IL')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 