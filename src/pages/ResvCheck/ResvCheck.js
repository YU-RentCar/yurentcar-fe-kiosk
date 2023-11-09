import React from "react";
import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";

const ResvCheck = () => {
  // 예약자 이름 Input
  const [nameInputValue, setNameInputValue] = useState("");

  // 예약번호 Input
  const [resvIDInputValue, setResvIDInputValue] = useState("");

  // 서버로부터의 응답
  const [queryResult, setQueryResult] = useState(null);

  // 현재 걸려있는 타이머를 저장함
  const [timer, setTimer] = useState(null);

  return (
    <div className="w-screen h-screen">
      <div className="ml-[500px] h-full bg-sky-50 flex flex-col items-center justify-start">
        {/* 이름 입력 */}
        <div className="w-full h-[200px] flex justify-center items-center mt-[100px]">
          <div className="w-1/2 p-5 bg-white border-2 border-blue-600 rounded-xl">
            <div className="text-3xl font-bold">
              예약자 분의 이름을 입력해주세요
            </div>
            <div className="mt-5">
              <Input
                label="이름을 입력해주세요"
                value={nameInputValue}
                onChange={(e) => setNameInputValue(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 예약번호 입력 */}
        <div className="w-full h-[200px] flex justify-center items-center">
          <div className="w-1/2 p-5 bg-white border-2 border-blue-600 rounded-xl">
            <div className="text-3xl font-bold">
              예약자 분의 예약번호를 입력해주세요
            </div>
            <div className="mt-5">
              <Input
                label="예약번호를 입력해주세요"
                value={resvIDInputValue}
                onChange={(e) => setResvIDInputValue(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 확인 버튼 */}
        <div className="w-full h-[100px] flex justify-center items-center">
          <Button
            className="text-3xl font-bold bg-amber-400 px-[100px]"
            onClick={() => {
              // 서버에게 요청

              // 정상응답에 대한 예시
              setQueryResult({
                name: nameInputValue,
                x: 2,
                y: 5,
              });

              // 비정상응답에 대한 예시
              // setQueryResult(false);

              // 타이머 돌아가던 것이 있으면 해제
              if (timer !== null) {
                clearTimeout(timer);
              }

              // 몇 초뒤 자동으로 초기화
              setTimer(
                setTimeout(() => {
                  setNameInputValue("");
                  setResvIDInputValue("");
                  setQueryResult(null);
                }, 3000)
              );
            }}
          >
            예약 검색하기
          </Button>
        </div>

        {/* 키 박스 위치 표시 */}
        <div className="w-full h-[100px] flex justify-center items-center mt-10">
          {queryResult === null ? null : queryResult === false ? (
            <div className="w-1/2 p-5 text-2xl bg-white border-2 border-blue-600 rounded-xl">
              <div>예약 내역이 없습니다!</div>
            </div>
          ) : (
            <div className="w-1/2 p-5 text-2xl bg-white border-2 border-blue-600 rounded-xl">
              <div>{queryResult.name} 고객님의 차 키는 </div>
              <div>
                가로로 {queryResult.x}칸 세로로 {queryResult.y}칸의 상자에
                있습니다.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResvCheck;
