import { RouteObject, createBrowserRouter } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import ErrorPage from "./pages/ErrorPage";
import FavoritesPage from "./pages/FavoritesPage";
import GameDetailPage from "./pages/GameDetailPage";
import GamesListPage from "./pages/GamesListPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "games",
        element: <GamesListPage />,
      },
      {
        path: "games/:slug",
        element: <GameDetailPage />,
      },
      {
        path: "/favorites",
        element: (
          <RequireAuth>
            <FavoritesPage />
          </RequireAuth>
        ),
      },
    ],
  },
];
const router = createBrowserRouter(routes);

export default router;
