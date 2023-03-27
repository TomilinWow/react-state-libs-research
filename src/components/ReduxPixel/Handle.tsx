import React from "react";
import { Shape } from "react-konva";

type HandleProps = {
    width: number;
    height: number;
    type: string;
    padding: number;
};

const Handle: React.FC<HandleProps> = ({ width, height, type, padding }) => {
    if (type === "none") {
        return null;
    }

    let x, y;

    if (type.indexOf("left") >= 0) {
        x = width - padding / 2;
        y = height / 2;
    } else if (type.indexOf("right") >= 0) {
        x = padding / 2;
        y = height / 2;
    } else {
        console.error("???");
        return null;
    }

    return (
        <Shape
            x={x}
            y={y}
            fill="rgba(0,0,0,0.2)"
            sceneFunc={(ctx, shape) => {
                ctx.beginPath();
                ctx.rect(-20, -20, 40, 50);
                ctx.rect(-14, -5, 28, 80);
                ctx.fillStrokeShape(shape);
            }}
            stroke="black"
            strokeWidth={1}
        />
    );
};
export default Handle;