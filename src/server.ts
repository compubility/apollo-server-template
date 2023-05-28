import { ApolloServer } from '@apollo/server'
import { typeDefinitions as typeDefs } from './types/types.js'
import { ServerContext } from './types/ServerContext.js'
import { resolvers } from './resolvers/resolvers.js'

export const createApolloServer = (options = {}) => {
    return new ApolloServer<ServerContext>({
        typeDefs,
        resolvers,
        ...options,
    })
}
