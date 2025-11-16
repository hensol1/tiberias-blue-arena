import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { getTeamLogo } from "@/lib/team-logo-map";
import { getCompetitionLogo } from "@/lib/competition-logo-map";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NextFixturesProps {
  nextGame: any;
  isLoadingGame: boolean;
}

const NextFixtures = ({ nextGame, isLoadingGame }: NextFixturesProps) => {
  const [selectedTab, setSelectedTab] = useState<'senior' | 'youth'>('senior');

  const tabs = [
    { id: 'senior' as const, label: 'בוגרים' },
    { id: 'youth' as const, label: 'נוער' }
  ];

  if (isLoadingGame) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">טוען משחקים...</p>
      </div>
    );
  }

  if (!nextGame) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">אין משחקים קרובים</p>
      </div>
    );
  }

  const isHomeGame = nextGame.venue?.includes("גרין") || nextGame.venue?.includes("הגליל") || nextGame.venue?.includes("טבריה");
  const homeTeam = isHomeGame ? "עירוני טבריה" : nextGame.opponent;
  const awayTeam = isHomeGame ? nextGame.opponent : "עירוני טבריה";
  const gameDate = new Date(nextGame.date);
  
  // Format date like "Sat 16 Nov"
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weekday = weekdays[gameDate.getDay()];
  const day = gameDate.getDate();
  const month = months[gameDate.getMonth()];
  const formattedDate = `${weekday} ${day} ${month}`;
  
  const formattedTime = gameDate.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-3">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`flex-1 py-1.5 px-2 text-xs font-medium transition-colors ${
              selectedTab === tab.id
                ? 'border-b-2 border-team-primary text-team-primary font-semibold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Next Fixture Card */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <div className="p-3 border-b border-gray-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-700">NEXT FIXTURE</span>
            <Link to="/games" className="text-xs text-team-primary hover:underline flex items-center gap-1">
              All fixtures
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          
          <div className="p-4">
            <div className="text-xs font-semibold text-gray-600 mb-3">
              {formattedDate}
            </div>

            {/* Teams */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col items-center flex-1">
                <img 
                  src={getTeamLogo(homeTeam)} 
                  alt={homeTeam} 
                  className="w-12 h-12 object-contain mb-1"
                />
                <span className="text-xs font-semibold text-center leading-tight">{homeTeam}</span>
              </div>
              
              <span className="text-lg font-bold text-gray-400 mx-2">VS</span>
              
              <div className="flex flex-col items-center flex-1">
                <img 
                  src={getTeamLogo(awayTeam)} 
                  alt={awayTeam} 
                  className="w-12 h-12 object-contain mb-1"
                />
                <span className="text-xs font-semibold text-center leading-tight">{awayTeam}</span>
              </div>
            </div>

            {/* Game Info */}
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <Clock className="h-3 w-3" />
                <span>{formattedTime}</span>
              </div>
              {nextGame.venue && (
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{nextGame.venue}</span>
                </div>
              )}
              {nextGame.competition && (
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <img src={getCompetitionLogo(nextGame.competition)} alt={nextGame.competition} className="h-3 w-3 object-contain" />
                  <span>{nextGame.competition}{nextGame.stage && ` - ${nextGame.stage}`}</span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-1.5">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full border-gray-300 hover:bg-gray-50 text-xs py-1.5 h-auto"
                asChild
              >
                <Link to={`/games`}>
                  PREVIEW
                </Link>
              </Button>
              {nextGame.ticketLink ? (
                <Button 
                  size="sm"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-xs py-1.5 h-auto"
                  asChild
                >
                  <a href={nextGame.ticketLink} target="_blank" rel="noopener noreferrer">
                    BUY TICKETS
                  </a>
                </Button>
              ) : (
                <Button 
                  size="sm"
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold text-xs py-1.5 h-auto cursor-not-allowed"
                  disabled
                >
                  כרטיסים בקרוב
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NextFixtures;

