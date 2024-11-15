"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";

export default function Page() {
  const pb = new PocketBase
  ("http://172.16.15.148:8080")
// ("http://1.16.15.148:8080")

  const [data, setData] = useState(null);
  const [msg,setMsg] = useState(null)
  const USER_ID = "8jaost3w1mhsd25"

  useEffect(() => {
    const getData = async () => {
      try {
        const resultList = await pb.collection("chat").getList(1, 50, {
          filter: "",
          sort: "-created",
        });
        setData(resultList.items);
        console.log(resultList);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    pb.collection("chat").subscribe(
      "*",
      function (e) {
        console.log(e.action);
        console.log(e.record);
        if (e.action == "create") {
          setData((pr) => [e.record, ...pr]);
        }
      },
      {
        /* other options like expand, custom headers, etc. */
      }
    );
    return () => {
      pb.collection("chat").unsubscribe();
    };
  }, []);

  const generateClassName = (id) =>{
    const moje = "w-full flex justfy-end";
    const inne = "w-full flex justfy-start";

    if(id==USER_ID){
        return moje
    }else return inne
  }

  const handleInput = (e) =>{
    setMsg(e.target.value)
  }

  const handleSend = async () =>{
    const data = {
        "tresc": msg,
        "user_id": USER_ID
    };
    
    const record = await pb.collection('chat').create(data);
}

  return (
    <div className="flex flex-col items-center justify-center h-screen">

        <Card className="w-[50%]" >
            {data && data.map((wiadomosc)=>(
                <div key={wiadomosc.id} className={generateClassName(wiadomosc.user_id)}>
                    <Badge className="m-1 text-xl" key={wiadomosc.id}>{wiadomosc.tresc}</Badge>
                </div>
            )).reverse()}
        </Card>
        <div className="h-[50%] flex mt-5">
            <Input onChange={(e)=>{
                handleInput(e)
            }}>
            
            </Input>
            <Button onClick={()=>handleSend()}>
                <Send></Send>
            </Button>
        </div>
    </div>
  )
}
