
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Persons } from "./components/Persons";
import { PersonForm } from "./components/PersonForm";
import {Notify} from "./components/Notify";
import {ALL_PERSONS} from "./persons/graphql-queries"
import "./App.css";

function App() {
	const [errorMessage, setErrorMessage] = useState(null)
	const { data, error, loading } = useQuery(ALL_PERSONS, {pollInterval: 2000});

	if (error) return <span>{error}</span>;
	const notifyError = message => {
		setErrorMessage(message)
		setTimeout(()=> setErrorMessage(null), 5000)
	}

	return (
		<div className="App">
			<Notify errorMessage={errorMessage}/>
			{loading ? <p>Loading...</p> : <Persons persons={data?.allPersons} />}
			<PersonForm notifyError={notifyError}/>
		</div>
	);
}

export default App;
