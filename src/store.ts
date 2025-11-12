import { create } from "zustand";
import { ActiveKey } from "./entities/GameDisplayOption";

interface GameQuery {
    genreId?: number;
    platformId?: number;
    sortOrder?: string;
    searchText?: string;
    dates?: string;
    activeKey?: ActiveKey;
}

interface GameQueryStore {
    gameQuery: GameQuery;

    setSearchText: (searchText: string) => void;
    setGenreId: (genreId: number) => void;
    setPlatformId: (platformId: number) => void;
    setSortOrder: (sortOrder: string) => void;
    setDates: (dates: string) => void;

    setPreset: (patch: Partial<GameQuery>) => void;
    reset: () => void;
}

const useGameQueryStore = create<GameQueryStore>(set => ({
    gameQuery: {},

    setSearchText: (searchText) => set(() => ({ gameQuery: { searchText } })),
    setGenreId: (genreId) => set(store => ({ gameQuery: { ...store.gameQuery, genreId, activeKey: `genre-${genreId}` } })),
    setPlatformId: (platformId) => set(store => ({ gameQuery: { ...store.gameQuery, platformId } })),
    setSortOrder: (sortOrder) => set(store => ({ gameQuery: { ...store.gameQuery, sortOrder } })),
    setDates: (dates) => set(store => ({ gameQuery: { ...store.gameQuery, dates } })),

    setPreset: (patch) => set(() => ({ gameQuery: { ...patch } })),
    reset: () =>
        set(() => ({
            gameQuery: { activeKey: "allGames" },
        })),
}));

export default useGameQueryStore;