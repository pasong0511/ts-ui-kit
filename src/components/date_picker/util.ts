export const getToday = () => {
    const date = new Date();
    return {
        full:
            String(date.getFullYear()) +
            String(date.getMonth() + 1).padStart(2, "0") +
            String(date.getDate()).padStart(2, "0"),
        year: Number(date.getFullYear()),
        month: Number(date.getMonth() + 1),
        day: Number(date.getDate()),
    };
};
