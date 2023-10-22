import { startStandaloneServer } from '@apollo/server/standalone'
import { createApolloServer } from './server.js'
import {connectToDatabase} from "./connection.js";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = createApolloServer()
const db = await connectToDatabase();

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    context: async () => {
        return {
            name: '',
            // TODO: Update context collections as needed.
            myCollection: db.collection('my-collection')
        }
    },
    listen: { port: process.env.PORT ? +process.env.PORT : 8080 },
})

console.log(`🚀  Server ready at: ${url}`)
