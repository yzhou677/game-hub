import { useNavigate } from "react-router-dom";
import useGameQueryStore from "../store";
import { endOfWeek, startOfWeek, ymd } from "../utils/datehelpers";

const useGameActions = () => {
  const setPreset = useGameQueryStore((s) => s.setPreset);

  const now = new Date();
  const lastYear = now.getFullYear() - 1;

  const navigate = useNavigate();

  return {
    /** This Month */
    thisMonth: () => {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      setPreset({
        dates: `${ymd(start)},${ymd(end)}`,
        activeKey: "releasedThisMonth",
      });

      navigate("/games");
    },

    /** This Week */
    thisWeek: () => {
      const s = startOfWeek(now);
      const e = endOfWeek(now);

      setPreset({
        dates: `${ymd(s)},${ymd(e)}`,
        activeKey: "releasedThisWeek",
      });

      navigate("/games");
    },

    /** Best of the Year */
    bestOfYear: () => {
      const y = now.getFullYear();

      setPreset({
        dates: `${y}-01-01,${y}-12-31`,
        sortOrder: "-rating,-ratings_count",
        activeKey: "bestOfYear",
      });

      navigate("/games");
    },

    /** Best of Last Year */
    popularLastYear: () => {
      setPreset({
        dates: `${lastYear}-01-01,${lastYear}-12-31`,
        sortOrder: "-rating,-ratings_count",
        activeKey: "popularLastYear",
      });

      navigate("/games");
    },

    /** All Time 100 */
    allTimeTop100: () => {
      setPreset({
        sortOrder: "-rating,-ratings_count",
        activeKey: "allTimeTop100",
      });

      navigate("/games");
    },
  };
};

export default useGameActions;

