import React from "react";
import "./App.css";
import Calendar from "./components/calendar/Calendar";
import MultiTag from "./components/multi_tag/MultiTag";
import StarRating from "./components/star/StarRating";

function App() {
    return (
        <div className="App">
            {/* <Calendar useHoliday={true} /> */}
            {/* <MultiTag /> */}
            <StarRating />
        </div>
    );
}

export default App;
