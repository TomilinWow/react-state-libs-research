import React, { FC } from "react";
import { Line } from "react-konva";

interface Props {
    width: number;
    height: number;
    type: string;
    padding: number;
}

const OpeningDirection: FC<Props> = ({ width, height, type, padding }) => {
    if (type === "none") {
        return null;
    }

    return (
        <>
            {type.indexOf("left") >= 0 && (
                <Line
                    points={[padding, padding, width - padding, height / 2, 0, height]}
                    stroke="black"
                    strokeWidth={1}
                />
            )}
            {type.indexOf("right") >= 0 && (
                <Line
                    points={[
                        width - padding,
                        padding,
                        padding,
                        height / 2,
                        width - padding,
                        height - padding,
                    ]}
                    stroke="black"
                    strokeWidth={1}
                />
            )}
            {type.indexOf("tilt") >= 0 && (
                <Line
                    points={[
                        padding,
                        height - padding,
                        width / 2,
                        padding,
                        width - padding,
                        height - padding,
                    ]}
                    stroke="black"
                    strokeWidth={1}
                />
            )}
        </>
    );
};

export default OpeningDirection;