// newAcc/page.js
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";

export default function Page() {
	const pb = new PocketBase("http://127.0.0.1:8090/");
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [username, setUsername] = useState("");
	const [zdjecie, setZdjecie] = useState(null);
	const [error, setError] = useState(false);

	const handleButton = async () => {
		const formData = new FormData();
		formData.append("username", username);
		formData.append("email", email);
		formData.append("password", pass);
		formData.append("passwordConfirm", pass);
		if (zdjecie) formData.append("avatar", zdjecie);

		try {
			await pb.collection("users").create(formData);
			router.push("/pb/login");
		} catch (error) {
			console.log("Error creating account:", error);
			setError(true);
		}
	};

	return (
		<div className="w-full h-[40vh] flex justify-center mt-5">
			<Card className="w-[400px] h-[400px] p-5">
				<h1>Create New Account</h1>
				<Label htmlFor="username">Username</Label>
				<Input
					type="text"
					id="username"
					placeholder="Username"
					onChange={(e) => setUsername(e.target.value)}
				/>

				<Label htmlFor="email">Email</Label>
				<Input
					type="email"
					id="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>

				<Label htmlFor="pass">Password</Label>
				<Input
					type="password"
					id="pass"
					placeholder="Password"
					onChange={(e) => setPass(e.target.value)}
				/>

				<Label htmlFor="zdjecie">Profile Picture</Label>
				<Input
					type="file"
					id="zdjecie"
					onChange={(e) => setZdjecie(e.target.files[0])}
				/>

				<Button onClick={handleButton} className="w-full mt-5">
					Create Account
				</Button>
				{error && (
					<p className="text-red-500 mt-2">
						Failed to create account. Please try again.
					</p>
				)}
			</Card>
		</div>
	);
}
