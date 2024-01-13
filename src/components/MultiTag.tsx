import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

export default function MultiTag() {
    const [datas, setdatas] = useState<string[]>([]);
    const [value, setValue] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const setData = () => {
        setdatas((prev) => [...prev, value]);
        setValue("");
    };

    const handleClickLine = () => {
        console.log("클릭");
        setData();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // 여기에 키보드 이벤트에 대한 로직을 작성합니다.
        // 예: Enter 키를 눌렀을 때의 동작
        if (e.key === "Enter") {
            // Enter 키가 눌렸을 때의 로직
            setData();
        }
    };

    const handelDelete = () => {
        //삭제
    };

    return (
        <div className="multitag">
            <div className="multitag-header">
                <div style={{ display: "flex" }}>
                    {datas.map((data) => (
                        <div className="label-remove">
                            <div>{data}</div>
                            <button onClick={handelDelete}>
                                <svg
                                    role="graphics-symbol"
                                    viewBox="0 0 8 8"
                                    className="closeThick"
                                >
                                    <polygon points="8 1.01818182 6.98181818 0 4 2.98181818 1.01818182 0 0 1.01818182 2.98181818 4 0 6.98181818 1.01818182 8 4 5.01818182 6.98181818 8 8 6.98181818 5.01818182 4"></polygon>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
                <input
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="multitag-body">
                <span>옵션 선택 또는 생성</span>
                <div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {datas.map((data) => (
                            <div>
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
                                    <label className="label">{data}</label>
                                    <div className="info-btn">
                                        <button>버튼</button>
                                    </div>
                                </div>
                            </div>
                        ))}
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
