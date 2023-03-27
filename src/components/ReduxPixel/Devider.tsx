import React from "react";
import { Rect } from "react-konva";

type DeviderProps = {
    x: number;
    y: number;
    width: number;
    height: number;
};

const Devider: React.FC<DeviderProps> = ({ x, y, width, height }) => {
    return (
        <Rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill="white"
            stroke="black"
            strokeWidth={1}
        />
    );
};
export default Devider;