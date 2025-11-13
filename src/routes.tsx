import { RouteObject, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import GameDetailPage from "./pages/GameDetailPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import GamesListPage from "./pages/GamesListPage";

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
        element: <GamesListPage />
      },
      {
        path: "games/:slug",
        element: <GameDetailPage />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);

export default router;
