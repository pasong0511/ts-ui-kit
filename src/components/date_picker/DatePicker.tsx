import { useState } from "react";
import Calendar from "./Calendar";
import ToggleSwitch from "../button/ToggleSwitch";
import { IViewDate } from "../../types/date";
import { getToday } from "./util";

const DatePicker = () => {
    const _today = getToday();

    const [displayToCalendar, setDisplayToCalendar] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<IViewDate>({
        full: _today.full,
        year: _today.year,
        month: _today.month,
        day: _today.day,
        week: null,
        week_kr: null,
        thisMonth: null,
        today: null,
    });
    const [endDate, setEndDate] = useState<IViewDate>({
        full: _today.full,
        year: _today.year,
        month: _today.month,
        day: _today.day,
        week: null,
        week_kr: null,
        thisMonth: null,
        today: null,
    });

    const handleToggleDisplayToCalendar = () => {
        setDisplayToCalendar((prev) => !prev);
    };

    const handleStartDateClick = (item: IViewDate) => {
        console.log("스타트 데이트 클릭", item);
        setStartDate(item);
    };

    const handleEndDateClick = (item: IViewDate) => {
        console.log("엔드 데이트 클릭", item);
        setEndDate(item);
    };

    const handleClickDay = (name: string, item: IViewDate) => {
        if (name === "startDate") {
            handleStartDateClick(item);
        } else {
            handleEndDateClick(item);
        }
    };

    const handleChangeStart = (e) => {
        const value = e.target.value;

        const parts = value.split(".");
        if (parts.length === 3) {
            const [year, month, day] = parts.map((part) => parseInt(part, 10));
            if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
                // 입력값이 유효한 경우, startDate 상태 업데이트
                setStartDate((prevState) => ({
                    ...prevState,
                    year: year,
                    month: month,
                    day: day,
                }));
            }
        }
    };

    const handleChangeEnd = (e) => {
        const value = e.target.value;

        const parts = value.split(".");
        if (parts.length === 3) {
            const [year, month, day] = parts.map((part) => parseInt(part, 10));
            if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
                // 입력값이 유효한 경우, startDate 상태 업데이트
                setEndDate((prevState) => ({
                    ...prevState,
                    year: year,
                    month: month,
                    day: day,
                }));
            }
        }
    };

    return (
        <div>
            <ToggleSwitch onClick={handleToggleDisplayToCalendar} />
            <div style={{ display: "flex" }}>
                <div>
                    <input
                        value={
                            startDate
                                ? `${startDate.year}.${startDate.month}.${startDate.day}`
                                : ""
                        }
                        onChange={handleChangeStart}
                    />
                    <Calendar name={"startDate"} onClickDay={handleClickDay} />
                </div>
                {displayToCalendar && (
                    <div>
                        <input
                            value={
                                endDate
                                    ? `${endDate.year}.${endDate.month}.${endDate.day}`
                                    : ""
                            }
                            onChange={handleChangeEnd}
                        />
                        <Calendar
                            name={"endDate"}
                            onClickDay={handleClickDay}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DatePicker;
