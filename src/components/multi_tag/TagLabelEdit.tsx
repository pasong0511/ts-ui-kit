import { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from "react";
import { IMultiTagItem } from "./MultiTag";

export interface IColorList {
    order: number;
    color: string;
    name: string;
}

function TagLabelEdit({
    items,
    select,
    onChange,
    onDelete,
}: {
    items: IColorList[];
    select: IMultiTagItem;
    onChange?: (item: any) => void;
    onDelete: (item: any) => void;
}) {
    const [value, setValue] = useState(select.label);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        //인풋에 있는 value값 변경
        setValue(e.target.value);
    };

    const handleBlur = (e: any) => {
        if (e.key === "Enter") {
            if (select.label !== value) {
                const newItem = {
                    ...select,
                    label: value,
                };
                onChange(newItem);
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (select.label !== value) {
                const newItem = {
                    ...select,
                    label: value,
                };
                onChange(newItem);
            }
        }
    };

    const handleDelete = () => {
        onDelete(select);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            //글자 선택
            inputRef.current.setSelectionRange(0, select.label.length);
        }
    }, []);

    return (
        <div style={{ width: "220" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                    value={value}
                    onChange={handleChange}
                    ref={inputRef}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleDelete}>삭제</button>
            </div>
            <div>
                <div>색</div>

                {items.map((item) => (
                    <div
                        key={item.color}
                        style={{
                            display: "flex",
                        }}
                    >
                        <div
                            className="color-box"
                            style={{ background: `#${item.color}` }}
                        ></div>
                        <div>{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TagLabelEdit;
