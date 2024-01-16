import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDragandDrop } from "./useDragandDrop";

interface IDragWrapperProps {
    dragList: any[];
    /**항목이 드래그 중일 때 호출되는 함수*/
    onDragMove: (newOrder: any[]) => void;
    /**드래그가 종료되었을 때 호출되는 함수*/
    onDragEnd: (newOrder: any[]) => void;
    /** 각 항목을 랜더링하는 함수;*/
    children: (
        item: any,
        ref: React.RefObject<HTMLDivElement>,
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
}: IDragWrapperProps) {
    const [currentItems, setCurrentItems] = useState(dragList); // 현재 항목의 상태 관리

    /**항목이 이동했을 때 호출되는 함수*/
    const handleItemMove = (
        dragIndex: number,
        hoverIndex: number,
        isFinished: boolean
    ) => {
        const newItems = [...currentItems];
        //선택한 인덱스로 아이템 하나 자르기, splice는 원본 배열을 건든다.
        const [draggedItem] = newItems.splice(dragIndex, 1);
        //선택한 아이템의 위치를 끼워넣어준다.
        newItems.splice(hoverIndex, 0, draggedItem);

        //state 업데이트
        setCurrentItems(newItems);

        newItems.forEach((item, index) => {
            //순서 0번부터 다시 재조정
            item.order = index;
        });

        if (isFinished) {
            onDragEnd(newItems); // 드래그가 종료되었을 때 콜백 함수를 호출.
        } else {
            onDragMove && onDragMove(newItems); // 항목이 드래그 중일 때 콜백 함수를 호출.
        }
    };

    useEffect(() => {
        setCurrentItems(dragList);
    }, [dragList]);

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

interface IDraggableItem {
    dragItem: any;
    itemIndex: number;
    onMove: (
        dragIndex: number,
        hoverIndex: number,
        isFinished: boolean
    ) => void;
    itemRenderer: (item: any, ref: any, isDragging: boolean) => React.ReactNode;
    dragSectionName: string;
}

// 드래그 가능한 항목 컴포넌트를 정의
const DraggableItem: React.FC<IDraggableItem> = ({
    dragItem,
    itemIndex,
    onMove,
    itemRenderer,
    dragSectionName,
}: IDraggableItem) => {
    const { ref, isDragging } = useDragandDrop({
        itemIndex,
        onMove,
        dragSectionName,
    });

    console.log(ref, isDragging);

    //children으로 넘겨준 dom 렌더링
    return <>{itemRenderer(dragItem, ref, isDragging)}</>;
};
