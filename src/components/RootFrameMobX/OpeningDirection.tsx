import { observer } from "mobx-react-lite";
import React from "react";
import { Line } from "react-konva";

interface IOpeningDirectionProps {
    width: number;
    height: number;
    padding: number;
    type: string;
}

const OpeningDirection: React.FC<IOpeningDirectionProps> = ({ width, height, padding, type}) => {

    return (
        <React.Fragment>
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
                        height - padding
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
                        height - padding
                    ]}
                    stroke="black"
                    strokeWidth={1}
                />
            )}
        </React.Fragment>
    );
    
}

export default observer(OpeningDirection);