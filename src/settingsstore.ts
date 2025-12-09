import { create } from "zustand";

interface SettingsState {
    hideNsfw: boolean;
    setHideNsfw: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
    hideNsfw: false,
    setHideNsfw: (value) => set({ hideNsfw: value })
}));