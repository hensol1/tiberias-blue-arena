import Header from "@/components/Header";
import Footer from "@/components/Footer";
import burgerSaloonLogo from "@/assets/sponsors/burger-saloon.jpg";
import dorotLogo from "@/assets/sponsors/dorot.png";
import goOutLogo from "@/assets/sponsors/go-out.png";
import nofGinosarLogo from "@/assets/sponsors/nof-ginosar.png";
import leagueManagerLogo from "@/assets/sponsors/league-manager.png";

const Youth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Coming Soon Section */}
      <section className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-team-dark mb-4">Coming Soon</h1>
          <p className="text-xl text-muted-foreground">מחלקת הנוער - בקרוב</p>
        </div>
      </section>

      {/* Sponsors Section - Bottom of the Page */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-center">
            <div className="flex justify-center items-center">
              <img src={burgerSaloonLogo} alt="Burger Saloon" className="h-24 object-contain grayscale hover:grayscale-0 transition duration-300" />
            </div>  
            <div className="flex justify-center items-center">
              <img src={dorotLogo} alt="Dorot Group" className="h-29 object-contain grayscale hover:grayscale-0 transition duration-300" />
            </div>
            <div className="flex justify-center items-center">
              <img src={goOutLogo} alt="Go-Out" className="h-20 object-contain grayscale hover:grayscale-0 transition duration-300" />
            </div>
            <div className="flex justify-center items-center">
              <img src={nofGinosarLogo} alt="Nof Ginosar" className="h-29 object-contain grayscale hover:grayscale-0 transition duration-300" />
            </div>
            <div className="flex justify-center items-center">
              <img src={leagueManagerLogo} alt="מנהלת הליגות לכדורגל" className="h-20 object-contain grayscale hover:grayscale-0 transition duration-300" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Youth;
