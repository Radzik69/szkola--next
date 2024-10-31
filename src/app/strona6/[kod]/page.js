"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Borders from "@/components/sasiedzi";
export default function Kraj({ params }) {
	const [kraj, setKraj] = useState({});
	const [blad, setBlad] = useState(false);
	const [pobieranie, setPobieranie] = useState(true);

	useEffect(() => {
		const getRestCountries = async () => {
			try {
				const response = await fetch(
					`https://restcountries.com/v3.1/alpha/${params.kod}`
				);
				const dataJson = await response.json();
				if (response.status == 400) {
					setBlad(true);
				}
				if (response.status == 404) {
					setBlad(true);
				}
				console.log(dataJson);
				setKraj(dataJson[0]);
			} catch (error) {
				setBlad(true);
				console.log(error);
			} finally {
				setPobieranie(false);
				console.log("loading");
			}
		};
		getRestCountries();
	}, []);

	return (
		<div>
			{pobieranie && <h1>informacje o kraju sie aktualnie pobieraja</h1>}
			{blad && <h1>Nie udalo sie pobrac danych</h1>}
			{kraj?.cca2 != null && (
				<div>
					<div className="flex flex-col gap-2 justify-center items-center min-h-screen">
						<Image src={kraj.flags.png} width={500} height={300}></Image>
						<h1>
							{kraj.name.common.toUpperCase()}({kraj.cca2.toLowerCase()})
						</h1>
						<h1>{kraj.capital[0]}</h1>
						<h1>{kraj.population}</h1>
					</div>
					<Borders borders={kraj.borders}></Borders>
				</div>
			)}
		</div>
	);
}
