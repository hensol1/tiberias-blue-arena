import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-team-dark">תנאי שימוש</h1>
            
            <div className="space-y-6 text-right">
              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">1. קבלת התנאים</h2>
                <p className="text-gray-700 leading-relaxed">
                  השימוש באתר זה ובשירותים הניתנים דרכו כפוף לתנאי שימוש אלה. 
                  הגישה לאתר או השימוש בו מהווה הסכמה מצדכם לתנאים אלה.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">2. שימוש מותר</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  מותר לכם להשתמש באתר למטרות חוקיות בלבד, בהתאם לתנאי שימוש אלה.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                  <li>צפייה במידע על המועדון והשחקנים</li>
                  <li>התעדכנות בחדשות ועדכונים</li>
                  <li>צפייה בתמונות וסרטונים</li>
                  <li>יצירת קשר עם המועדון</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">3. שימוש אסור</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  אסור להשתמש באתר למטרות הבאות:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                  <li>שימוש בלתי מורשה או הפרת זכויות יוצרים</li>
                  <li>הפצת תוכן פוגעני או בלתי חוקי</li>
                  <li>ניסיון לפגוע באבטחה או יציבות האתר</li>
                  <li>שימוש בתוכנה זדונית או ניסיון לחדור למערכות</li>
                  <li>שימוש מסחרי ללא אישור מפורש</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">4. תוכן האתר</h2>
                <p className="text-gray-700 leading-relaxed">
                  כל התוכן באתר, כולל טקסטים, תמונות, סרטונים ולוגואים, 
                  מוגן בזכויות יוצרים ומהווה קניין של עירוני טבריה או שותפיה. 
                  אסור להעתיק, להפיץ או להשתמש בתוכן ללא אישור מפורש.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">5. אחריות</h2>
                <p className="text-gray-700 leading-relaxed">
                  עירוני טבריה אינה אחראית לכל נזק ישיר או עקיף שייגרם כתוצאה 
                  מהשימוש באתר או מהתוכן המוצג בו. השימוש באתר הינו על אחריותכם הבלעדית.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">6. שינויים בתנאים</h2>
                <p className="text-gray-700 leading-relaxed">
                  עירוני טבריה שומרת לעצמה את הזכות לשנות את תנאי השימוש בכל עת. 
                  שינויים אלה ייכנסו לתוקף עם פרסומם באתר.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">7. דין שולט</h2>
                <p className="text-gray-700 leading-relaxed">
                  תנאי שימוש אלה כפופים לדין הישראלי. כל מחלוקת תיפתר בפני 
                  בתי המשפט המוסמכים בישראל.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-team-dark">8. יצירת קשר</h2>
                <p className="text-gray-700 leading-relaxed">
                  לשאלות או הבהרות לגבי תנאי שימוש אלה, ניתן ליצור קשר עם 
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

export default TermsOfService; 