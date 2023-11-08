import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import SideBar from "components/SideBar";

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
          <Route path="/resvcheck" element={<div>resvcheck</div>}></Route>
          <Route path="/map" element={<div>map</div>}></Route>
          <Route path="/returnkey" element={<div>returnkey</div>}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
