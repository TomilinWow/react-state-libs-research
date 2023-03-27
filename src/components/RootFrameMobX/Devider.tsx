import { observer } from "mobx-react-lite";
import React from "react";
import { Rect } from "react-konva";

interface IDeviderProps {
    width: number;
    height: number;
    x: number;
    y: number;
}

const Devider: React.FC<IDeviderProps> = ({x,y,width,height }) => {
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
}

export default observer(Devider);