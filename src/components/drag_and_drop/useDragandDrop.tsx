import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface IUseDragandDropProps {
    itemIndex: number;
    onMove: (
        dragIndex: number,
        hoverIndex: number,
        isFinished: boolean
    ) => void;
    dragSectionName: string;
}

interface DraggedItem {
    type: string;
    draggingItemCurrentIndex: number;
}

export const useDragandDrop = ({
    itemIndex,
    onMove,
    dragSectionName,
}: IUseDragandDropProps) => {
    const ref = useRef<HTMLLIElement>(null);

    /**드래그 기능*/
    const [{ isDragging }, drag] = useDrag({
        type: dragSectionName,
        item: { type: dragSectionName, draggingItemCurrentIndex: itemIndex },
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
        end: (draggedItem: DraggedItem, monitor) => {
            // 드래그 동작이 종료되었을 때의 동작 설정 (가장마지막동작,useDrop보다늦게동작)
            const didDrop = monitor.didDrop();
            if (!didDrop && ref.current) {
                onMove(draggedItem.draggingItemCurrentIndex, itemIndex, true);
            }
        },
    });

    /**드롭 기능*/
    const [, drop] = useDrop({
        accept: dragSectionName,
        hover: (draggingItem: DraggedItem, monitor) => {
            // 현재 드래그 중인 항목이나 대상 항목이 유효하지 않을 경우 반환
            if (
                !ref.current ||
                draggingItem.draggingItemCurrentIndex === itemIndex
            ) {
                return;
            }

            // 현재 항목의 위치와 크기 정보를 가져옴
            const hoverBoundingRect = ref.current.getBoundingClientRect();

            // 드래그 중인 항목의 현재 위치를 가져옴
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) return;

            // 드래그 중인 항목의 위치와 크기 계산
            const draggedItemRect = {
                left: clientOffset.x,
                right: clientOffset.x + hoverBoundingRect.width,
                top: clientOffset.y,
                bottom: clientOffset.y + hoverBoundingRect.height,
            };

            // 두 항목이 겹치는 영역을 계산
            const overlapX = Math.max(
                0,
                Math.min(hoverBoundingRect.right, draggedItemRect.right) -
                    Math.max(hoverBoundingRect.left, draggedItemRect.left)
            );
            const overlapY = Math.max(
                0,
                Math.min(hoverBoundingRect.bottom, draggedItemRect.bottom) -
                    Math.max(hoverBoundingRect.top, draggedItemRect.top)
            );

            // 겹치는 영역의 면적 계산 후, 해당 면적이 전체 면적의 10%를 초과하면 위치 변경
            const overlapArea = overlapX * overlapY;
            const hoverArea =
                hoverBoundingRect.width * hoverBoundingRect.height;
            const thresholdArea = hoverArea * 0.1;

            if (overlapArea > thresholdArea) {
                onMove(draggingItem.draggingItemCurrentIndex, itemIndex, false);
                draggingItem.draggingItemCurrentIndex = itemIndex;
            }
        },
        drop: (draggedItem: DraggedItem) => {
            // 항목이 다른 항목 위에 드롭되었을 때 동작 설정
            return onMove(
                draggedItem.draggingItemCurrentIndex,
                itemIndex,
                true
            );
        },
    });

    // drag와 drop을 합쳐 해당 요소에 연결
    drag(drop(ref));

    return {
        ref,
        isDragging,
    };
};

//https://react-dnd.github.io/react-dnd/docs/api/use-drag
