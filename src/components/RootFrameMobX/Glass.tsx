import { observer } from "mobx-react-lite";
import React from "react";
import { Group, Rect } from "react-konva";

interface IGlassProps {
    width: number;
    height: number;
    padding: number;
}

const Glass: React.FC<IGlassProps> = ({width, height,padding}) => {
    return (
        <Group>
            <Rect
                x={padding}
                y={padding}
                width={width - padding * 2}
                height={height - padding * 2}
                fill="lightblue"
            />
        </Group>
    );
}

export default observer(Glass);