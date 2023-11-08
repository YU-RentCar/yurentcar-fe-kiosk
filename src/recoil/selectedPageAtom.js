const { atom, selector } = require("recoil");

export const selectedPageAtom = atom({
  key: "selectedPageAtom",
  default: [true, false, false],
});

export const pageSelector = selector({
  key: "pageSelector",
  get: ({ get }) => get(selectedPageAtom),
  set: ({ set }, newValue) => {
    const temp = [false, false, false];
    temp[newValue] = true;
    set(selectedPageAtom, temp);
  },
});
