import Image from "next/image";
import NewList from "@/components/nameList";
import Link from "next/link";
import Menu from "@/components/menu";
export default function Home() {

    const lista =[{
            imie:"test1",
        status:true,    
        },
        {
            imie:"test2",
        status:false,    
        },
        {
            imie:"test3",
        status:true,    
        },
    ] 

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <NewList imie="Mateusz Radzikowski" color="text-purple-500" ok/>
            <NewList imie="Jan Kowalski" color="text-blue-500"/>
            <NewList imie="Test 123" color="text-red-500"/>
            {lista.map((osoba,idx)=>
                <NewList key={idx} imie={osoba.imie} ok={osoba.status}></NewList>
            )}
        </div>
    );
}
