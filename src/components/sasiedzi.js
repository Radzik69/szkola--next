import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Borders({ borders }) {
	const [kraje, setKraje] = useState([]);
	const [blad, setBlad] = useState(false);
	const [pobieranie, setPobieranie] = useState(true);
	const [populacjaMinMax, setPopulacjaMinmax] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const krajeData = [];

				for (const border of borders) {
					const response = await fetch(
						`https://restcountries.com/v3.1/alpha/${border}`
					);
					const data = await response.json();

					krajeData.push(data[0]); 

					setPopulacjaMinmax((prevState) => [
						...prevState,
						{ population: data[0].population, id: data[0].cca2 },
					]);
				}

				setKraje(krajeData);
			} catch (error) {
				console.log("Wystąpił błąd podczas pobierania danych");
				setBlad(true);
			} finally {
				setPobieranie(false);
			}
		};

		getData();
	}, [borders]);

	const maxPopulation = Math.max(
		...populacjaMinMax.map((item) => item.population)
	);
	const minPopulation = Math.min(
		...populacjaMinMax.map((item) => item.population)
	);

	return (
		<div className="flex flex-wrap justify-center gap-6">
			{kraje.map((kraj, idx) => {
				const countryData = populacjaMinMax.find(
					(item) => item.id === kraj.cca2
				);
				const color =
					countryData.population === maxPopulation
						? "bg-green-500"
						: countryData.population === minPopulation
						? "bg-red-500"
						: "bg-gray-100";

				return (
					<div className={`flex flex-col items-center p-4 ${color}`} key={idx}>
						<Link href={`/strona6/${kraj.cca2}`}>
							<Image
								src={kraj.flags.png}
								width={200}
								height={100}
								alt={`Flaga ${kraj.name.common}`}
							/>
						</Link>
						<h1>{kraj.name.common}</h1>
						<h2>{kraj.cca2}</h2>
					</div>
				);
			})}
		</div>
	);
}
