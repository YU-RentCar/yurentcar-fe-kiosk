import { alertAtom } from "recoil/alertAtom";
import { useRecoilValue } from "recoil";

const Alert = () => {
  const alertMsg = useRecoilValue(alertAtom).msg; // 알림창 메세지
  return (
    <div className="fixed left-0 z-50 flex items-center justify-center w-full bottom-20">
      <div className="flex items-center justify-center w-1/3 h-10 font-bold text-white rounded-full bg-slate-600">
        {alertMsg}
      </div>
    </div>
  );
};

export default Alert;
