# הגדרת Firebase

## משתני סביבה נדרשים

צור קובץ `.env` בתיקיית הפרויקט עם המשתנים הבאים:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## הגדרת GitHub Secrets

לפריסה ל-GitHub Pages, הוסף את המשתנים הבאים כ-Secrets ב-GitHub:

1. לך ל-Settings > Secrets and variables > Actions
2. הוסף את המשתנים הבאים:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`

## איך למצוא את הערכים

1. לך ל-[Firebase Console](https://console.firebase.google.com/)
2. בחר את הפרויקט שלך
3. לך ל-Project Settings > General
4. גלול למטה ל-"Your apps" ובחר את האפליקציה
5. העתק את הערכים מה-config object

## פתרון זמני

אם אתה רוצה לבדוק את האתר בלי Firebase, תוכל להעיר את השימוש ב-Firebase בקוד. 