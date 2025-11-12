import HomeDisplayGamesList from "../components/HomeDisplayGamesList";
import HomeGamesCarousel from "../components/HomeGamesCarousel";

const HomePage = () => {
  return (
    <>
      <HomeGamesCarousel />
      <HomeDisplayGamesList displayMode="releasedThisMonth" />
      <HomeDisplayGamesList displayMode="allTimeTop100" />
    </>
  );
};

export default HomePage;
