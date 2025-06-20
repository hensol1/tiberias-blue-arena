import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsFeed from "@/components/NewsFeed";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import sponsorLogo1 from "@/assets/lovable-uploads/ae653618-f246-48c4-84fb-31e6114b0b25.png";
import sponsorLogo2 from "@/assets/lovable-uploads/3eca3ff4-bae0-4b66-9c31-46793b15f049.png";

const sponsorLogos = [
  "https://www.likud.org.il/wp-content/uploads/2021/09/likud-logo.png",
  "https://www.winner.co.il/content/images/winner-logo.svg",
  "https://upload.wikimedia.org/wikipedia/he/thumb/3/36/Hapoel_tveria.png/180px-Hapoel_tveria.png",
  sponsorLogo1,
  sponsorLogo2
];

const Index = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { toast } = useToast();
  
  const bannerImages = [
    sponsorLogo1,
    sponsorLogo2
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      {/* Hero Section - Image Carousel */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`עירוני טבריה ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}
        
        {/* Optional: Add dots indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 space-x-reverse">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentImage ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Main Content - News Feed */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <NewsFeed />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
