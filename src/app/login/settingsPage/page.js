"use client";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Settings() {
  const router = useRouter();
  const pb = new PocketBase(
    "http://172.16.15.148:8080/"
    // "http://127.0.0.1:8090/"
  );

  const [image, setImage] = useState(null);

  pb.authStore.isValid
    ? console.log("zalogowany")
    : router.push("/login/page1");

  const saveProfilePicture = (info) => {
    console.log(info.target.files);
    setImage(info.target.files[0]);
  };

  const changeProfilePicture = async () => {
    const data = {
      avatar: image,
    };

    const record = await pb
      .collection("users")
      .update(pb.authStore.model.id, data);

    router.push("/login/page2");
  };

  return (
    <div>
      <Card className="w-[400px] h-[400px] p-5">
        <Label htmlFor="{profile}">Profile Picture</Label>
        <Input
          type="file"
          id="profile"
          onChange={(e) => {
            saveProfilePicture(e);
          }}
        />

        <Button onClick={changeProfilePicture} className="w-full mt-5">
          Login
        </Button>
      </Card>
    </div>
  );
}
