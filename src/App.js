import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import SideBar from "components/SideBar";
import ResvCheck from "pages/ResvCheck/ResvCheck";
import Map from "pages/Map/Map";
import { useRecoilState } from "recoil";
import { resetCounterAtom } from "recoil/resetCounterAtom";
import Logo from "./assets/Logo.svg";
import ReturnKey from "pages/ReturnKey/ReturnKey";

const App = () => {
  const nav = useNavigate();
  const location = useLocation();

  const [counter, setCounter] = useRecoilState(resetCounterAtom);
  const [isInitialPage, setIsInitialPage] = useState(true);

  useEffect(() => {
    if (location.pathname.split("/")[1] === "managecar") nav("/car");
  }, []);

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
    <>
      {isInitialPage === true ? (
        <div className="flex flex-col items-center justify-center w-screen h-screen select-none bg-blue-50">
          <img src={Logo} alt="YURentcar Logo" className="w-1/4" />
          <h1 className="w-1/4 mt-10 font-bold text-center text-7xl">
            서울대점
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
            <Route path="/resvcheck" element={<ResvCheck></ResvCheck>}></Route>
            <Route path="/map" element={<Map></Map>}></Route>
            <Route path="/returnkey" element={<ReturnKey></ReturnKey>}></Route>
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
