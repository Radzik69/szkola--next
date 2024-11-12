"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const pb = new PocketBase(
    "http://172.16.15.148:8080/"
    // "http://127.0.0.1:8090/"
  );
  const [username, setUsername] = useState(null);
  const [pass, setPass] = useState(null);

  const handleLogin = (info) => {
    setUsername(info.target.value);
  };

  const handlePass = (info) => {
    setPass(info.target.value);
  };

  const functionLogin = async () => {
    const authData = await pb
      .collection("users")
      .authWithPassword(username, pass);

    // after the above you can also access the auth data from the authStore
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.model.id);

    router.push("/login/page2");
  };

  return (
    <div className="mt-[40px] justify-center flex">
      <Card className="w-[400px] h-[400px] p-5">
        <Label htmlFor="Username">Username</Label>
        <Input
          type="text"
          id="Username"
          placeholder="Username"
          onChange={(e) => {
            handleLogin(e);
          }}
        />

        <Label htmlFor="opis">Password</Label>
        <Input
          type="password"
          id="pass"
          placeholder="Password"
          onChange={(e) => {
            handlePass(e);
          }}
        />

        {/* <Label htmlFor="pp">Profile Picture</Label>
<Input type="file" id="pp" /> */}

        <Button onClick={functionLogin} className="w-full mt-5">
          Login
        </Button>
      </Card>
    </div>
  );
}
