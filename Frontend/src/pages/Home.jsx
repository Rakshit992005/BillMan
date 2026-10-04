import Hero from "../components/HomeComponents/Hero";
import Features from "../components/HomeComponents/Features";
import CTA from "../components/HomeComponents/CTA";
import Footer from "../components/HomeComponents/Footer";

const Home = () => {
  return (
    <div className="flex flex-col bg-white">
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
