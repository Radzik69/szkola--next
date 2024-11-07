"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PocketBase from "pocketbase";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginAvatar({ loginPrompt }) {
  const pb = new PocketBase("http://172.16.15.148:8080/");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(pb.authStore.model);
  }, []);

  //   const login = async () => {
  //     try {
  //       const authData = await pb
  //         .collection("users")
  //         .authWithPassword("test", "1qaz2wsx");
  //       console.log(authData);
  //       console.log(pb.authStore);
  //       setUser(pb.authStore.model);
  //       loginPrompt(pb.authStore.model);
  //       console.log("login");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const logout = async () => {
    try {
      pb.authStore.clear();
      console.log(pb.authStore);
      setUser(null);
      loginPrompt(null);
      console.log("logout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="">
            <Avatar className="w-28 h-28 ">
              <AvatarImage
                src={pb.files.getUrl(user, user?.avatar)}
                alt="@shadcn"
              />
              <AvatarFallback className="bg-gradient-to-r from-red-500 to-blue-500">
                Account
              </AvatarFallback>
            </Avatar>
            {user ? <p>Zalogowany</p> : <p>Nie Zalogowany</p>}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!user && (
            <>
              <Link href="/pb/newAcc/">
                <DropdownMenuItem>Create New Account</DropdownMenuItem>
              </Link>
              <Link href="/pb/login/">
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
            </>
          )}
          {user && <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
