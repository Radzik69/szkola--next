"use client"
import { useState,useEffect } from "react"
import Country from "@/components/country"
import Link from "next/link"

export default function Strona6(){

    const [data,setData] = useState(null)
    const [error,setError] = useState(false)
    const [ladowanie,setLadowanie] = useState(true)

    useEffect(()=>{
            const getData = async () =>{
            try{
                const response =await fetch("https://restcountries.com/v3.1/all")
                const dataJson = await response.json()
                setData(dataJson)
                console.log(dataJson)
            }
            catch(error){
                console.error("nie udało sie pobrać danych")
                setError(true)
            }
            finally{
                setLadowanie(false)
            }
        }
        getData()
    },[])

    return(
        <div className="flex flex-wrap gap-2 w-full h-screen justify-center">
            <h1>{ladowanie && "Pobieranie danych"}</h1>
            <h1>{error && "Nie udało sie pobrac danych"}</h1>
            {   
                data &&
                data.map((kraj,idx)=>
                    <Link  key={idx} href={`strona6/${kraj.cca2}`}>
                    <Country kraj={kraj}></Country>
                    </Link>
                )
            }
            
        </div>
    )

}