import { useState } from "react";
import Calendar from "./Calendar";

const DatePicker = () => {
    const [displayToCalendar, setDisplayToCalendar] = useState<boolean>(false);

    const toggleDisplayToCalendar = () => {
        setDisplayToCalendar((prev) => !prev);
    };

    return (
        <div>
            <button onClick={toggleDisplayToCalendar}>todate</button>
            <div style={{ display: "flex" }}>
                <Calendar />
                {displayToCalendar && <Calendar />}
            </div>
        </div>
    );
};

export default DatePicker;
