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
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Switch } from "@/components/ui/switch";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trigger } from "@radix-ui/react-dialog";

export default function GamesKopia() {
	const pb = new PocketBase
	// ("http://127.0.0.1:8090")
	("http://172.16.15.148:8080/")
	;
	const [data, setData] = useState([]);
	const [newCar, setNewCar] = useState({
		model: "",
		cena: "",
		rok_Produkcji: "",
		przebieg: "",
		dodatkowe_Informacje: "",
		wypozyczony: false,
	});
	const [zdjecie, setZdjecie] = useState(null);
	const [editingCar, setEditingCar] = useState(null);
	const [addDialogOpen, setAddDialogOpen] = useState(false);

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await pb.collection("samochody").getFullList({
					sort: "-created",
				});
				setData(response);
			} catch (error) {
				console.error(error);
			}
		};
		getData();
	}, []);

	async function deleteCar(id) {
		try {
			await pb.collection("samochody").delete(id);
			setData((prev) => prev.filter((item) => item.id !== id));
		} catch (error) {
			console.log(error);
		}
	}

	async function toggleRentalStatus(id, currentStatus) {
		try {
			const updatedStatus = !currentStatus;
			await pb
				.collection("samochody")
				.update(id, { Wypozyczony: updatedStatus });

			setData((prev) =>
				prev.map((item) =>
					item.id === id ? { ...item, Wypozyczony: updatedStatus } : item
				)
			);
		} catch (error) {
			console.error("Error updating status:", error);
		}
	}

	const handleInputChange = (e, field) => {
		const { value } = e.target;
		setNewCar((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleImageUpload = (e) => {
		setZdjecie(e.target.files[0]);
	};

	const saveCar = async () => {
		const formData = new FormData();
		for (const field in newCar) formData.append(field, newCar[field]);
		if (zdjecie) formData.append("zdjecie", zdjecie);

		try {
			const record = await pb.collection("samochody").create(formData);
			setData([record, ...data]);
			setAddDialogOpen(false);
			setNewCar({
				model: "",
				cena: "",
				rok_Produkcji: "",
				przebieg: "",
				dodatkowe_Informacje: "",
				wypozyczony: false,
			});
			setZdjecie(null);
		} catch (error) {
			console.error("Error saving car:", error);
		}
	};

	const updateCar = async () => {
		if (!editingCar) return;
		const formData = new FormData();
		for (const field in editingCar) formData.append(field, editingCar[field]);
		if (zdjecie) formData.append("zdjecie", zdjecie);

		try {
			const updatedCar = await pb
				.collection("samochody")
				.update(editingCar.id, formData);
			setData((prev) =>
				prev.map((data) => (data.id === updatedCar.id ? updatedCar : data))
			);
			setEditingCar(null);
			setZdjecie(null);
		} catch (error) {
			console.error("Error updating car:", error);
		}
	};

	const startEditingCar = (car) => {
		setEditingCar({ ...car });
		setAddDialogOpen(false);
		setZdjecie(null);
	};

	return (
		<div className="flex flex-col items-center bg-gradient-to-r from-indigo-100 to-indigo-300 min-h-screen py-12 px-4">
			<h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
				Wypożyczalnia Samochodów
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
				{data.map((samochody, idx) => (
					<Card
						key={idx}
						className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
					>
						<CardHeader className="p-6 border-b border-gray-200">
							<CardTitle className="text-xl font-semibold text-indigo-800">
								{samochody.model}
							</CardTitle>
						</CardHeader>
						<CardContent className="p-6 space-y-4">
							<p className="text-lg">
								<span className="font-semibold">Cena:</span> {samochody.cena} zł
								/24h
							</p>
							<p className="text-lg">
								<span className="font-semibold">Rok Produkcji:</span>{" "}
								{samochody.rok_Produkcji}
							</p>
							<p className="text-lg">
								<span className="font-semibold">Przebieg:</span>{" "}
								{samochody.przebieg} km
							</p>
							{samochody.dodatkowe_Informacje && (
								<p className="text-lg">
									<span className="font-semibold">Dodatkowe Informacje:</span>{" "}
									{samochody.dodatkowe_Informacje}
								</p>
							)}
							<div className="mt-6">
								<Image
									src={pb.files.getUrl(samochody, samochody.zdjecie)}
									alt={samochody.model}
									width={250}
									height={180}
									className="rounded-lg object-cover shadow-md"
								/>
							</div>
						</CardContent>
						<CardFooter className="p-6 border-t border-gray-200 flex items-center justify-between">
							<div className="flex items-center">
								<Switch
									className="mr-4"
									checked={samochody.Wypozyczony}
									onCheckedChange={() =>
										toggleRentalStatus(samochody.id, samochody.Wypozyczony)
									}
								/>
								<span className="text-lg font-semibold text-gray-600">
									{samochody.Wypozyczony ? "Wypożyczony" : "Dostępny"}
								</span>
							</div>
							<div className="flex space-x-4">
								<Dialog>
									<DialogTrigger asChild>
										<Button
											variant="outline"
											className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
											onClick={() => startEditingCar(samochody)}
										>
											<Pencil size={18} />
										</Button>
									</DialogTrigger>
									<DialogContent className="max-w-lg">
										<DialogHeader>
											<DialogTitle>Edytuj Samochód</DialogTitle>
										</DialogHeader>
										<div className="grid gap-4 py-4">
											<Label>Model</Label>
											<Input
												value={editingCar?.model || ""}
												onChange={(e) =>
													setEditingCar((prev) => ({
														...prev,
														model: e.target.value,
													}))
												}
											/>
											<Label>Cena (zł)</Label>
											<Input
												value={editingCar?.cena || ""}
												onChange={(e) =>
													setEditingCar((prev) => ({
														...prev,
														cena: e.target.value,
													}))
												}
												type="number"
											/>
											<Label>Rok produkcji</Label>
											<Input
												value={editingCar?.rok_Produkcji || ""}
												onChange={(e) =>
													setEditingCar((prev) => ({
														...prev,
														rok_Produkcji: e.target.value,
													}))
												}
												type="number"
											/>
											<Label>Przebieg (km)</Label>
											<Input
												value={editingCar?.przebieg || ""}
												onChange={(e) =>
													setEditingCar((prev) => ({
														...prev,
														przebieg: e.target.value,
													}))
												}
												type="number"
											/>
											<Label>Dodatkowe informacje</Label>
											<Input
												value={editingCar?.dodatkowe_Informacje || ""}
												onChange={(e) =>
													setEditingCar((prev) => ({
														...prev,
														dodatkowe_Informacje: e.target.value,
													}))
												}
											/>
											<Label>Zdjęcie</Label>
											<Input type="file" onChange={handleImageUpload} />
										</div>
										<DialogFooter>
											<Trigger asChild>
												<Button onClick={updateCar}>Zapisz zmiany</Button>
											</Trigger>
										</DialogFooter>
									</DialogContent>
								</Dialog>
								<Button
									variant="outline"
									className="p-3 text-red-600 border-red-600 hover:bg-red-50"
									onClick={() => deleteCar(samochody.id)}
								>
									<Trash2 size={18} />
								</Button>
							</div>
						</CardFooter>
					</Card>
				))}

				<Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
					<DialogTrigger asChild>
						<Button className="mt-8 bg-green-600 text-white rounded-full p-4 shadow-md hover:bg-green-700">
							<Plus size={20} /> Dodaj Nowy Samochód
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-lg">
						<DialogHeader>
							<DialogTitle>Dodaj Nowy Samochód</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<Label>Model</Label>
							<Input
								value={newCar.model}
								onChange={(e) => handleInputChange(e, "model")}
							/>
							<Label>Cena (zł)</Label>
							<Input
								value={newCar.cena}
								onChange={(e) => handleInputChange(e, "cena")}
								type="number"
							/>
							<Label>Rok produkcji</Label>
							<Input
								value={newCar.rok_Produkcji}
								onChange={(e) => handleInputChange(e, "rok_Produkcji")}
								type="number"
							/>
							<Label>Przebieg (km)</Label>
							<Input
								value={newCar.przebieg}
								onChange={(e) => handleInputChange(e, "przebieg")}
								type="number"
							/>
							<Label>Dodatkowe informacje</Label>
							<Input
								value={newCar.dodatkowe_Informacje}
								onChange={(e) => handleInputChange(e, "dodatkowe_Informacje")}
							/>
							<Label>Zdjęcie</Label>
							<Input type="file" onChange={handleImageUpload} />
						</div>
						<DialogFooter>
							<Button onClick={saveCar}>Dodaj Samochód</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
