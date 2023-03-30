import React from "react";
import {findNested, setFrameSize, setSectionType, splitCurrentSection} from "../../store/window/slices/storeSlice/storeSlice";
import {RootState, useAppDispatch, useAppSelector} from "../../store/window/store";


const SectionEdit: React.FC = () => {
    const {selectedSectionId, root} = useAppSelector((state: RootState) => state.store);
    const selectedSection = findNested(root, selectedSectionId);
    const dispatch = useAppDispatch()

    const handleTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSectionType(e.target.value));
    };

    const handleFrameSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFrameSize(parseInt(e.target.value, 10)));
    };

    const handleVerticalSplit = () => {
        dispatch(splitCurrentSection("vertical"));
    };

    const handleHorizontalSplit = () => {
        dispatch(splitCurrentSection("horizontal"));
    };

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
                    onChange={handleTypeSelect}
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
                    onChange={handleFrameSizeChange}
                />
            </div>
            <button className="button-1" onClick={handleVerticalSplit}>Split vertical</button>
            <button className="button-2" onClick={handleHorizontalSplit}>Split horizontal</button>
        </div>
    );
};

export default SectionEdit;