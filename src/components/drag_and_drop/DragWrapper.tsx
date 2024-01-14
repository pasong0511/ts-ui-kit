import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDragandDrop } from "./useDrag";

interface IDragWrapperProps {
    dragList: any[];
    /**항목이 드래그 중일 때 호출되는 함수*/
    onDragMove: (newOrder: any[]) => void;
    /**드래그가 종료되었을 때 호출되는 함수*/
    onDragEnd: (newOrder: any[]) => void;
    /** 각 항목을 랜더링하는 함수;*/
    children: (
        item: any,
        ref: React.RefObject<HTMLLIElement>,
        isDragging: boolean
    ) => React.ReactNode;
    /**드래그 섹션 이름(각  드래그리스트는 섹션 이름을 다르게 해야 각 섹션 아이템간 이동이 불가)*/
    dragSectionName: string;
}

export default function DragWrapper({
    dragList,
    onDragMove,
    onDragEnd,
    children,
    dragSectionName,
}: any) {
    const [currentItems, setCurrentItems] = useState(dragList); // 현재 항목의 상태 관리

    const handleItemMove = (
        dragIndex: number,
        hoverIndex: number,
        isFinished: boolean
    ) => {};

    return (
        <DndProvider backend={HTML5Backend}>
            {currentItems.map((item, index) => (
                <DraggableItem
                    key={item.id}
                    dragItem={item}
                    itemIndex={index}
                    onMove={handleItemMove}
                    itemRenderer={children}
                    dragSectionName={dragSectionName}
                />
            ))}
        </DndProvider>
    );
}

// 드래그 가능한 항목 컴포넌트를 정의
const DraggableItem = ({
    dragItem,
    itemIndex,
    onMove,
    itemRenderer,
    dragSectionName,
}: any) => {
    return itemRenderer(dragItem, null, true);
};
