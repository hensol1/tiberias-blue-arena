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

## הגדרת Firebase Services

### התקנת Firebase CLI

1. התקן Firebase CLI:
```bash
npm install -g firebase-tools
```

2. התחבר ל-Firebase:
```bash
firebase login
```

3. אתחל את הפרויקט:
```bash
firebase init
```

בחר את השירותים הבאים:
- Firestore Database
- Storage
- Hosting (אופציונלי)

### הגדרת Firestore Security Rules

1. העתק את הקובץ `firestore.rules` לתיקיית הפרויקט
2. פרוס את הכללים:
```bash
firebase deploy --only firestore:rules
```

### הגדרת Storage Security Rules

1. העתק את הקובץ `storage.rules` לתיקיית הפרויקט
2. פרוס את הכללים:
```bash
firebase deploy --only storage
```

### הגדרת CORS Rules (חשוב!)

**זה השלב החשוב ביותר לפתרון שגיאות CORS:**

1. העתק את הקובץ `cors.json` לתיקיית הפרויקט
2. התקן את gsutil (Google Cloud Storage utility):
   ```bash
   # Windows (PowerShell)
   curl https://sdk.cloud.google.com | bash
   
   # macOS/Linux
   curl https://sdk.cloud.google.com | bash
   ```

3. הגדר את CORS rules:
   ```bash
   gsutil cors set cors.json gs://YOUR_STORAGE_BUCKET_NAME
   ```
   
   החלף `YOUR_STORAGE_BUCKET_NAME` בשם ה-bucket שלך (למשל: `ironi-dorot-tiberias.appspot.com`)

### או דרך Firebase Console

#### Firestore Rules
1. לך ל-[Firebase Console](https://console.firebase.google.com/)
2. בחר את הפרויקט שלך
3. לך ל-Firestore Database > Rules
4. העתק את התוכן מקובץ `firestore.rules`
5. לחץ על "Publish"

#### Storage Rules
1. לך ל-[Firebase Console](https://console.firebase.google.com/)
2. בחר את הפרויקט שלך
3. לך ל-Storage > Rules
4. העתק את התוכן מקובץ `storage.rules`
5. לחץ על "Publish"

#### CORS Rules (דרך Google Cloud Console)
1. לך ל-[Google Cloud Console](https://console.cloud.google.com/)
2. בחר את הפרויקט שלך
3. לך ל-Cloud Storage > Browser
4. בחר את ה-bucket שלך
5. לך ל-Settings > CORS
6. לחץ על "Edit CORS configuration"
7. העתק את התוכן מקובץ `cors.json`
8. לחץ על "Save"

## הגדרת Authentication

1. לך ל-[Firebase Console](https://console.firebase.google.com/)
2. בחר את הפרויקט שלך
3. לך ל-Authentication > Sign-in method
4. הפעל Email/Password
5. הוסף משתמשים:
   - admin@tiberias.com (מנהל)
   - editor@tiberias.com (עורך)

## הגדרת Storage

1. לך ל-[Firebase Console](https://console.firebase.google.com/)
2. בחר את הפרויקט שלך
3. לך ל-Storage
4. לחץ על "Get started"
5. בחר את מיקום השרת הקרוב אליך
6. בחר "Start in test mode" (אפשר לשנות מאוחר יותר)

## פתרון בעיות CORS

אם אתה עדיין נתקל בשגיאות CORS:

### 1. בדוק את שם ה-Domain
וודא שה-domain שלך מופיע ב-`cors.json`:
```json
"origin": [
  "https://idtiberias.com",
  "https://www.idtiberias.com"
]
```

### 2. בדוק את שם ה-Bucket
וודא שאתה משתמש בשם הנכון של ה-bucket:
```bash
gsutil cors set cors.json gs://ironi-dorot-tiberias.appspot.com
```

### 3. בדוק את Storage Rules
וודא שה-Storage Rules מאפשרים כתיבה:
```
match /games/{allPaths=**} {
  allow read: if true;
  allow write: if isEditorOrAdmin();
}
```

### 4. בדוק את Authentication
וודא שהמשתמש מחובר ובעל הרשאות מתאימות.

## תכונות חדשות - גלריית תמונות למשחקים

המערכת כוללת כעת תמיכה בגלריית תמונות למשחקים:

### תכונות:
- העלאת תמונות מרובות לכל משחק
- תצוגת גלריה עם תמונות ממוזערות
- Lightbox לצפייה בתמונות בגודל מלא
- ניווט בין תמונות עם מקשים או כפתורים
- מחיקת תמונות (למשתמשים מורשים בלבד)

### הרשאות:
- רק עורכים ומנהלים יכולים להעלות תמונות
- כולם יכולים לצפות בתמונות
- רק מנהלים יכולים למחוק תמונות

### מגבלות:
- גודל קובץ מקסימלי: 5MB
- סוגי קבצים נתמכים: תמונות בלבד
- מיקום אחסון: `/games/` ב-Firebase Storage 