"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import PocketBase from 'pocketbase'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import  EditItem  from '@/components/edititem'

export default function Page(){

    const pb = new PocketBase("http://172.16.15.148:8080/")
    const [data, setData] = useState([])
    const [dane, setDane] = useState({ nazwa: null, opis: null, cena: null })
    const [zdjecie,setZdjecie] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const records = await pb.collection('gry').getFullList({
                    sort: '-created',
                });
                console.log(records)
                setData(records)
            }
            catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    const form = (e, field) => {
        const { value } = e.target;
        setDane((prev) => ({
            ...prev,
            [field]: value,
        }));
        console.log(dane)
    }

    const handlezdjecie = (e) =>{
        console.log(e)
        setZdjecie(e.target.files[0])
    }

    const zapisz = async () => {
        const formData = new FormData()
        formData.append("nazwa",dane.nazwa)
        formData.append("cena",dane.cena)
        formData.append("opis",dane.opis)
        formData.append("zdjecie",zdjecie)

        const record = await pb.collection('gry').create(formData);
        setData((prevData)=>{
            return(
                [record, ...prevData]
            )
        })
    }

    const delItem = async (id) =>{
        try{
            await pb.collection('gry').delete(id);

            setData((prev)=>(
                prev.filter((item)=>{
                    return(
                        item.id!=id
                    )
        })))
        }
        catch(error){
            console.log(error)
        }
    }


    const updateItem = (item) => {
        console.log(item)

        var tmpData = [...data]
        var index = null

        for(let i in data){
            if(item.id==tmpData[i].id){
                index = i
            }
        }
        tmpData[index] = item
        setData(tmpData)

        console.log("index " + index)
    }

    // function addToDb(){
    //     const nazwa = document.getElementById("nazwa").value
    //     const opis = document.getElementById("opis").value
    //     const cena = document.getElementById("cena").value
    //     // const zdjecie = document.getElementById("zdjecie").value

    //     parseInt(cena)
    //     // writeString(zdjecie)

    //     const dataToSend = {
    //         "nazwa" : nazwa,
    //         "opis" : opis,
    //         "cena" : cena,
    //         // "zdjecie" : zdjecie,
    //     }
    //     const finalData = pb.collection('gry').create(dataToSend);
    //        }

    return (
        <div className="flex flex-wrap gap-4 justify-center">
            {data && data.map((gra, idx) => (
                <Card key={idx} className="w-[35vh] h-[45vh] flex flex-col mb-10">
                    <CardHeader>
                        <CardTitle>{gra.nazwa}</CardTitle>
                        <CardDescription className="text-justify">{gra.opis}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        cena: {gra.cena} zł
                        <Image src={pb.files.getUrl(gra, gra.zdjecie)} alt={gra.nazwa} width={250} height={0} />
                    </CardContent>
                    <CardFooter>
                        <div className='w-full flex justify-end'>
                            <EditItem  gra={gra} onupdate={updateItem}>
                                
                            </EditItem>

                            <Button onClick={() => {delItem(gra.id)}} variant="ghost">
                                <Trash2></Trash2>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            ))}

            <div className='w-full h-[40vh] flex justify-center mt-5'>
                <Card className="w-[400px] h-[100vh] p-5">
                    <Label htmlFor="nazwa">nazwa</Label>
                    <Input 
                        onChange={(e) => form(e, "nazwa")}
                        type="text" id="nazwa" placeholder="nazwa"
                    />

                    <Label htmlFor="opis">opis</Label>
                    <Input 
                        onChange={(e) => form(e, "opis")}
                        type="text" id="opis" placeholder="opis"
                    />

                    <Label htmlFor="cena">cena</Label>
                    <Input 
                        onChange={(e) => form(e, "cena")}
                        type="number" id="cena" placeholder="cena"
                    />

                    <Label htmlFor="zdjecie">zdjecie</Label>
                    <Input 
                        onChange={(e) => handlezdjecie(e, "zdjecie")}
                        type="file" id="zdjecie" placeholder="zdjecie"
                    />
                    <Button onClick={zapisz} className="w-full mt-5">SEND</Button>
                </Card>
            </div>
        </div>
    );
}
