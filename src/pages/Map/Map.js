import ParkingMap from "pages/Map/ParkingMap/ParkingMap";
import React from "react";

const Map = () => {
  return (
    <div className="w-screen h-screen">
      <div className="ml-[500px] h-screen flex flex-col justify-center items-center">
        <ParkingMap></ParkingMap>
      </div>
    </div>
  );
};

export default Map;
