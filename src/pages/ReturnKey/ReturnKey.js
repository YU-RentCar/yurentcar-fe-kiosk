import React, { useEffect, useState } from "react";
import TouchKey from "assets/TouchKey.png";
import { useRecoilValue } from "recoil";
import { kioskIdAtom } from "recoil/kioskIdAtom";
import { returnKey } from "api/returnKeyAxios";

export const ReturnKey = ({ setFreeze }) => {
  const kioskId = useRecoilValue(kioskIdAtom);

  // 현재 사용자의 동작을 막고 있는지
  const [isDelay, setIsDelay] = useState(false);

  // 키박스 번호
  const [keyBox, setKeyBox] = useState(null);

  return (
    <div className="w-screen h-screen select-none">
      {isDelay === true ? (
        <div className="ml-[500px] h-full bg-sky-50 flex flex-col items-center justify-center">
          <img src={TouchKey} alt="" />
        </div>
      ) : (
        <div className="ml-[500px] h-full bg-sky-50 flex flex-col items-center justify-center">
          <button
            className="p-4 text-3xl font-bold rounded-md bg-amber-400"
            onClick={() => {
              setIsDelay(true);

              returnKey(kioskId)
                .then((response) => {
                  console.log(response.data);
                  setKeyBox(response.data);
                  setIsDelay(false);
                })
                .catch((error) => {
                  console.log(error);
                  setKeyBox("error");
                  setIsDelay(false);
                });

              setFreeze(true);

              setTimeout(
                () => {
                  setFreeze(false);
                },
                10000,
                setFreeze
              );
            }}
          >
            키를 반납하려면 클릭해 주세요
          </button>

          <div className="my-10 text-3xl font-bold">
            키 반납 동안에는, 잠시 화면이 정지됩니다
          </div>

          {keyBox === null ? null : (
            <div className="text-2xl">
              {keyBox === "error" ? (
                <div className="text-3xl font-bold text-red-500">
                  태그가 인식되지 않았습니다. 다시 시도하세요
                </div>
              ) : (
                <div>
                  <span className="text-3xl font-bold">{keyBox}</span> 번 상자에
                  키를 갖다 넣으세요{" "}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReturnKey;
