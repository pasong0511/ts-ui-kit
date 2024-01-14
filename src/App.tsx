import React, { useState, ForwardedRef } from "react";
import { DnDWrapper } from "./components/drag/DnDWrapper";
import DragWrapper from "./components/drag_and_drop/DragWrapper";

export interface TestDnDItem {
    id: string;
    label: string;
}

const DnDExamplePage = () => {
    const [initialItems, _] = useState<TestDnDItem[]>([
        {
            id: "1~",
            label: "DnD 예시아이템1",
        },
        {
            id: "2~",
            label: "DnD 예시아이템2",
        },
        {
            id: "3~",
            label: "DnD 예시아이템3",
        },
        {
            id: "4~",
            label: "DnD 예시아이템4",
        },
        {
            id: "5~",
            label: "DnD 예시아이템5",
        },
    ]);
    const handleDragMove = (newList: TestDnDItem[]) => {
        console.log("!드래그중일떄", newList);
    };
    const handleDragEnd = (newList: TestDnDItem[]) => {
        console.log("@드래그끝났을떄", newList);
    };

    return (
        <>
            <div className="">
                <div className="">
                    <DragWrapper
                        dragList={initialItems}
                        onDragMove={handleDragMove}
                        onDragEnd={handleDragEnd}
                        dragSectionName={"multi-tag"}
                    >
                        {(dragItem, ref, isDragging) => (
                            <div ref={ref}>
                                <div> {dragItem.label}</div>
                            </div>
                        )}
                    </DragWrapper>
                </div>
            </div>
        </>
    );
};

export default DnDExamplePage;
