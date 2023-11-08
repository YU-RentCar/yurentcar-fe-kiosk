import Logo from "assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { MdVpnKey, MdEventAvailable, MdLocalParking } from "react-icons/md";
import { useRecoilState } from "recoil";
import { pageSelector } from "recoil/selectedPageAtom";

const SideBar = () => {
  const [rclIsClicked, setRclIsClicked] = useRecoilState(pageSelector);

  useEffect(() => {
    console.log(rclIsClicked);
    console.log(menu);
  }, [rclIsClicked]);

  const clickedStyle =
    "w-[400px] h-[60px] px-4 mt-3 rounded-2xl bg-slate-400 flex items-center text-slate-800";

  const nav = useNavigate(); // nav 제어
  const [menu, setMenu] = useState([
    {
      name: "예약 번호",
      icon: <MdEventAvailable className="text-[40px]" />,
      path: "/resvcheck",
    },
    {
      name: "주차장 보기",
      icon: <MdLocalParking className="text-[40px]" />,
      path: "/map",
    },
    {
      name: "키 반납",
      icon: <MdVpnKey className="text-[40px]" />,
      path: "/returnkey",
    },
  ]); // 각 메뉴 + 아이콘
  return (
    <>
      <div className="fixed left-0 w-[500px] h-screen bg-blue-100 flex flex-col items-center">
        {/* 로고 */}
        <div className="w-[500px] flex justify-center">
          <img src={Logo} alt="로고" className="w-[200px] m-5" />
        </div>
        {/* 지점 이름 */}
        <div className="w-[500px] justify-center flex text-5xl font-bold text-blue-800 my-4">
          서울대 지점
        </div>
        {/* 메뉴들 + 로그아웃 버튼 */}
        <div className="w-[450px] h-[600px] rounded-2xl bg-slate-50 my-4 flex flex-col justify-between items-center">
          <div className="w-[420px]">
            {menu.map((v, i) => {
              return (
                <button
                  key={i}
                  className={
                    rclIsClicked[i]
                      ? clickedStyle
                      : "w-[400px] h-[60px] px-4 mt-3 rounded-2xl hover:bg-slate-400 flex items-center hover:text-slate-800"
                  }
                  onClick={() => {
                    setRclIsClicked(i);
                    nav(v["path"]); // 지정된 경로로 이동
                  }}
                >
                  {v["icon"]}
                  <div className="text-[30px] font-bold ml-12">{v["name"]}</div>
                </button>
              );
            })}
          </div>
        </div>{" "}
        <button
          className="w-[450px] h-[70px] mb-4 flex justify-center items-center bg-sky-200 rounded-2xl text-3xl font-extrabold hover:shadow-figma"
          onClick={() => {
            // set to admin mode
          }}
        >
          관리자 모드
        </button>
      </div>
    </>
  );
};

export default SideBar;
