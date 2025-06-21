// src/lib/team-logo-map.ts

// Import all logos individually. This is the most reliable way in Vite.
import beitarJerusalem from '../assets/team-logos/Beitar Jerusalem.webp';
import fcAshdod from '../assets/team-logos/FC Ashdod.webp';
import hapoelBeerSheva from '../assets/team-logos/Hapoel Beer Sheva.webp';
import hapoelHadera from '../assets/team-logos/Hapoel Hadera.webp';
import hapoelHaifa from '../assets/team-logos/Hapoel Haifa.webp';
import hapoelJerusalem from '../assets/team-logos/Hapoel Jerusalem.webp';
import hapoelPetachTikva from '../assets/team-logos/Hapoel Petach Tikva.png';
import hapoelTelAviv from '../assets/team-logos/Hapoel Tel Aviv.png';
import ihudBneiSakhnin from '../assets/team-logos/Ihud Bnei Sakhnin.webp';
import ironiKiryatShmona from '../assets/team-logos/Ironi Kiryat Shmona.webp';
import maccabiBneiReineh from '../assets/team-logos/Maccabi Bnei Reineh.webp';
import maccabiHaifa from '../assets/team-logos/Maccabi Haifa.webp';
import maccabiNetanya from '../assets/team-logos/Maccabi Netanya.webp';
import maccabiPetahTikva from '../assets/team-logos/Maccabi Petah Tikva.webp';
import maccabiTelAviv from '../assets/team-logos/Maccabi Tel Aviv.webp';
import ironiTiberias from '../assets/team-logos/Ironi Tiberias.webp';
import placeholder from '/placeholder.svg';

type TeamLogoMap = {
    [key: string]: string;
};

const teamLogoMap: TeamLogoMap = {
    "עירוני טבריה": ironiTiberias,
    "מכבי חיפה": maccabiHaifa,
    "מכבי תל אביב": maccabiTelAviv,
    "הפועל באר שבע": hapoelBeerSheva,
    "הפועל חיפה": hapoelHaifa,
    "מכבי בני ריינה": maccabiBneiReineh,
    "הפועל ירושלים": hapoelJerusalem,
    "מכבי פתח תקוה": maccabiPetahTikva,
    "הפועל חדרה": hapoelHadera,
    "הפועל תל אביב": hapoelTelAviv,
    "מ.ס. אשדוד": fcAshdod,
    "בית\"ר ירושלים": beitarJerusalem,
    "מכבי נתניה": maccabiNetanya,
    "הפועל פתח תקוה": hapoelPetachTikva,
    "איחוד בני סכנין": ihudBneiSakhnin,
    "עירוני קרית שמונה": ironiKiryatShmona,
};

/**
 * Gets the logo for a given team name.
 * @param teamName The Hebrew name of the team.
 * @returns The path to the team's logo, or a placeholder if not found.
 */
export const getTeamLogo = (teamName: string): string => {
  return teamLogoMap[teamName] || placeholder;
};

export const TEAM_NAMES = Object.keys(teamLogoMap); 