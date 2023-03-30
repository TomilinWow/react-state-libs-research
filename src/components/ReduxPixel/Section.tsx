import React from "react";
import { Group, Rect } from "react-konva";
import Sash from "./Sash";
import Glass from "./Glass";
import OpeningDirection from "./OpeningDirection";
import Handle from "./Handle";
import Devider from "./Devider";
import {RootState, useAppDispatch, useAppSelector} from "../../store/window/store";
import {setSelectedSectionId} from "../../store/window/slices/storeSlice/storeSlice";


interface SectionProps {
    section: any; // ToDO: IDevider | ISection
    x: number;
    y: number;
}

const SectionInner: React.FC<SectionProps> = ({ section, x, y }) => {
    const dispatch = useAppDispatch();
    const selectedSectionId = useAppSelector((state: RootState) => state.store.selectedSectionId);
    const isSelected = selectedSectionId === section.id;

    const handleSectionClick = (e: any) => {
        const firstSection = e.target.findAncestor(".section");
        if (firstSection === groupRef.current) {
            dispatch(setSelectedSectionId(section.id));
        }
    };

    const childSections = [];
    let offsetX = 0;
    let offsetY = 0;
    for (const child of section.sections) {
        if (child.nodeType === "section") {
            childSections.push(<Section key={child.id} section={child} x={offsetX} y={offsetY} />);
        } else {
            childSections.push(
                <Devider
                    key={child.id}
                    width={child.width}
                    height={child.height}
                    x={offsetX}
                    y={offsetY}
                />
            );
        }

        if (section.splitDirection === "vertical") {
            offsetX += child.width;
        } else {
            offsetY += child.height;
        }
    }

    const groupRef = React.useRef<any>(null);

    return (
        <Group
            x={x}
            y={y}
            onClick={handleSectionClick}
            ref={groupRef}
            name="section"
        >
            <Glass
                width={section.width}
                height={section.height}
                padding={section.frameSize}
            />
            <OpeningDirection
                width={section.width}
                height={section.height}
                padding={section.frameSize}
                type={section.type}
            />
            <Sash
                width={section.width}
                height={section.height}
                size={section.frameSize}
            />
            <Handle
                width={section.width}
                height={section.height}
                padding={section.frameSize}
                type={section.type}
            />
            {isSelected && (
                <Rect
                    width={section.width}
                    height={section.height}
                    fill="green"
                    opacity={0.3}
                />
            )}
            {childSections}
        </Group>
    );
};

const Section = SectionInner

export default Section