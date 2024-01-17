import React, {
    ChangeEvent,
    KeyboardEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import MultiTagLabel, { TAG_LABEL_TYPE } from "./MultiTagLabel";
import DragWrapper from "../drag_and_drop/DragWrapper";

import { colorList } from "../../constants/color";
import LayerWrapper from "../layer/LayerWrapper";

import TagLabelEdit from "./TagLabelEdit";
import { getRandomColor } from "../../utils/getRandomColor";

export interface IMultiTagItem {
    id: number;
    label: string;
    color: string;
}

export default function MultiTag() {
    const [datas, setDatas] = useState<IMultiTagItem[]>([
        { id: 1, label: "Item 1", color: "E3E2E0" },
        { id: 2, label: "Item 2", color: "E3E2E0" },
        { id: 3, label: "Item 3", color: "E3E2E0" },
    ]);
    const [value, setValue] = useState("");
    const [select, setSelect] = useState<IMultiTagItem>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    let layerRef: React.RefObject<any> = React.createRef();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const setData = ({
        item,
        items,
        type,
    }: {
        item?: IMultiTagItem;
        items?: IMultiTagItem[];
        type: string;
    }) => {
        switch (type) {
            case "create":
                const color = getRandomColor().color;
                const newDatas = {
                    id: Math.max(...datas.map((data) => data.id)) + 1,
                    label: value,
                    color: color,
                };
                setDatas((prev) => [...prev, newDatas]);
                break;
            case "delete":
                if (items) {
                    setDatas(items);
                }
                break;
            case "update":
                if (items) {
                    setDatas(items);
                }
                break;
        }
        if (inputRef.current) {
            inputRef.current.focus();
        }

        setValue("");
    };

    const handleClickLine = () => {
        setData({ type: "create" });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setData({ type: "create" });
            return;
        }
        if (e.key === "Backspace") {
            handleBackspace(e);
            return;
        }
    };

    const handelDelete = (node: IMultiTagItem) => {
        const { id } = node;
        const filterItems = datas.filter((node) => node.id !== id);
        setData({ items: filterItems, type: "delete" });
    };

    const handelDeleteTail = () => {
        const newArray = datas.slice(0, -1);
        setData({ items: newArray, type: "delete" });
    };

    const handelEdit = (item) => {
        const updateItem = datas.map((data) => {
            if (data.id === item.id) {
                return {
                    ...item,
                    label: item.label,
                };
            }
            return data;
        });
        setData({ items: updateItem, type: "update" });
        layerRef.current?.closeLayer();
    };

    const handleBackspace = (e) => {
        const { selectionStart, selectionEnd, value } = e.nativeEvent.target;
        const isDraged = selectionStart !== selectionEnd;

        if (isDraged) {
            return;
        }

        if (selectionStart === 0) {
            handelDeleteTail();
        }
    };

    const handleEditButton = (item) => {
        if (item) {
            setSelect(item);
        }
        layerRef.current?.openLayer();
    };

    const handleModalClose = () => {
        setSelect(null);
    };

    const handleDragMove = (newList: IMultiTagItem[]) => {
        //console.log("드래그 중", newList);
    };
    const handleDragEnd = (newList: IMultiTagItem[]) => {
        //console.log("드래그 종료", newList);
    };

    return (
        <>
            <div className="multitag">
                <div className="multitag-header">
                    <div style={{ display: "flex" }}>
                        {datas.map((node) => (
                            <MultiTagLabel
                                node={node}
                                onDelete={handelDelete}
                                type={TAG_LABEL_TYPE.DELETE}
                            />
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
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <DragWrapper
                                dragList={datas}
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
                                            <MultiTagLabel node={dragItem} />
                                            <div className="info-btn">
                                                <button
                                                    onClick={() =>
                                                        handleEditButton(
                                                            dragItem
                                                        )
                                                    }
                                                >
                                                    버튼
                                                </button>
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
            <LayerWrapper ref={layerRef} onClose={handleModalClose}>
                <TagLabelEdit
                    items={colorList}
                    select={select}
                    onChange={handelEdit}
                    onDelete={handelDelete}
                />
            </LayerWrapper>
        </>
    );
}
