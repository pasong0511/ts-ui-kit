interface IStarProps {
    level: 0 | 1 | 2;
}

const LEVEL = ["", "star-half-filled", "star-filled"];

const Star = ({ level = 0 }: IStarProps) => {
    return (
        <svg
            width="80"
            height="200"
            viewBox="0 0 25 23"
            className={`star ${LEVEL[level]}`}
        >
            <polygon
                className="star-full"
                points="9.9,0.4 12.5,7.6 20.1,7.6 13.8,12.6 16.5,19.7 9.9,14.7 3.3,19.7 6,12.6 -0.1,7.6 7.5,7.6 "
            />
            {level === 1 && (
                <polygon
                    className="star-half"
                    points="9.9,0.4 12.5,7.6 20.1,7.6 13.8,12.6 16.5,19.7 9.9,14.7 3.3,19.7 6,12.6 -0.1,7.6 7.5,7.6 "
                />
            )}
        </svg>
    );
};

export default Star;
