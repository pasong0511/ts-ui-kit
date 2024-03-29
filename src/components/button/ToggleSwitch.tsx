import { useState } from "react";
import "./ToggleSwitch.css"; //

const ToggleSwitch = ({ onClick }) => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        onClick();
        setIsToggled(!isToggled);
    };

    return (
        <div className="toggle-switch">
            <input
                type="checkbox"
                id="switch"
                checked={isToggled}
                onChange={handleToggle}
            />
            <label htmlFor="switch" className="switch-label">
                <span className={`slider ${isToggled ? "on" : "off"}`}></span>
            </label>
        </div>
    );
};

export default ToggleSwitch;
