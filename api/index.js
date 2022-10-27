import { ApolloServer, UserInputError, gql } from "apollo-server"
import { v1 as uudi } from "uuid"
import axios from "axios"
import { persons } from "./data.js"

//Describe your data 
// ! data is required

const typeDefs = gql`
  type Person {
      name: String!
      phone: String
      address: Address!
      id: ID!
      check: String!
  }

  type Address {
      street: String!
      city: String!
  }

  enum YesNo{
    Yes
    No
  }

  type Query {
      personCount: Int!
      allPersons: [Person]!
      findPerson(name: String!): Person
      findPersonsWithTelephone(phone: YesNo): [Person]
      allPersonsFromApi: [Person]!
  }

  type Mutation {
    addPerson(
        name: String!
        phone: String
        street: String!
        city: String!
    ): Person
    editNumber(
        name: String!
        phone: String!
        ): Person
  }
`

//Resolvers
// Adapt data to the way it will be consumed by the client

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name === name)
        },
        findPersonsWithTelephone: (root, args) => {
            const byPhone = person =>
            args.phone === "Yes" ? person.phone : !person.phone
            return persons.filter(byPhone)
        },
        allPersonsFromApi: async () => {
            const {data:personsFromApi} = await axios.get("http://localhost:3000/persons")
            return personsFromApi
        }
    },
   Mutation: {
    addPerson: (root, args) => {
        if (persons.find(p => p.name === args.name)){
            throw new UserInputError("Name must be unique", 
            {invalidArgs: args.name})
        }
        const person = {...args, id: uudi()}
        persons.push(person)
        return person
    },
    editNumber:(root,args) => {
        const personIndex = persons.findIndex(p => p.name === args.name)
        if (personIndex === -1) return null
        const person = persons[personIndex]
        const updatedPerson = {...person, phone: args.phone}
        persons[personIndex] = updatedPerson
        return updatedPerson
    }
   },
    Person: {
       address: (root) => {
           return {
               street: root.street,
               city: root.city
           }
       },
       check: () => "jmsar"
    } 
}

//Create Server

const server = new ApolloServer({
    typeDefs, resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})

//Ctrl + space in GraphQL studio

// Root: create new fields based on calculations of existing data
/* Person: {
    address: (root) => `${root.street}, ${root.city}`,
    check: () => "jmsar"
 }  */
