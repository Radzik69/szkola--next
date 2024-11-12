"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import LoginAvatar from "./loginAvatar";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";

export default function Login() {
  const pb = new PocketBase(
    "http://172.16.15.148:8080/"
    // "http://127.0.0.1:8090/"
  );

  const router = useRouter();
  const functionLogin = () => {
    router.push("/login/loginPage");
  };

  const functionLogout = () => {
    pb.authStore.clear();
    router.push("/login/page1");
  };

  const functionSettings = () => {
    router.push("/login/settingsPage");
  };

  return (
    <div className="w-screen justify-center ">
      <Link href="/login/page1" className="m-[40px]">
        Strona 1
      </Link>
      <Link href="/login/page2">Strona 2</Link>

      <DropdownMenu className="mr-[800px]">
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://thumbs.dreamstime.com/b/login-icon-button-vector-illustration-isolated-white-background-126997728.jpg" />
            <AvatarFallback>Login</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={functionLogin}>Login</DropdownMenuItem>
          <DropdownMenuItem onClick={functionLogout}>Logout</DropdownMenuItem>
          <DropdownMenuItem onClick={functionSettings}>
            Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
