"use client";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Pencil, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";

export default function GamesKopia() {
	const pb = new PocketBase("http://127.0.0.1:8090");
	const [data, setData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await pb.collection("gry").getFullList({
					sort: "-created",
				});
				console.log(response);
				setData(response);
			} catch (error) {
				console.log(error);
			}
		};
		getData();
	}, []);

	return (
		<div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
			<h1 className="text-4xl font-bold mb-8 text-gray-800">Lista Gier</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
				{data &&
					data.map((gra, idx) => (
						<Card
							key={idx}
							className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
						>
							<CardHeader className="bg-gray-200 p-4">
								<CardTitle className="text-xl font-semibold text-gray-800">
									{gra.nazwa}
								</CardTitle>
							</CardHeader>
							<CardContent className="p-4">
								<p className="text-gray-600">
									Cena: <span className="font-bold">{gra.cena} zł</span>
								</p>
								<p className="text-gray-600">{gra.opis}</p>
								<Image
									src={pb.files.getUrl(gra, gra.zdjecie)}
									alt={gra.nazwa}
									width={150}
									height={100}
									className="rounded-md mt-4"
								/>
							</CardContent>
							<CardFooter className="flex justify-between items-center p-4 bg-gray-100">
								<div className="flex items-center space-x-2">
									<Button
										variant="ghost"
										className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
									>
										<ThumbsUp className="w-5 h-5" />
										<span>Like</span>
									</Button>
									<Button
										variant="ghost"
										className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
									>
										<ThumbsDown className="w-5 h-5" />
										<span>Dislike</span>
									</Button>
								</div>
								<div className="flex items-center space-x-2">
									<Button
										variant="ghost"
										className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
									>
										<Pencil className="w-5 h-5" />
										<span>Edit</span>
									</Button>
									<Button
										variant="ghost"
										className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
									>
										<Trash2 className="w-5 h-5" />
										<span>Delete</span>
									</Button>
								</div>
							</CardFooter>
						</Card>
					))}
			</div>
		</div>
	);
}
