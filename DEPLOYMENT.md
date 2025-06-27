# הוראות פריסה ל-GitHub Pages

## הגדרת GitHub Pages

1. **הפעל GitHub Pages**:
   - לך ל-Settings > Pages
   - בחר ב-Source: "GitHub Actions"

2. **הגדרת Branch**:
   - וודא שהקוד נמצא ב-branch `main`

## פריסה אוטומטית

הפרויקט מוגדר עם GitHub Actions שיבנה ויפרס את האתר אוטומטית בכל push ל-main.

### פריסה ידנית

אם אתה רוצה לפרוס ידנית:

```bash
# התקן תלויות
npm install

# בנה את הפרויקט
npm run build

# פרס ל-GitHub Pages
npm run deploy
```

## הגדרת דומיין מותאם אישית

כאשר משתמשים בדומיין מותאם אישית (כמו idtiberias.com):

1. **הגדר את הדומיין ב-GitHub Pages**:
   - לך ל-Settings > Pages
   - הזן את שם הדומיין המותאם אישית
   - וודא שה-CNAME מוגדר נכון

2. **עדכן את ה-base path ב-vite.config.ts**:
   ```typescript
   export default defineConfig({
     base: "/", // במקום "/tiberias-blue-arena/"
     // ...
   });
   ```

3. **בנה ופרס מחדש**:
   ```bash
   npm run deploy
   ```

## פתרון בעיות

### אם האתר לא נטען:
1. וודא שה-GitHub Actions workflow רץ בהצלחה
2. בדוק שה-base path מוגדר נכון ב-`vite.config.ts`
   - עבור GitHub Pages רגיל: `base: "/tiberias-blue-arena/"`
   - עבור דומיין מותאם אישית: `base: "/"`
3. וודא שמשתמשים ב-`HashRouter` במקום `BrowserRouter`

### אם הניווט לא עובד:
- האתר משתמש ב-HashRouter כדי לעבוד עם GitHub Pages
- הכתובות יהיו בפורמט: `https://username.github.io/repo-name/#/path`

### אם הקבצים (CSS/JS) לא נטענים (404):
- בדוק שה-base path מוגדר נכון
- וודא שהפריסה הושלמה בהצלחה
- נקה את ה-cache של הדפדפן

## כתובות האתר

לאחר הפריסה, האתר יהיה זמין בכתובות:
- GitHub Pages: `https://hensol1.github.io/tiberias-blue-arena/`
- דומיין מותאם אישית: `https://idtiberias.com` 