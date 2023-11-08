import axios from "axios";

/* axios 기본 세팅 (인스턴스 이름 api) */
export const api = axios.create({
  baseURL: "http://be.yurentcar.kro.kr:1234/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/* request interceptor */
api.interceptors.request.use(
  /* request 보내기 전 axios (추가) 설정 가능 */
  (config) => {
    return config;
  },
  /* request 오류 발생 */
  (error) => {
    console.log(`fail for request`);
    return Promise.reject(error);
  }
);

/* response interceptor */
api.interceptors.response.use(
  /* response 수신 성공 */
  (response) => {
    console.log(`success for response`);
    return response;
  },
  /* response 수신 실패 */
  (error) => {
    console.log(`fail for response`);
    return Promise.reject(error);
  }
);

export default api;
