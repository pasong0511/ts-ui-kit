import { useRef, useState } from "react";
import Star from "./Star";

import "./StarRating.css";

const StarRating = () => {
    const [rating, setRating] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const starContainerRef = useRef<HTMLDivElement>(null);
    const starWrapperSize = 400;
    const startCount = 5;
    const starWidth = starWrapperSize / startCount; // 한 별의 너비

    const calculateRating = (e) => {
        const { left } = starContainerRef.current.getBoundingClientRect();
        const starIndex = Math.floor((e.pageX - left) / starWidth); //별 인덱스
        const starOffset = (e.pageX - left) % starWidth; //별 왼쪽 끝부터 별의 오른쪽 마진끝까지 위치
        const isOverHalf = starOffset > starWidth / 2; //반절보다 오른쪽 선택했는가

        if (!starIndex && starOffset < starWidth / 4) {
            return 0;
        }
        return starIndex + (isOverHalf ? 1 : 0.5);
    };

    const handleMouseMove = (e) => {
        console.log(e.buttons);
        if (e.buttons === 0) {
            setIsDragging(false);
            return;
        }
        if (isDragging) {
            const newRating = calculateRating(e);
            setRating(newRating);
        }
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        const newRating = calculateRating(e);
        setRating(newRating);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            ref={starContainerRef}
            className="star-container"
            style={{ width: `${starWrapperSize}px` }}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {[...Array(startCount)].map((_, i) => {
                const isCheck = rating > i;
                const isHalf = rating - i < 1;
                const level = isCheck ? (isHalf ? 1 : 2) : 0;
                console.log(`${i} > ${isHalf}`);
                return <Star key={i} level={level} />;
            })}
        </div>
    );
};

export default StarRating;
