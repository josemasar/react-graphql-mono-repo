import React, {useState} from "react"
import { useMutation } from "@apollo/client"
import { ALL_PERSONS } from "../persons/graphql-queries"
import { CREATE_PERSON } from "../persons/graphql-mutations"

export const PersonForm = ({notifyError}) => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")

    const [createPerson] = useMutation(CREATE_PERSON, {
        refetchQueries: [{query: ALL_PERSONS}],
        onError: (error) => {
            notifyError(error.graphQLErrors[0].message)
        }
    })

    const handleSubmit = e => {
        e.preventDefault()
        createPerson({variables: {name, phone, street, city}})
        setName("")
        setPhone("")
        setStreet("")
        setCity("")
    }

    return(
        <div>
            <h2>Create new person</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder= "Name" value={name} onChange= { e => setName(e.target.value)} />
                <input placeholder= "Phone" value={phone} onChange= { e => setPhone(e.target.value)} />
                <input placeholder= "Street" value={street} onChange= { e => setStreet(e.target.value)} />
                <input placeholder= "City" value={city} onChange= { e => setCity(e.target.value)} />
                <button>Add Person</button>
            </form>
        </div>
    )
}
