import { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from "react";
import { IMultiTagItem } from "./MultiTag";
import { EVENT_KEY } from "../../enums/event";
import Select from "./Select";

export interface IColorList {
    order: number;
    color: string;
    name: string;
}

function TagLabelEdit({
    items,
    select,
    onEdit,
    onDelete,
}: {
    items: IColorList[];
    select: IMultiTagItem;
    onEdit?: (item: IMultiTagItem, isLayerOpen?: boolean) => void;
    onDelete: (item: IMultiTagItem) => void;
}) {
    const [value, setValue] = useState(select.label);
    const [colorSelect, setColorSelect] = useState<IColorList>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const setColor = (item) => {
        setColorSelect(item);

        //데이터 업데이트
        const newItem = {
            ...select,
            color: item.color,
        };
        onEdit(newItem, true);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        //인풋에 있는 value값 변경
        setValue(e.target.value);
    };

    const handleBlur = (e: any) => {
        if (e.key === EVENT_KEY.Enter) {
            if (select.label !== value) {
                const newItem = {
                    ...select,
                    label: value,
                };
                onEdit(newItem);
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === EVENT_KEY.Enter) {
            if (select.label !== value) {
                const newItem = {
                    ...select,
                    label: value,
                };
                onEdit(newItem);
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

    useEffect(() => {
        console.log("🥞colorSelect", colorSelect);
    }, [colorSelect]);

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
                <Select items={items} select={select} setItem={setColor} />
            </div>
        </div>
    );
}

export default TagLabelEdit;
