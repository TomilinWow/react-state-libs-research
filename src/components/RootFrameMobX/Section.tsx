import React, { useState } from "react";
import { Group, Rect } from "react-konva";
import { Section, Devider as DeviderVM} from '../../pages/MobxPixelApp/MobXPixelApp.vm'

import Sash from "./Sash";
import Glass from "./Glass";
import OpeningDirection from "./OpeningDirection";
import Handle from "./Handle";
import Devider from "./Devider";
import { observer } from "mobx-react-lite";
import { useStore } from "../../pages/MobxPixelApp/hook";

interface ISectionInnerProps {
    section: Section | DeviderVM;
    x: number;
    y: number;
}

const SectionInner: React.FC<ISectionInnerProps> = ({ x, y, section }) => {
    const store = useStore("store");
    // @ts-ignore
    const [group, setGroup] = useState <Group | null>(null)

    const isSelected = store.selectedSection === section;
    const handleClick = (e: any) => {
        const firstSection = e.target.findAncestor(".section");
        if (firstSection === group) {
           store.selectedSectionId = section.id;
        }
    };

    const childSections = [];
    let offsetX = 0;
    let offsetY = 0;
    for (const child of section.sections) {
        if (child.nodeType === "section") {
            childSections.push(<SectionInner section={child} x={offsetX} y={offsetY} />);
        } else {
            childSections.push(
                <Devider
                    width={child.width}
                    height={child.height}
                    x={offsetX}
                    y={offsetY}
                />
            );
        }

        if (section instanceof Section && section.splitDirection === "vertical") {
            offsetX += child.width;
        } else {
            offsetY += child.height;
        }
    }
    return (<Group
        x={x}
        y={y}
        onClick={handleClick}
        ref={node => {
            setGroup(node)
        }}
        name="section"
    >
        <Glass
            width={section.width}
            height={section.height}
            // @ts-ignore
            padding={section.frameSize}
        />
        <OpeningDirection
            width={section.width}
            height={section.height}
            // @ts-ignore
            padding={section.frameSize}
            // @ts-ignore
            type={section.type}
        />

        <Sash
            width={section.width}
            height={section.height}
            // @ts-ignore
            size={section.frameSize}
        />
        <Handle
            width={section.width}
            height={section.height}
            // @ts-ignore
            padding={section.frameSize}
            // @ts-ignore
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
    </Group>)
    
}

export default observer(SectionInner);