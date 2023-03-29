import React, {useRef, useState, useEffect, useContext} from "react";
import { Stage, Layer } from "react-konva";
import Section from "./Section";
import Sash from "./Sash";
import Metrics from "./Metrics";
import {AppContext} from "../../context/AppContext/AppContext";

const RootFrame: React.FC = () => {

    const [width, setWidth] = useState(700);
    const containerRef = useRef<HTMLDivElement>(null);
    const {setSelectedSectionId, root} = useContext(AppContext)

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth);
        }
    }, []);

    const handleStageClick = (e: any) => {
        if (e?.target?.nodeType === "Stage") {
            setSelectedSectionId(null)
        }
    };

    let padding = 150
    const scale = (width - padding * 2) / root.width;
    const height = padding * 2 + root.height * scale;

    return (
        <div ref={containerRef}>
            <Stage
                width={width}
                height={height}
                onClick={handleStageClick}
            >
                    <Layer scaleX={scale} scaleY={scale} y={20} x={20}>
                        <Section
                            section={root.sections[0]}
                            x={root.frameSize}
                            y={root.frameSize}
                        />
                        <Sash
                            width={root.width}
                            height={root.height}
                            size={root.frameSize}
                        />
                        <Metrics />
                    </Layer>
            </Stage>
        </div>
    );
};

export default RootFrame;