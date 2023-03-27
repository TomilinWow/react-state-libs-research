import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";

import Section from "./Section";
import Sash from "./Sash";
import Metrics from "./Metrics";
import { useStore } from "../../pages/MobxPixelApp/hook";
import { observer } from "mobx-react-lite";

const RootFrame: React.FC = () => {
    const ref = useRef(null);
    const [state, setState] = useState({
        width: 700,
        height: 500
    })
    useEffect(() => {
         // @ts-ignore
        setState((prev) => ({ width: ref.current?.offsetWidth ?? 100 }));
    }, []);
    const handleClick = (e: any) => {
        if (e.target.nodeType === "Stage") {
            store.setSelectedSectionId(null);
        }
    };
    const store = useStore("store");
    const padding = 150;

    let { root } = store;
    const scale = (state.width - padding * 2) / root.width;

    const height = padding * 2 + root.height * scale;
    
    return (<div ref={ref}
    >
        <Stage
            width={state.width}
            height={height}
            onClick={handleClick}
            
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
    </div>)
}

export default observer(RootFrame);
