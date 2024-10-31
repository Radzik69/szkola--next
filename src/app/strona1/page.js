"use client"    
import { useState } from "react"

export default function Strona1({}) {

    const [licznik,setLicznik] = useState(1)

    const handleClickPlus = () => {
        setLicznik(licznik+1)
    }

    const handleClickMinus = () => {
        setLicznik(licznik-1)
    }

    return(
        <>
        <button onClick={handleClickPlus}>Dodaj 1</button>
        <br></br>
        <button onClick={handleClickMinus}>Odejmij 1</button>
        <h1>{licznik}</h1> 
        </>
        
    )

}