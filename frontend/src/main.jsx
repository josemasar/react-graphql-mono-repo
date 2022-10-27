import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  connectToDevTools: true,
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: "http://localhost:4000",
	}),
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
