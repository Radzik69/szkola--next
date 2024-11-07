"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";

export default function Page() {
  const pb = new PocketBase("http://172.16.15.148:8080/");
  const router = useRouter();
  const [login, setLogin] = useState(null);
  const [pass, setPass] = useState(null);
  const [username, setUsername] = useState(null);
  const [zdjecie, setZdjecie] = useState(null);
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleZdjecie = (e) => {
    setZdjecie(e.target.files[0]);
  };

  const handleButton = async () => {
    try {
      
      //   formData.append("avatar", zdjecie);

      const data = {
        "username": {username},
        "email": {login},
        "emailVisibility": true,
        "password": {pass},
        "passwordConfirm": {pass},
        "name": "test"
    };

      await pb.collection("users").create(data);
      router.push("./");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div>
      {pb.authStore.isValid ? (
        <p>Jestes Zalogowany</p>
      ) : (
        <div className="w-full h-[40vh] flex justify-center mt-5">
          <Card className="w-[400px] h-[400px] p-5">
            <h1>Login</h1>
            <br></br>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              onChange={(e) => {
                handleUsername(e);
              }}
            />
            <Label htmlFor="pass">Password</Label>
            <Input
              type="password"
              id="pass"
              placeholder="Password"
              onChange={(e) => {
                handlePass(e);
              }}
            />
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              placeholder="Email"
              onChange={(e) => {
                handleLogin(e);
              }}
            />
            <Label htmlFor="zdjecie">Profile Picture</Label>
            <Input
              type="file"
              id="image"
              onChange={(e) => {
                handleZdjecie(e);
              }}
            />

            <Button onClick={handleButton} className="w-full mt-5">
              Login
            </Button>
            {error && <p>Nie udało sie zaloowac</p>}
          </Card>
        </div>
      )}
    </div>
  );
}
