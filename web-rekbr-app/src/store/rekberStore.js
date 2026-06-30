import { create } from "zustand";

const useRekberStore = create((set) => ({
  rekberCount: 0,
  setRekberCount: (count) => set({ rekberCount: count }),
}));

export default useRekberStore;
