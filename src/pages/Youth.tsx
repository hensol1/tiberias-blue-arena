import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

      <Footer />
    </div>
  );
};

export default Youth;
