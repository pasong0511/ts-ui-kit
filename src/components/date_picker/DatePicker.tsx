import { useState } from "react";
import Calendar from "./Calendar";
import ToggleSwitch from "../button/ToggleSwitch";

const DatePicker = () => {
    const [displayToCalendar, setDisplayToCalendar] = useState<boolean>(false);

    const toggleDisplayToCalendar = () => {
        setDisplayToCalendar((prev) => !prev);
    };

    return (
        <div>
            {/* <button onClick={toggleDisplayToCalendar}>todate</button> */}
            <ToggleSwitch />
            <div style={{ display: "flex" }}>
                <Calendar />
                {displayToCalendar && <Calendar />}
            </div>
        </div>
    );
};

export default DatePicker;
