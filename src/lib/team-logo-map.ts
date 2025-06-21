// src/lib/team-logo-map.ts

// This file maps Hebrew team names to their corresponding logo filenames in English.
// The filenames should match the files located in `src/assets/team-logos/`.

// Vite feature to import all logos and get their public URLs.
const logos = import.meta.glob<string>('/src/assets/team-logos/*.png', { eager: true, import: 'default' });

const TEAM_LOGO_MAP: Record<string, string> = {
  // Ligat Ha'al Teams
  "בית\"ר ירושלים": "Beitar Jerusalem.png",
  "מ.ס. אשדוד": "FC Ashdod.png",
  "הפועל באר שבע": "Hapoel Beer Sheva.png",
  "הפועל חדרה": "Hapoel Hadera.png",
  "הפועל חיפה": "Hapoel Haifa.png",
  "הפועל ירושלים": "Hapoel Jerusalem.png",
  "הפועל פתח תקווה": "Hapoel Petach Tikva.png",
  "הפועל תל אביב": "Hapoel Tel Aviv.png",
  "בני סכנין": "Ihud Bnei Sakhnin.png",
  "עירוני קרית שמונה": "Ironi Kiryat Shmona.png",
  "מכבי בני ריינה": "Maccabi Bnei Reineh.png",
  "מכבי חיפה": "Maccabi Haifa.png",
  "מכבי נתניה": "Maccabi Netanya.png",
  "מכבי פתח תקווה": "Maccabi Petah Tikva.png",
  "מכבי תל אביב": "Maccabi Tel Aviv.png",

  // Our Team
  "עירוני טבריה": "Ironi Tiberias.png",
};

/**
 * Gets the logo for a given team name.
 * @param teamName The Hebrew name of the team.
 * @returns The path to the team's logo, or a placeholder if not found.
 */
export const getTeamLogo = (teamName: string): string => {
  const filename = TEAM_LOGO_MAP[teamName];
  if (filename) {
    const path = `/src/assets/team-logos/${filename}`;
    // The `logos` object from `import.meta.glob` will have keys like: 
    // '/src/assets/team-logos/Beitar Jerusalem.png'
    // and values like the final public URL: 
    // '/assets/Beitar Jerusalem.1a2b3c.png'
    return logos[path] || '/placeholder.svg';
  }
  // Return a path to a generic placeholder logo if no specific logo is found.
  return '/placeholder.svg';
}; 