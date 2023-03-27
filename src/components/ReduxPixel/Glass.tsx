import React from "react";
import { Group, Rect } from "react-konva";

type GlassProps = {
    padding: number;
    width: number;
    height: number;
};

const Glass: React.FC<GlassProps> = ({ padding, width, height }) => {
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
};
export default Glass;