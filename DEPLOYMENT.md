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

## פתרון בעיות

### אם האתר לא נטען:
1. וודא שה-GitHub Actions workflow רץ בהצלחה
2. בדוק שה-base path מוגדר נכון ב-`vite.config.ts`
3. וודא שמשתמשים ב-`HashRouter` במקום `BrowserRouter`

### אם הניווט לא עובד:
- האתר משתמש ב-HashRouter כדי לעבוד עם GitHub Pages
- הכתובות יהיו בפורמט: `https://username.github.io/repo-name/#/path`

## כתובת האתר

לאחר הפריסה, האתר יהיה זמין בכתובת:
`https://hensol1.github.io/tiberias-blue-arena/` 