import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import MultiTagNode from "./MultiTagNode";
import DragWrapper from "../drag_and_drop/DragWrapper";

interface IMultiTagNode {
    id: number;
    label: string;
    color?: string;
}

export default function MultiTag() {
    const [nodes, setNodes] = useState<IMultiTagNode[]>([
        { id: 1, label: "Item 1" },
        { id: 2, label: "Item 2" },
        { id: 3, label: "Item 3" },
    ]);
    const [value, setValue] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const setData = ({
        item,
        items,
        type,
    }: {
        item?: IMultiTagNode;
        items?: IMultiTagNode[];
        type: string;
    }) => {
        switch (type) {
            case "create":
                const newData = {
                    id: Math.max(...nodes.map((data) => data.id)) + 1, // ID를 고유하게 설정
                    label: value, // 'lebel'이 아니라 'label'이어야 함
                };
                setNodes((prev) => [...prev, newData]);
                break;
            case "delete":
                if (items) {
                    setNodes(items);
                }
                break;
        }
        if (inputRef.current) {
            inputRef.current.focus();
        }

        setValue("");
    };

    const handleClickLine = () => {
        console.log("클릭");
        setData({ type: "create" });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // 여기에 키보드 이벤트에 대한 로직을 작성합니다.
        // 예: Enter 키를 눌렀을 때의 동작
        if (e.key === "Enter") {
            // Enter 키가 눌렸을 때의 로직
            setData({ type: "create" });
        }
    };

    const handelDelete = (node: IMultiTagNode) => {
        //삭제
        console.log("삭제", node);
        const { id } = node;
        const filterNodes = nodes.filter((node) => node.id !== id);
        setData({ items: filterNodes, type: "delete" });
    };

    const handleDragMove = (newList: IMultiTagNode[]) => {
        console.log("!드래그중일떄", newList);
    };
    const handleDragEnd = (newList: IMultiTagNode[]) => {
        console.log("@드래그끝났을떄", newList);
    };

    return (
        <div className="multitag">
            <div className="multitag-header">
                <div style={{ display: "flex" }}>
                    {nodes.map((node) => (
                        <MultiTagNode node={node} onDelete={handelDelete} />
                    ))}
                </div>
                <input
                    ref={inputRef}
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="multitag-body">
                <span>옵션 선택 또는 생성</span>
                <div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <DragWrapper
                            dragList={nodes}
                            onDragMove={handleDragMove}
                            onDragEnd={handleDragEnd}
                            dragSectionName={"multi-tag"}
                        >
                            {(dragItem, ref, isDragging) => (
                                <div ref={ref}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div>
                                            <svg
                                                role="graphics-symbol"
                                                viewBox="0 0 10 10"
                                                className="dragHandle"
                                                style={{
                                                    width: "12px",
                                                    height: "12px",
                                                    display: "block",
                                                    fill: "rgba(55, 53, 47, 0.45)",
                                                }}
                                            >
                                                <path d="M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z"></path>
                                            </svg>
                                        </div>
                                        <label className="label">
                                            {dragItem.label}
                                        </label>
                                        <div className="info-btn">
                                            <button>버튼</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </DragWrapper>
                    </div>
                    <div onClick={handleClickLine}>
                        {value && (
                            <>
                                <span>생성</span>
                                <label className="label">{value}</label>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
