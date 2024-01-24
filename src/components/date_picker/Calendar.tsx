import classnames from "classnames";
import { useEffect, useState } from "react";
import { WEEK_LIST_KR } from "../../constants/calendarConstants";
import { IInfomationViewDate, IHolidayDic, IViewDate } from "../../types/date";
import { fetchHolidyDate } from "../../utils/api";
import { getCreateDateList } from "../../utils/createDate";
import { Week } from "../../enums/dateEnums";
import { getToday } from "./util";

interface ICalendar {
    name: string;
    onClickDay: (name: string, item: IViewDate) => void;
}

export default function Calendar({ name, onClickDay }: ICalendar) {
    const date = new Date();
    const _today = getToday();

    const [viewDate, setViewData] = useState<IInfomationViewDate[]>([]);

    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth() + 1);
    const [today, setToday] = useState(_today.full);

    /**이전달(왼쪽)으로 이동하기*/
    const onClickPrev = () => {
        if (month > 1) {
            setMonth((prev) => prev - 1);
        } else {
            setYear((prev) => prev - 1);
            setMonth(12);
        }
    };

    /**다음달(오른쪽)으로 이동하기*/
    const onClickNext = () => {
        if (month >= 12) {
            setYear((prev) => prev + 1);
            setMonth(1);
        } else {
            setMonth((prev) => prev + 1);
        }
    };

    const handleClickDay = (item: IViewDate) => {
        onClickDay(name, item);
    };

    useEffect(() => {
        const dateList = getCreateDateList(year, month - 1, today); //계산돌릴때는 날자가 인덱스 0부터 시작해서 -1 해줘야함
        setViewData(dateList);
    }, [year, month, today]);

    if (!viewDate) {
        return <></>;
    }

    return (
        <div className="calendar">
            <div className="calendar-header">
                <div>
                    <span>{year}년</span>
                    <span>{month}월</span>
                </div>
                <div>
                    <button
                        onClick={onClickPrev}
                        className="button_reset nav_button previous-month"
                    >
                        <svg
                            width="16px"
                            height="16px"
                            viewBox="0 0 120 120"
                            className="rdp-nav_icon"
                        >
                            <path
                                d="M49.8040405,3.34314575 C46.6798462,0.218951416 41.6145263,0.218951416 38.490332,3.34314575 C35.4326099,6.40086786 35.367552,11.3179931 38.2951583,14.4548388 L38.490332,14.6568542 L83.8333725,60 L38.490332,105.343146 C35.4326099,108.400868 35.367552,113.317993 38.2951583,116.454839 L38.490332,116.656854 C41.5480541,119.714576 46.4651794,119.779634 49.602025,116.852028 L49.8040405,116.656854 L100.804041,65.6568542 C103.861763,62.5991321 103.926821,57.6820069 100.999214,54.5451612 L100.804041,54.3431458 L49.8040405,3.34314575 Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </button>
                    <button
                        onClick={onClickNext}
                        className="button_reset nav_button next-month"
                    >
                        <svg
                            width="16px"
                            height="16px"
                            viewBox="0 0 120 120"
                            className="rdp-nav_icon"
                        >
                            <path
                                d="M49.8040405,3.34314575 C46.6798462,0.218951416 41.6145263,0.218951416 38.490332,3.34314575 C35.4326099,6.40086786 35.367552,11.3179931 38.2951583,14.4548388 L38.490332,14.6568542 L83.8333725,60 L38.490332,105.343146 C35.4326099,108.400868 35.367552,113.317993 38.2951583,116.454839 L38.490332,116.656854 C41.5480541,119.714576 46.4651794,119.779634 49.602025,116.852028 L49.8040405,116.656854 L100.804041,65.6568542 C103.861763,62.5991321 103.926821,57.6820069 100.999214,54.5451612 L100.804041,54.3431458 L49.8040405,3.34314575 Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="calendar-body">
                <div className="calendar-week">
                    {WEEK_LIST_KR.map((week) => (
                        <div key={week}>{week}</div>
                    ))}
                </div>
                <div className="calendar-grid">
                    {viewDate.map((item) => (
                        <div
                            onClick={() => handleClickDay(item)}
                            key={item.full}
                            className={classnames("day", {
                                thisMonth: item.thisMonth,
                                "not-thisMonth": !item.thisMonth,
                                sunday:
                                    item.thisMonth && item.week === Week.SUN,
                                saturday:
                                    item.thisMonth && item.week === Week.SAT,
                            })}
                        >
                            <div className="grid-cell-header">
                                <p>{item.day}</p>
                                <p>{item.holiday_name}</p>
                                <p
                                    className={classnames("", {
                                        "today-mark": item.today,
                                    })}
                                ></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
