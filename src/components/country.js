import Image from "next/image"

export default function Country({kraj}){

    return(
        <div className="border">
            <Image className="h-[150px] w-[150px]" src={kraj.flags.png} width={200} height={100} alt={kraj.name.common}></Image>
            <h1>{kraj.name.common}</h1>
            <h1>{kraj.cca2}</h1>
        </div>
    )

}