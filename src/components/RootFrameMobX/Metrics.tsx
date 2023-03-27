import { observer } from "mobx-react-lite";
import React from "react";
import { Group, Line, Arrow, Label, Text, Tag } from "react-konva";
import { useStore } from "../../pages/MobxPixelApp/hook";
import { Section } from "../../pages/MobxPixelApp/MobXPixelApp.vm";

const METRIC_SIZE = 100;

interface IPos { x: number; y: number }
interface IVerticalMetricProps extends IPos { height: number; }
interface IHorizontalMetricProps extends IPos { width: number; }

function VerticalMetric(props: IVerticalMetricProps) {
    const { x, y, height} = props;
    return (
        <Group x={x} y={y}>
            <Arrow
                points={[METRIC_SIZE / 2, 0, METRIC_SIZE / 2, height]}
                stroke="black"
                fill="black"
                pointerAtBeginning
            />
            <Line points={[0, 0, METRIC_SIZE, 0]} stroke="black" />
            <Line points={[0, height, METRIC_SIZE, height]} stroke="black" />
            <Label x={METRIC_SIZE / 2 - 50} y={height / 2}>
                <Tag fill="white" stroke="black" />
                <Text text={height + " mm"} padding={10} />
            </Label>
        </Group>
    );
}

function HorizontalMetric(props: IHorizontalMetricProps) {
    const { x, y, width} = props;
    return (
        <Group x={x} y={y}>
            <Arrow
                points={[0, METRIC_SIZE / 2, width, METRIC_SIZE / 2]}
                stroke="black"
                fill="black"
                pointerAtBeginning
            />
            <Line points={[0, 0, 0, METRIC_SIZE]} stroke="black" />
            <Line points={[width, 0, width, METRIC_SIZE]} stroke="black" />
            <Label x={width / 2} y={METRIC_SIZE / 2}>
                <Tag fill="white" stroke="black" />
                <Text text={width + " mm"} padding={10} />
            </Label>
        </Group>
    );
}

const Metrics: React.FC = () => {
    const store = useStore("store");
    const { width, height } = store.root;

    const verticalComponents: JSX.Element[]  = [];
    const horizontalComponents: JSX.Element[] = [];

    function processSection(sec: Section, verticalPos: IPos, horizontalPos: IPos) {
        verticalComponents.push(
            <VerticalMetric
                height={sec.height}
                x={verticalPos.x}
                y={verticalPos.y}
            />
        );
        horizontalComponents.push(
            <HorizontalMetric
                x={horizontalPos.x}
                y={horizontalPos.y}
                width={sec.width}
            />
        );

        const isVertical = sec.splitDirection === "vertical";
        const isHorizontal = sec.splitDirection === "horizontal";
        const hasSections = sec.sections.length > 0;

        let childOffset = 0;
        if (isHorizontal) {
            for (const child of sec.sections) {
                if (child instanceof Section)
                processSection(
                    child,
                    {
                        x: verticalPos.x + METRIC_SIZE,
                        y: verticalPos.y + childOffset
                    },
                    horizontalPos
                );
                childOffset += child.height;
            }
        }
        if (isVertical) {
            for (const child of sec.sections) {
                if (child instanceof Section)
                processSection(child, verticalPos, {
                    x: horizontalPos.x + childOffset,
                    y: horizontalPos.y + METRIC_SIZE
                });
                childOffset += child.width;
            }
        }
        if (!isVertical && !isHorizontal && hasSections) {
            if (sec.sections[0] instanceof Section)
            processSection(
                sec.sections[0],
                {
                    x: verticalPos.x + METRIC_SIZE,
                    y: verticalPos.y + sec.frameSize
                },
                {
                    x: horizontalPos.x + sec.frameSize,
                    y: horizontalPos.y + METRIC_SIZE
                }
            );
        }
    }

    processSection(store.root, { x: 0, y: 0 }, { x: 0, y: 0 });

    return (
        <Group>
            <Group x={width}>{verticalComponents}</Group>
            <Group y={height}>{horizontalComponents}</Group>
        </Group>
    );
    
}

export default observer(Metrics);
