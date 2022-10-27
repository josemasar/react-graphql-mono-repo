useEffect(() => {
    fetch("http://localhost:4000", {
      method: "POST",
      headers: { "Content-type": "application/json"},
      body: JSON.stringify({ query: `
      query {
        allPersonsFromApi {
          name
          phone
        }
      }
      `})
    })
    .then(res => res.json())
    .then(res => console.log(res.data))
  })
