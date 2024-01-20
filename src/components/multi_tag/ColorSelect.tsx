import { IMultiTagItem } from "./MultiTag";
import { IColorList } from "./TagLabelEdit";

interface IColorSelectProps {
    items: IColorList[];
    select: IMultiTagItem;
    setItem: (item: IColorList) => void;
}

export default function ColorSelect({
    items,
    select,
    setItem,
}: IColorSelectProps) {
    const handleClick = (item: IColorList) => {
        setItem(item);
    };
    return (
        <>
            {items.map((item) => (
                <div
                    key={item.color}
                    style={{
                        display: "flex",
                    }}
                    onClick={() => handleClick(item)}
                >
                    <div
                        className="color-box"
                        style={{ background: `#${item.color}` }}
                    ></div>
                    <div>{item.name}</div>
                    {item.color === select.color && (
                        //체크버튼
                        <svg
                            role="graphics-symbol"
                            viewBox="0 0 16 16"
                            style={{
                                width: "12px",
                                height: "12px",
                            }}
                        >
                            <path d="M6.385 14.162c.362 0 .642-.15.84-.444L13.652 3.71c.144-.226.205-.417.205-.602 0-.485-.341-.82-.833-.82-.335 0-.54.123-.746.444l-5.926 9.4-3.042-3.903c-.205-.267-.417-.376-.718-.376-.492 0-.848.348-.848.827 0 .212.075.417.253.629l3.541 4.416c.24.3.492.437.848.437z"></path>
                        </svg>
                    )}
                </div>
            ))}
        </>
    );
}
