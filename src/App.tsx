import React from "react";
import "./App.css";
import Calendar from "./components/calendar/Calendar";
import MultiTag from "./components/multi_tag/MultiTag";
import StarRating from "./components/star/StarRating";
import DatePicker from "./components/date_picker/DatePicker";

function App() {
    return (
        <div className="App">
            {/* <MultiTag /> */}
            {/* <StarRating /> */}
            <DatePicker />
        </div>
    );
}

export default App;
