import React from "react";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";
import { FIND_PERSON } from "../persons/graphql-queries";

export const Persons = ({ persons }) => {
	const [getPerson, result] = useLazyQuery(FIND_PERSON);
	const [person, setPerson] = useState(null);

	const showPerson = (name) => {
		getPerson({ variables: { nameToSearch: name } });
	};

	useEffect(() => {
		if (result.data) {
			setPerson(result.data.findPerson);
		}
	}, [result]);

	if (persons === null) return null;

	if (person) {
		return (
			<div>
				<h2>{person.name}</h2>
				<div>{person.phone}</div>
				<div>
					{person.address.city}
					{person.address.street}
				</div>

				<button onClick={() => setPerson(null)}>close</button>
			</div>
		);
	}

	return (
		<div className="div">
			<h2> Persons </h2>
			{persons.map((p) => (
				<div
					key={p.id}
					onClick={() => {
						showPerson(p.name);
					}}
				>
					<div className="div">
						{p.name} {p.phone}
					</div>
				</div>
			))}
		</div>
	);
};
