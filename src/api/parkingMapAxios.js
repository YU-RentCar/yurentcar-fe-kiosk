import api from "./interceptors";

// 주차장 상태 표기
/* 지점 지도 조회 */
export const getMap = (kioskLocation) => {
  return api({
    url: "/branches/parkingSpots",
    method: "get",
    params: {
      province: kioskLocation.province,
      branchName: kioskLocation.branchName,
    },
  });
};

export const getCarCoordinate = (carNumber, locationInfo) => {
  return api({
    url: "branches/parkingSpots/location",
    method: "get",
    params: {
      carNumber: carNumber,
      province: locationInfo.province,
      branchName: locationInfo.branchName,
    },
  });
};
