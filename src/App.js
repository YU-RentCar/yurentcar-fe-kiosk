import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import SideBar from "components/SideBar";
import ResvCheck from "pages/ResvCheck/ResvCheck";
import Map from "pages/Map/Map";
import { useRecoilState, useRecoilValue } from "recoil";
import { resetCounterAtom } from "recoil/resetCounterAtom";
import Logo from "./assets/Logo.svg";
import { kioskIdAtom } from "recoil/kioskIdAtom";
import { getKioskLocation } from "api/kioskLocationAxios";
import { kioskLocationAtom } from "recoil/kioskLocationAtom";
import Alert from "popUp/Alert";
import { useAlert } from "utils/useAlert";
import { alertAtom } from "recoil/alertAtom";

const App = () => {
  const nav = useNavigate();
  const location = useLocation();

  const [counter, setCounter] = useRecoilState(resetCounterAtom);
  const [isInitialPage, setIsInitialPage] = useState(true);
  const [isKioskIdExist, setIsKioskIdExist] = useState(false);

  const [rclKioskId, setRclKioskId] = useRecoilState(kioskIdAtom);
  const [rclKioskLocation, setRclKioskLocation] =
    useRecoilState(kioskLocationAtom);

  const [input, setInput] = useState("");

  const alert = useAlert();
  const alertState = useRecoilValue(alertAtom);

  useEffect(() => {
    // 로컬스토리지에 id가 없으면 입력 화면으로, 있으면 사용 화면으로

    // 로컬스토리지에 없으면 null, 빈 값으로 초기화
    if (window.localStorage.getItem("kioskId") === null) {
      console.log("없어용");
      setIsKioskIdExist(false);
    } else {
      console.log("있어요");
      setRclKioskId(window.localStorage.getItem("kioskId"));
      setIsKioskIdExist(true);
    }
  }, []);

  // 일정 시간 주기로 화면 초기화시키는 코드
  useEffect(() => {
    const id = setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);

    if (counter === 0) {
      clearInterval(id);
      setIsInitialPage(true);
    }

    return () => clearInterval(id);
  }, [counter]);

  return (
    <div>
      {isKioskIdExist === false ? (
        <div className="flex items-center justify-center w-screen h-screen">
          <div className="flex flex-col items-center justify-center w-1/2 bg-blue-300 h-1/3">
            <div className="mb-5 text-4xl font-bold">
              키오스크 아이디를 입력해 주세요
            </div>
            <input
              type="text"
              className="w-1/2 p-2 mb-3 text-4xl border-2 border-black"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button
              className="w-1/2 text-2xl font-bold h-14 bg-amber-400"
              onClick={() => {
                getKioskLocation(input)
                  .then((response) => {
                    setRclKioskId(input);
                    setIsKioskIdExist(true);
                    setRclKioskLocation(response.data);
                    window.localStorage.setItem("kioskId", input);
                  })
                  .catch((error) => {
                    alert.onAndOff("잘못된 키오스크 id 입니다");
                    console.log(error);
                  });
              }}
            >
              확인
            </button>
          </div>
        </div>
      ) : (
        <div>
          {isInitialPage === true ? (
            <div className="flex flex-col items-center justify-center w-screen h-screen select-none bg-blue-50">
              <img src={Logo} alt="YURentcar Logo" className="w-1/4" />
              <h1 className="mt-10 font-bold text-center text-7xl">
                {rclKioskLocation.province} {rclKioskLocation.branchName}
              </h1>
              <button
                onClick={() => {
                  setIsInitialPage(false);
                  setCounter(10);
                }}
                className="w-1/4 py-10 mt-[50px] bg-blue-300 rounded-md text-4xl font-bold"
              >
                사용하기
              </button>
            </div>
          ) : (
            <div className="w-full min-h-screen bg-slate-50">
              {/* 사이드바 */}
              <SideBar />
              {/* 메인 컨텐츠 */}
              <Routes>
                <Route
                  path="/resvcheck"
                  element={<ResvCheck></ResvCheck>}
                ></Route>
                <Route path="/map" element={<Map></Map>}></Route>
                <Route path="/returnkey" element={<div>returnkey</div>}></Route>
              </Routes>
            </div>
          )}
        </div>
      )}

      {/* Alert 구역 */}
      {alertState.state && <Alert />}
    </div>
  );
};

export default App;
