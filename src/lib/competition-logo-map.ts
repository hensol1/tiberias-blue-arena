// src/lib/competition-logo-map.ts

import ligaLogo from '../assets/competition/LIGA.png';
import gaviaLogo from '../assets/competition/GAVIA.png';
import totoLogo from '../assets/competition/TOTO.png';

// A generic placeholder can be used if needed, but for a fixed list,
// we can assume a logo will always exist.
const placeholder = '/placeholder.svg'; 

const COMPETITION_LOGO_MAP: Record<string, string> = {
  "ליגה": ligaLogo,
  "גביע": gaviaLogo,
  "גביע הטוטו": totoLogo,
};

/**
 * Gets the logo for a given competition name.
 * @param competitionName The name of the competition.
 * @returns The path to the competition's logo.
 */
export const getCompetitionLogo = (competitionName: string): string => {
  return COMPETITION_LOGO_MAP[competitionName] || placeholder;
}; 