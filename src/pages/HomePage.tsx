import { useAuthStore } from "../authstore";
import HomeDisplayGamesList from "../components/HomeDisplayGamesList";
import HomeGamesCarousel from "../components/HomeGamesCarousel";
import HomeRecommendationsSection from "../components/HomeRecommendationsSection";
import useFavorites from "../hooks/useFavorites";

const OWNER_EMAIL = "yzhou677@gmail.com";

const HomePage = () => {
  const user = useAuthStore((s) => s.user);
  const {
    data: favorites = [],
    isLoading: favLoading,
    error: favError,
  } = useFavorites();

  const canUseRecommendations =
    !!user && user.email === OWNER_EMAIL && !favLoading && !favError;

  return (
    <>
      <HomeGamesCarousel />
      {canUseRecommendations && favorites.length > 0 && (
        <HomeRecommendationsSection favorites={favorites} />
      )}
      <HomeDisplayGamesList displayMode="releasedThisMonth" />
      <HomeDisplayGamesList displayMode="allTimeTop100" />
    </>
  );
};

export default HomePage;
