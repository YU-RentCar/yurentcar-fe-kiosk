import api from "./interceptors";

export const returnKey = (kioskId) => {
  return api({
    url: "branches/kiosks/return",
    timeout: 10000,
    method: "post",
    data: {
      kioskId: kioskId,
    },
  });
};
