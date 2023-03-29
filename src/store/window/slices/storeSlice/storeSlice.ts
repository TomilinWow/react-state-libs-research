import { createSlice } from "@reduxjs/toolkit";

const DEVIDER_SIZE = 40;

function id() {
    return Math.round(Math.random() * 10000);
}

export function findNested(sec: any, id: any) {
    if (sec.id === id) {
        return sec;
    }
    if (!sec.sections) {
        return null;
    }
    for (let i = 0; i < sec.sections.length; i++) {
        let founded: any = findNested(sec.sections[i], id);
        if (founded) {
            return founded;
        }
    }
}


export interface ISection {
    nodeType: string;
    id: number;
    width: number;
    height: number;
    frameSize: number;
    type: string;
    splitDirection: string | null;
    sections: ISection[] | IDevider[];
}

export interface IDevider {
    nodeType: string;
    id: number;
    width: number;
    height: number;
    sections: ISection[];
}

interface StoreState {
    selectedSectionId: number | null;
    root: ISection;
}

const initialState: StoreState = {
    selectedSectionId: null,
    root: {
        nodeType: "section",
        id: id(),
        width: 800,
        height: 1000,
        frameSize: 50,
        type: "none",
        splitDirection: null,
        sections: [
            {
                nodeType: "section",
                id: id(),
                width: 800 - 50 * 2,
                height: 1000 - 50 * 2,
                type: "none",
                splitDirection: null,
                sections: [],
                frameSize: 0,
            },
        ],
    },
};

const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        setSelectedSectionId: (state, action) => {
            state.selectedSectionId = action.payload;
        },
        setSectionType: (state, action) => {
            const selectedSection = findNested(state.root, state.selectedSectionId);
            selectedSection.type = action.payload;
            if (action.payload === "none") {
                selectedSection.frameSize = 0;
            } else {
                selectedSection.frameSize = selectedSection.frameSize || 50;
            }
        },
        setFrameSize: (state, action) => {
            const selectedSection = findNested(state.root, state.selectedSectionId);
            selectedSection.frameSize = action.payload;
        },
        splitCurrentSection: (state, action) => {
            const selectedSection = findNested(state.root, state.selectedSectionId);
            selectedSection.splitDirection = action.payload;
            if (action.payload === "vertical") {
                selectedSection.sections.push(
                    {
                        nodeType: "section",
                        id: id(),
                        width: selectedSection.width / 2 - DEVIDER_SIZE / 2,
                        height: selectedSection.height,
                        type: "none",
                        splitDirection: null,
                        sections: [],
                        frameSize: 0,
                    },
                    {
                        nodeType: "devider",
                        id: id(),
                        width: DEVIDER_SIZE,
                        height: selectedSection.height,
                        sections: [],
                    },
                    {
                        nodeType: "section",
                        id: id(),
                        width: selectedSection.width / 2 - DEVIDER_SIZE / 2,
                        height: selectedSection.height,
                        type: "none",
                        splitDirection: null,
                        sections: [],
                        frameSize: 0,
                    }
                );
            } else {
                selectedSection.sections.push(
                    {
                        nodeType: "section",
                        id: id(),
                        width: selectedSection.width,
                        height: selectedSection.height / 2 - DEVIDER_SIZE / 2,
                        type: "none",
                        splitDirection: null,
                        sections: [],
                        frameSize: 0,
                    },
                    {
                        nodeType: "devider",
                        id: id(),
                        width: selectedSection.width,
                        height: DEVIDER_SIZE,
                        sections: [],
                    },
                    {
                        nodeType: "section",
                        id: id(),
                        width: selectedSection.width,
                        height: selectedSection.height / 2 - DEVIDER_SIZE / 2,
                        type: "none",
                        splitDirection: null,
                        sections: [],
                        frameSize: 0,
                    }
                );
            }
            state.selectedSectionId = null;
        },
    },
});

export const { setSelectedSectionId, setSectionType, splitCurrentSection, setFrameSize } = storeSlice.actions;


export default storeSlice.reducer;
