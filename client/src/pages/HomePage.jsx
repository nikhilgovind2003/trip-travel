import HeroCarousol from "./../components/Home/HeroCarousol";
import HeroSearch from "./../components/Home/HeroSearch";
import ExploreMore from "./../components/Home/ExploreMore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroCarousol />
      <HeroSearch />
      <div className=" p-2 lg:px-12 lg:py-4 bg-gray-200">

      <ExploreMore nearestPlacee={false} />
      <Footer />
      </div>
    </div>
  );
};

export default HomePage;
