"use client"
import { useState } from "react"

export default function Strona3() {
    const [changeBackground, setChangeBackground] = useState("bg-red-500");

    const handleClick = () => {
        setChangeBackground(changeBackground == "bg-red-500" ? "bg-blue-500" : "bg-red-500");
    };

    return (
        <div className={`h-screen w-full ${changeBackground}`}>
            <button onClick={handleClick}>ZMIEN KOLOR TLA</button>
        </div>
    );
}
