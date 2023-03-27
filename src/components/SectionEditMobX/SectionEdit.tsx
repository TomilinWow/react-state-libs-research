import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../pages/MobxPixelApp/hook";
import { Devider } from "../../pages/MobxPixelApp/MobXPixelApp.vm";

const SectionEdit: React.FC = () => {
    const store = useStore("store");
    let { selectedSection } = store;
    if (!selectedSection || selectedSection instanceof Devider) {
        return <div style={{height: 100}} />
    }

    return <div style={{height: 100 }}
    >
        <div style={{ margin: 10 }}>
            Sash type:{" "}
            <select
                value={selectedSection?.type ?? null}
                onChange={(e) => store.setSectionType(e.target.value)}>
                <option value="none">Empty</option>
                <option value="left">Open left</option>
                <option value="right">Open right</option>
                <option value="tilt,left">Tilf and open left</option>
                <option value="tilt,right">Tilf and open right</option>
            </select></div>
        <div style={{ margin: 10 }}>
            Frame size:
            <input
                type="number"
                value={selectedSection?.frameSize ?? null}
                // @ts-ignore
                onChange={(e) => selectedSection?.setFrameSize(parseInt(e.target.value, 10))}
            />
        </div>
        <div style={{ margin: 10 }}>
        <button onClick={() => store.splitCurrentSection("vertical")}>Split vertical</button>
        <button onClick={() => store.splitCurrentSection("horizontal")}>Split horizontal</button></div>
    </div>
}

export default observer(SectionEdit);