import React from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import MultiTag from "./components/MultiTag";

function App() {
    return (
        <div className="App">
            {/* <Calendar useHoliday={true} /> */}
            <MultiTag />
        </div>
    );
}

export default App;
