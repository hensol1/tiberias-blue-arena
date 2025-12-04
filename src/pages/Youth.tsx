import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import academyImage from "@/assets/youth/academy.jpeg";
import newSponsors from "@/assets/sponsors/newsponsers.png";

const Youth = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Sponsors Section - Under Header */}
      <section className="py-6 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <img src={newSponsors} alt="Sponsors" className="w-full max-w-6xl object-contain" />
          </div>
        </div>
      </section>
      
      {/* Academy Photo Section */}
      <section className="flex items-center justify-center min-h-[60vh] py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <img 
              src={academyImage} 
              alt="Ironi Dorot Tiberias F.C. Academy" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Sponsors Section - Bottom of the Page */}
      <section className="py-10 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <img src={newSponsors} alt="Sponsors" className="w-full max-w-6xl object-contain" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Youth;
