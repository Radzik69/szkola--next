"use client"
import { useState } from "react"

export default function Strona3() {
    var [changeBackground, setChangeBackground] = useState("bg-red-500");

    const handleClick = () => {
        setChangeBackground(changeBackground = `bg-${document.getElementById("input").value}-500`)
    };

    return (
        <div className={`h-screen w-full ${changeBackground}`}>
            <input className="flex flex-col justify-center items-center h-screen" onChange={handleClick} type="text" id="input" placeholder="WPISZ KOLOR"></input>
        </div>
    );
}
