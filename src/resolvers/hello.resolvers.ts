import { ServerContext } from '../types/ServerContext'

export const HelloResolvers = {
    Query: {
        hello: (
            _: any,
            { name }: { name?: string },
            context: ServerContext
        ) => {
            const greet = name || context.name || 'World'
            return `Hello ${greet}!`
        },
    },
    Mutation: {
        setUser: (
            _: any,
            { name }: { name: string },
            context: ServerContext
        ) => {
            // sample only, does nothing
            context.name = name
            return name
        },
    },
}
