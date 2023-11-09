import { atom, selector } from "recoil";

export const alertAtom = atom({
  key: "alertAtom",
  default: {
    msg: "",
    state: false,
  },
});

export const alertSelector = selector({
  key: "alertSelector",
  get: ({ get }) => get(alertAtom),
  set: ({ set }, newValue) => {
    const tmp = {
      ...newValue,
    };
    set(alertAtom, tmp);
  },
});
