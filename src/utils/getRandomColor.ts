import { colorList } from "../constants/color";

export function getRandomColor(): {
    order: number;
    color: string;
    name: string;
} {
    const randomIndex = Math.floor(Math.random() * colorList.length);
    return colorList[randomIndex];
}
