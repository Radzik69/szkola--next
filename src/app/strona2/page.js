"use client"    
import { useState } from "react"

export default function Strona2({}) {

    const [startstop,setStartStop] = useState("start")

    const handleClick = () => {
        setStartStop(startstop =="start" ? "stop" : "start")
    }



    return(
        <>
        <button onClick={handleClick}>Zmien Start na Stop i na odwrot</button>
        <h1>{startstop}</h1> 
        </>
        
    )

}