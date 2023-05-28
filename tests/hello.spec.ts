import { createApolloServer } from '../src/server'
import request from 'supertest'
import { startStandaloneServer } from '@apollo/server/standalone'

describe("'hello' Query", () => {
    const query = `
        query hello($name: String) {
            hello(name: $name)
        }
    `
    let server, url: string

    // before the tests we spin up a new Apollo Server
    beforeAll(async () => {
        server = createApolloServer()
        // Note we must wrap our object destructuring in parentheses because we already declared these variables
        // We pass in the port as 0 to let the server pick its own ephemeral port for testing
        ;({ url } = await startStandaloneServer(server, {
            context: async () => ({ name: '' }),
            listen: { port: 0 },
        }))
    })

    afterAll(async () => {
        await server?.stop()
    })

    it("defaults the name to 'World'", async () => {
        const response = await request(url)
            .post('')
            .send({ query })
            .set('apollo-require-preflight', 'true')
        const { body, error } = response
        const { data, errors } = body
        expect(errors).toBeUndefined()
        expect(error).toBeFalsy()
        expect(data?.hello).toEqual('Hello World!')
    })

    it('returns the greeting with the passed in variable', async () => {
        const name = 'Jest'
        const variables = {
            name,
        }
        const response = await request(url)
            .post('')
            .send({ query, variables })
            .set('apollo-require-preflight', 'true')
        const { body, error } = response
        const { data, errors } = body
        expect(error).toBeFalsy()
        expect(errors).toBeUndefined()
        expect(data?.hello).toEqual(`Hello ${name}!`)
    })
})
