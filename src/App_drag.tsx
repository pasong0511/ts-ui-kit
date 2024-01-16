import React, { useState, ForwardedRef } from "react";
import { DnDWrapper } from "./components/drag/DnDWrapper";

export interface TestDnDItem {
    id: string;
    text: string;
}

const DnDExamplePage = () => {
    const [initialItems, _] = useState<TestDnDItem[]>([
        {
            id: "1~",
            text: "DnD 예시아이템1",
        },
        {
            id: "2~",
            text: "DnD 예시아이템2",
        },
        {
            id: "3~",
            text: "DnD 예시아이템3",
        },
        {
            id: "4~",
            text: "DnD 예시아이템4",
        },
        {
            id: "5~",
            text: "DnD 예시아이템5",
        },
    ]);
    const whenDragging = (newList: TestDnDItem[]) => {
        console.log("!드래그중일떄", newList);
    };
    const whenDragEnd = (newList: TestDnDItem[]) => {
        console.log("@드래그끝났을떄", newList);
    };

    return (
        <>
            <div className="flex justify-around">
                <div className="border border-gray-950 mb-10">
                    <DnDWrapper
                        dragList={initialItems}
                        onDragging={whenDragging}
                        onDragEnd={whenDragEnd}
                        dragSectionName={"abc"}
                    >
                        {(dragItem, ref, isDragging) => (
                            <div
                                ref={ref}
                                className={`p-2 border border-blue-700 m-2 ${
                                    isDragging ? "opacity-20" : ""
                                }`}
                            >
                                <p>{dragItem.text}</p>
                            </div>
                        )}
                    </DnDWrapper>
                </div>
                {/* <div className="border border-gray-950">
                    <DnDWrapper
                        dragList={initialItems}
                        onDragging={whenDragging}
                        onDragEnd={whenDragEnd}
                        dragSectionName={"def"}
                    >
                        {(dragItem, ref, isDragging) => (
                            <DnDTestComponent
                                dragData={dragItem}
                                ref={ref}
                                isDragging={isDragging}
                                zxzx="다른프롭스내려봄"
                                yzyz="또다른프롭스내려봄"
                            />
                        )}
                    </DnDWrapper>
                </div> */}
            </div>
        </>
    );
};

export default DnDExamplePage;

interface DnDTestComponentProps {
    dragData: TestDnDItem;
    isDragging: boolean;
    zxzx: string;
    yzyz: string;
}

const DnDTestComponent = React.forwardRef(
    (
        { dragData, isDragging, zxzx, yzyz }: DnDTestComponentProps,
        // { dragData, isDragging, ...props }: DnDTestComponentProps,
        ref: ForwardedRef<HTMLLIElement>
    ) => (
        <li
            ref={ref}
            className={`p-2 border border-red m-2 ${
                isDragging ? "opacity-20" : ""
            }`}
        >
            <p>{dragData.id}</p>
            <div>{yzyz}</div>
            {/* <div>{props.zxzx}</div> */}
        </li>
    )
);
