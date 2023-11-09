import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import SideBar from "components/SideBar";
import ResvCheck from "pages/ResvCheck/ResvCheck";
import Map from "pages/Map/Map";

const App = () => {
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.split("/")[1] === "managecar") nav("/car");
  }, []);

  return (
    <>
      <div className="w-full min-h-screen bg-slate-50">
        {/* 사이드바 */}
        <SideBar />
        {/* 메인 컨텐츠 */}
        <Routes>
          <Route path="/resvcheck" element={<ResvCheck></ResvCheck>}></Route>
          <Route path="/map" element={<Map></Map>}></Route>
          <Route path="/returnkey" element={<div>returnkey</div>}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
