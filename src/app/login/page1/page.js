// napis ze tylko dla zalogowanych i trzeba sie zalogowac
"use client";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";

export default function Page1() {
  const router = useRouter();
  const pb = new PocketBase(
    "http://172.16.15.148:8080/"
    // "http://127.0.0.1:8090/"
  );

  pb.authStore.isValid
    ? router.push("/login/page2")
    : console.log("nie zalogowany");

  return (
    <div className="mt-[100px] flex flex-row justify-center">
      USER IS NOT LOGGED IN PLEASE LOG IN
    </div>
  );
}
