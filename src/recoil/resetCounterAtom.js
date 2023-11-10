const { atom } = require("recoil");

export const resetCounterAtom = atom({
  key: "resetCounterAtom",
  default: 120,
});
