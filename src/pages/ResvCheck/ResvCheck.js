import React from "react";
import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useAlert } from "utils/useAlert";
import { useRecoilValue } from "recoil";
import { alertAtom } from "recoil/alertAtom";
import Alert from "popUp/Alert";
import { inquireCarKeyAxios } from "api/inquireCarKeyAxios";
import { kioskIdAtom } from "recoil/kioskIdAtom";

const ResvCheck = () => {
  // 예약자 이름 Input
  const [nameInputValue, setNameInputValue] = useState("");

  // 예약번호 Input
  const [resvIDInputValue, setResvIDInputValue] = useState("");

  // 서버로부터의 응답
  const [queryResult, setQueryResult] = useState(null);

  // Alert
  const alert = useAlert();
  const alertState = useRecoilValue(alertAtom);

  // kiosk id
  const kioskId = useRecoilValue(kioskIdAtom);

  return (
    <div className="w-screen h-screen select-none">
      <div className="ml-[500px] h-full bg-sky-50 flex flex-col items-center justify-start">
        {/* 이름 입력 */}
        <div className="w-full h-[200px] flex justify-center items-center mt-[100px]">
          <div className="w-1/2 p-5 bg-white border-2 border-blue-600 rounded-xl">
            <div className="text-3xl font-bold text-gray-600">
              예약자 분의 이름을 입력해주세요
            </div>
            <div className="mt-5">
              <input
                type="text"
                value={nameInputValue}
                onChange={(e) => setNameInputValue(e.target.value)}
                placeholder="이름을 입력해주세요"
                className="w-full p-2 text-4xl font-bold border-2 border-black rounded-md"
              />
            </div>
          </div>
        </div>

        {/* 예약번호 입력 */}
        <div className="w-full h-[200px] flex justify-center items-center">
          <div className="w-1/2 p-5 bg-white border-2 border-blue-600 rounded-xl">
            <div className="text-3xl font-bold text-gray-600">
              예약자 분의 예약번호를 입력해주세요
            </div>
            <div className="mt-5">
              <input
                type="text"
                value={resvIDInputValue}
                onChange={(e) => setResvIDInputValue(e.target.value)}
                placeholder="예약번호를 입력해주세요"
                className="w-full p-2 text-4xl font-bold border-2 border-black rounded-md"
              />
            </div>
          </div>
        </div>

        {/* 확인 버튼 */}
        <div className="w-full h-[100px] flex justify-center items-center">
          <Button
            className="text-3xl font-bold bg-amber-400 px-[100px]"
            onClick={() => {
              // 유효성 검사
              if (nameInputValue === "" || resvIDInputValue === "") {
                alert.onAndOff("양식을 모두 채워 주세요");
                return;
              }

              // 서버에게 요청
              inquireCarKeyAxios(nameInputValue, resvIDInputValue, kioskId)
                .then((response) => {
                  console.log(response);
                  // 정상응답에 대한 예시
                  setQueryResult(response.data);
                })
                .catch((error) => {
                  // 비정상응답에 대한 예시
                  setQueryResult(false);
                  console.log(error);
                });
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
            <div className="w-1/2 p-5 text-4xl font-bold bg-white border-2 border-blue-600 rounded-xl">
              <div>고객님의 차 키는</div>
              <div>{queryResult}번째 상자에 들어 있습니다.</div>
            </div>
          )}
        </div>
      </div>
      {/* Alert 영역 */}
      {alertState.state && <Alert></Alert>}
    </div>
  );
};

export default ResvCheck;
