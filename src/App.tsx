import React from "react";
import "./App.css";
import Calendar from "./components/calendar/Calendar";
import MultiTag from "./components/multi_tag/MultiTag";

function App() {
    return (
        <div className="App">
            {/* <Calendar useHoliday={true} /> */}
            <MultiTag />
        </div>
    );
}

export default App;
