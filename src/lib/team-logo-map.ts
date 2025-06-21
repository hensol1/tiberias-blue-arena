// src/lib/team-logo-map.ts

// This file maps Hebrew team names to their corresponding logo filenames in English.
// The filenames should match the files located in `src/assets/team-logos/`.
// We are assuming the file extension is .png, but the function will handle different extensions.

const TEAM_LOGO_MAP: Record<string, string> = {
  // Ligat Ha'al Teams
  "בית\"ר ירושלים": "Beitar Jerusalem",
  "מ.ס. אשדוד": "FC Ashdod",
  "הפועל באר שבע": "Hapoel Beer Sheva",
  "הפועל חדרה": "Hapoel Hadera",
  "הפועל חיפה": "Hapoel Haifa",
  "הפועל ירושלים": "Hapoel Jerusalem",
  "הפועל פתח תקווה": "Hapoel Petach Tikva",
  "הפועל תל אביב": "Hapoel Tel Aviv",
  "בני סכנין": "Ihud Bnei Sakhnin",
  "עירוני קרית שמונה": "Ironi Kiryat Shmona",
  "מכבי בני ריינה": "Maccabi Bnei Reineh",
  "מכבי חיפה": "Maccabi Haifa",
  "מכבי נתניה": "Maccabi Netanya",
  "מכבי פתח תקווה": "Maccabi Petah Tikva",
  "מכבי תל אביב": "Maccabi Tel Aviv",

  // Our Team
  "עירוני טבריה": "Ironi Tiberias",
};

/**
 * Gets the logo for a given team name.
 * @param teamName The Hebrew name of the team.
 * @returns The path to the team's logo, or a placeholder if not found.
 */
export const getTeamLogo = (teamName: string): string => {
  const englishName = TEAM_LOGO_MAP[teamName];
  if (englishName) {
    // Vite can handle dynamic imports from the assets directory.
    // We assume the logo files are PNGs, but this could be adapted.
    return `/src/assets/team-logos/${englishName}.png`;
  }
  // Return a path to a generic placeholder logo if no specific logo is found.
  return '/placeholder.svg';
}; 