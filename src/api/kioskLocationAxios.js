import api from "./interceptors";

export const getKioskLocation = (kioskId) => {
  return api({
    url: "branches/kiosks/branch-name",
    method: "get",
    params: {
      kioskId: kioskId,
    },
  });
};
