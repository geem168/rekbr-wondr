import { create } from "zustand";

const useUserStore = create((set) => ({
  userCount: 0,
  setUserCount: (count) => set({ userCount: count }),
}));

export default useUserStore;
