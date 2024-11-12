// cala strona tu jest

"use client";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Page1() {
  const router = useRouter();
  const pb = new PocketBase(
    "http://172.16.15.148:8080/"
    // "http://127.0.0.1:8090/"
  );

  const [data, setData] = useState(null);

  pb.authStore.isValid
    ? console.log("zalogowany")
    : router.push("/login/page1");

  useEffect(() => {
    const getData = async () => {
      try {
        const records = await pb
          .collection("gry")
          .getFullList({ sort: "-created" });
        setData(records);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center">
        {data &&
          data.map((gra, idx) => (
            <Card key={idx} className="w-[35vh] h-[55vh] flex flex-col mb-10">
              <CardHeader>
                <CardTitle>{gra.nazwa}</CardTitle>
                <CardDescription className="text-justify">
                  {gra.opis}
                </CardDescription>
              </CardHeader>
              <CardContent>
                cena: {gra.cena} zł
                <Image
                  src={pb.files.getUrl(gra, gra.zdjecie)}
                  alt={gra.nazwa}
                  width={250}
                  height={0}
                />
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
