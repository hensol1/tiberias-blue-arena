// src/lib/competition-logo-map.ts

import LigaLogo from '../assets/competition/LIGA.png';
import TotoLogo from '../assets/competition/TOTO.png';
import GaviaLogo from '../assets/competition/GAVIA.png';

// A generic placeholder can be used if needed, but for a fixed list,
// we can assume a logo will always exist.
const placeholder = '/placeholder.svg'; 

type CompetitionLogoMap = {
    [key: string]: string;
};

const competitionLogoMap: CompetitionLogoMap = {
    "ליגת העל": LigaLogo,
    "גביע המדינה": GaviaLogo,
    "גביע הטוטו": TotoLogo,
};

/**
 * Gets the logo for a given competition name.
 * @param competitionName The name of the competition.
 * @returns The path to the competition's logo.
 */
export const getCompetitionLogo = (competitionName: string): string => {
  return competitionLogoMap[competitionName] || placeholder;
};

export const COMPETITION_NAMES = Object.keys(competitionLogoMap); 