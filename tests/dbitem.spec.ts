import { createApolloServer } from '../src/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import {MongoMemoryServer} from "mongodb-memory-server";
import { ObjectId } from "mongodb";
import {connectToDatabase} from "../src/connection";

describe("db item queries", () => {

    let connection, server, mongoServer, url, dbCollection, contextValue

    // before the tests we spin up a new Apollo Server
    beforeAll(async () => {
        // This will create a new instance of "MongoMemoryServer" and automatically start it
        mongoServer = await MongoMemoryServer.create();
        process.env.MONGODB_URI = mongoServer.getUri();
        connection = await connectToDatabase({ uri: mongoServer.getUri() });
        dbCollection = connection.collection("unit-tests");
        contextValue = {
            myCollection: dbCollection
        }
        server = createApolloServer()
        // Note we must wrap our object destructuring in parentheses because we already declared these variables
        // We pass in the port as 0 to let the server pick its own ephemeral port for testing
        ;({ url } = await startStandaloneServer(server, {
            context: async ({ req }) => {
                return {
                    myCollection: dbCollection
                };
            },
            listen: { port: 0 },
        }))
    })

    afterAll(async () => {
        await server?.stop()
        if (mongoServer) {
            mongoServer.stop();
        }
        if (connection) {
            connection.close();
        }
    })

    describe("'addItem' Mutation", () => {
        const query = `
        mutation addItem($content: String!) {
            addItem(content: $content) {
              content
              createdAt
              id
            }
        }
    `


        it("creates and return the correct item", async () => {
            const {body} = await server.executeOperation({
                query,
                variables: {
                    content: "Test 1",
                }
            }, {
                contextValue
            });
            const {data, errors} = body.singleResult;
            const { addItem } = data;
            expect(addItem.content).toEqual("Test 1");
            expect(addItem.createdAt).toBeDefined();
            expect(addItem.id).toBeDefined();
            expect(errors).toBeUndefined()
        });
    });

    describe("item", () => {
        const query = `
            query item($id: String!) {
                item(id: $id) {
                  id
                  content
                  createdAt
                }
        }
    `
        it("returns an error if no id is provided", async() => {
            const {body} = await server.executeOperation({
                query
            }, {
                contextValue
            });
            const {data, errors } = body.singleResult;
            const [error] = errors;
            expect(error.extensions.code).toEqual("BAD_USER_INPUT");
            expect(error.message).toEqual("Variable \"$id\" of required type \"String!\" was not provided.");
            expect(data).toBeUndefined();
        });

        it("returns null if the item with the id provided is not found", async() => {
            const {body} = await server.executeOperation({
                query,
                variables: {
                    id: `${new ObjectId()}`
                }
            }, {
                contextValue
            });
            const { data, errors } = body.singleResult;
            expect(data.item).toBeNull();
            expect(errors).toBeUndefined();
        });

        it("returns the item with the specified id if it is found", async() => {
            const content = "hello Jest";
            const createdAt = new Date().toISOString();
            const { insertedId } = await dbCollection.insertOne({ content, createdAt });
            const {body} = await server.executeOperation({
                query,
                variables: {
                    id: `${insertedId}`
                }
            }, {
                contextValue : { myCollection: dbCollection }
            });
            const {data, errors} = body.singleResult;
            expect(data.item).toEqual({
                id: `${insertedId}`,
                createdAt,
                content,
            });
            expect(errors).toBeUndefined()
        });
    });
})