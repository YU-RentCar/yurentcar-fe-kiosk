import React from "react";
import { Stage, Layer, Rect } from "react-konva";
import { useEffect, useState } from "react";
import { MdZoomIn, MdZoomOut } from "react-icons/md";
import { Button } from "@material-tailwind/react";
import option from "./option";
import colorSet from "./colorSet";
import MapController from "./MapController";
import { useAlert } from "utils/useAlert";
import { useRecoilValue } from "recoil";
import { alertAtom } from "recoil/alertAtom";
import Alert from "popUp/Alert";
import { getCarCoordinate, getMap } from "api/parkingMapAxios";
import { kioskLocationAtom } from "recoil/kioskLocationAtom";

const ParkingMap = () => {
  const kioskLocation = useRecoilValue(kioskLocationAtom);

  // 버튼 스타일 상수
  const UNSELECTED_STYLE =
    "flex items-center justify-start p-2 text-xl font-bold border-gray-500 rounded-2xl";

  // 컨트롤러
  const mapController = new MapController(50, 45, 80);

  // Alert
  const alert = useAlert();
  const alertState = useRecoilValue(alertAtom);

  const [zoom, setZoom] = useState(0.2);
  const [rects, setRects] = useState(
    [...Array(mapController.MAX)].map((v, i) => {
      return {
        id: i.toString(),
        x: mapController.getX(i, zoom),
        y: mapController.getY(i, zoom),
        fill: "white",
      };
    })
  );

  const [changeCoordinate, setChangeCoordinate] = useState({ x: -1, y: -1 });

  const [carNumberInput, setCarNumberInput] = useState("");

  //배율이 바뀌면 원래 위치를 유지하며 리렌더링
  useEffect(() => {
    setRects(
      [...Array(mapController.MAX)].map((v, i) => ({
        id: i.toString(),
        x: mapController.getX(i, zoom),
        y: mapController.getY(i, zoom),
        fill: rects[i].fill,
      }))
    );
  }, [zoom]);

  // 초기에 서버에 저장되어있는 지도를 가져와 렌더링
  // axiosList로 지도 정보를 받았다고 가정
  useEffect(() => {
    getMap(kioskLocation)
      .then((response) => {
        console.log(response);

        for (const item of response.data) {
          const idx = item.y * mapController.COL + item.x;

          rects[idx] = {
            id: idx.toString(),
            x: mapController.getX(idx, zoom),
            y: mapController.getY(idx, zoom),
            fill: colorSet[option[item.type]],
          };
        }

        setRects([...rects]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="w-[1140px] h-[180px] bg-white flex justify-around items-center rounded-2xl mb-2 border select-none">
        <div>
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <div className={UNSELECTED_STYLE}>
              <div className="bg-[#4ADE80] w-[45px] h-[45px] ml-2 mr-4"></div>
              <div className="text-2xl">인도</div>
            </div>
            <div className={UNSELECTED_STYLE}>
              <div className="bg-[#60A5FA] w-[45px] h-[45px] ml-2 mr-4"></div>
              <div className="text-2xl">주차 가능</div>
            </div>
            <div className={UNSELECTED_STYLE}>
              <div className="bg-[#94A3B8] w-[45px] h-[45px] ml-2 mr-4"></div>
              <div className="text-2xl">차도</div>
            </div>
            <div className={UNSELECTED_STYLE}>
              <div className="bg-[#F87171] w-[45px] h-[45px] ml-2 mr-4"></div>
              <div className="text-2xl">주차 불가능</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="px-2 pr-5 mb-3 mr-2 text-2xl font-bold">
            현재 배율 : {`${Math.round(zoom * 100) / 100}배`}
          </h1>
          <div className="flex">
            <div
              className="flex flex-col items-center justify-center px-4 py-2 mr-5 font-bold text-black text- text-md bg-slate-200 rounded-xl"
              onClick={() =>
                Math.round(zoom * 100) / 100 !== 1.4
                  ? setZoom(zoom + 0.2)
                  : null
              }
            >
              <MdZoomIn className="text-2xl"></MdZoomIn>
              <p>배율 증가</p>
            </div>
            <div
              className="flex flex-col items-center justify-center px-4 py-2 mr-5 font-bold text-black pflex-col text-md bg-slate-200 rounded-xl"
              onClick={() =>
                Math.round(zoom * 100) / 100 !== 0.2
                  ? setZoom(zoom - 0.2)
                  : null
              }
            >
              <MdZoomOut className="text-2xl"></MdZoomOut>
              <p>배율 감소</p>
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex">
            <div className="bg-[#7C3AED] w-[50px] h-[50px] mr-4"></div>
            <input
              type="text"
              className="pl-3 text-2xl font-bold border border-black"
              value={carNumberInput}
              onChange={(e) => setCarNumberInput(e.target.value)}
              placeholder="차량 번호 입력"
            />
          </div>
          <Button
            className="w-full mt-3 text-2xl text-black bg-amber-400"
            onClick={() => {
              getCarCoordinate(carNumberInput, kioskLocation)
                .then((response) => {
                  let id = 0;
                  const x = response.data.x;
                  const y = response.data.y;
                  if (changeCoordinate.x !== -1 && changeCoordinate.y !== -1) {
                    id =
                      mapController.COL * changeCoordinate.y +
                      changeCoordinate.x;

                    const temp = [...rects];

                    temp[id].fill = "#60A5FA";

                    setRects(temp);
                  }
                  id = mapController.COL * y + x;

                  setChangeCoordinate({ x: x, y: y });

                  const temp = [...rects];
                  temp[id].fill = "#7C3AED";

                  setRects(temp);
                })
                .catch((error) => {
                  console.log(error);
                  alert.onAndOff("잘못된 요청입니당");
                  setChangeCoordinate({ x: -1, y: -1 });
                });
            }}
          >
            차량 위치 검색
          </Button>
        </div>
      </div>

      <Stage
        width={1140}
        height={550}
        draggable
        className="border-2 border-yellow-700 bg-purple-50"
      >
        <Layer>
          {rects.map((rect, idx) => {
            return (
              <Rect
                key={idx}
                id={rect.id}
                x={rect.x}
                y={rect.y}
                width={mapController.DEFAULT_SIZE * zoom}
                height={mapController.DEFAULT_SIZE * zoom}
                stroke="black"
                strokeWidth={0.3}
                fill={rect.fill}
              ></Rect>
            );
          })}
        </Layer>
      </Stage>
      <div>지도를 드래그해서 볼 수 있습니다</div>
      {/* Alert 영역 */}
      {alertState.state && <Alert></Alert>}
    </>
  );
};

export default ParkingMap;
