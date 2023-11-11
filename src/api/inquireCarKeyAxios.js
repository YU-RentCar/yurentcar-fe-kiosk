import api from "./interceptors";

export const inquireCarKeyAxios = (userName, resvId, kioskId) => {
  return api({
    url: "branches/kiosks/keyStorage",
    method: "get",
    params: {
      name: userName,
      reservationId: resvId,
      kioskId: kioskId,
    },
  });
};
