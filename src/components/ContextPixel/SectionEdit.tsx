import React, {useContext} from "react";
import {AppContext, findNested} from "../../context/AppContext/AppContext";


const SectionEdit: React.FC = () => {
    const {selectedSectionId, root, handleTypeSelect, handleVerticalSplit, handleHorizontalSplit, handleFrameSizeChange} = useContext(AppContext);
    const selectedSection = findNested(root, selectedSectionId);

    if (!selectedSection) {
        return <div style={{height: 100}} />
    }

    return (
        <div
            style={{height: 100}}
        >
            <div style={{ margin: 10 }}>
                Sash type:{" "}
                <select
                    value={selectedSection?.type ?? null}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleTypeSelect(e)}
                >
                    <option value="none">Empty</option>
                    <option value="left">Open left</option>
                    <option value="right">Open right</option>
                    <option value="tilt,left">Tilf and open left</option>
                    <option value="tilt,right">Tilf and open right</option>
                </select>
                Frame size:
                <input
                    type="number"
                    value={selectedSection?.frameSize ?? 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFrameSizeChange(e)}
                />
            </div>
            <button className="button-1" onClick={() => handleVerticalSplit()}>Split vertical</button>
            <button className="button-2" onClick={() => handleHorizontalSplit()}>Split horizontal</button>
        </div>
    );
};

export default SectionEdit;