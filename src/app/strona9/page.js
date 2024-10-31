"use client"

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useState } from "react"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
export default function Strona9(){

    var[licznik,setLicznik] = useState(0)

    const dodaj = ()=>{
        setLicznik(licznik+=1)
    }

    const odejmij = ()=>{
        setLicznik(licznik-=1)
    }

    const settings = ()=>{
        setLicznik(0)
    }

    return(
        <div className="flex justify-center items-center h-screen gap-5 flex-col">
            <HoverCard>
                <HoverCardTrigger>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"></h1>
            </HoverCardTrigger>
            <HoverCardContent>
                {licznik}
            </HoverCardContent>
            </HoverCard>
        <div className="flex gap-5"> 
        <Button onClick={dodaj}>Dodaj 1</Button>
        <Button onClick={odejmij}>Odejmij 1</Button>
        </div>
        <Dialog>
        <DialogTrigger><Button>Settings</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
                Zeruj
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      </div>
    )
}