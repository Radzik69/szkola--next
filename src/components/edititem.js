"use client"
import { Button } from "@/components/ui/button"
import PocketBase from 'pocketbase'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { Trigger } from "@radix-ui/react-dialog"

export default function EditItem({gra,onupdate}) {

    const pb = new PocketBase("http://172.16.15.148:8080/")
    const [dane, setDane] = useState({ nazwa: gra.nazwa, opis: gra.opis, cena: gra.cena })

const form = (e, field) => {
    const { value } = e.target;
    setDane((prev) => ({
        ...prev,
        [field]: value,
    }));
    console.log(dane)
}

const update = async () => {
    const formData = new FormData()
    formData.append("nazwa",dane.nazwa)
    formData.append("cena",dane.cena)
    formData.append("opis",dane.opis)
    // formData.append("zdjecie",zdjecie)

    const record = await pb.collection('gry').update(gra.id,formData);

    onupdate(record)
}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
            <Pencil></Pencil>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edytuj Gre</DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <Label htmlFor="nazwa">nazwa</Label>
          <Input defaultValue={gra.nazwa}
          onChange={(e) => form(e, "nazwa")}
        type="text" id="nazwa" placeholder="nazwa"
         />

                    <Label htmlFor="opis">opis</Label>
                    <Input defaultValue={gra.opis} 
                        onChange={(e) => form(e, "opis")}
                        type="text" id="opis" placeholder="opis"
                    />

                    <Label htmlFor="cena">cena</Label>
                    <Input defaultValue={gra.cena}
                        onChange={(e) => form(e, "cena")}
                        type="number" id="cena" placeholder="cena"
                    />

                    {/* <Label htmlFor="zdjecie">zdjecie</Label>
                    <Input defaultValue={gra.zdjecie}
                        onChange={(e) => handlezdjecie(e, "zdjecie")}
                        type="file" id="zdjecie" placeholder="zdjecie"
                    />    */}
        </div>
        <DialogFooter>
        <Trigger asChild>
          <Button onClick={update}>Save changes</Button>
        </Trigger>
        
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

