import { useRecoilState } from "recoil";
import { alertSelector } from "recoil/alertAtom";

export const useAlert = function () {
  const [alertState, setAlertState] = useRecoilState(alertSelector);

  // controller
  const alert = {};

  // Alert 키고 끄기
  alert.onAndOff = function (msg) {
    setAlertState({ msg: msg, state: true });
    setTimeout(() => setAlertState({ msg: "", state: false }), 2000);
  };

  return alert;
};
