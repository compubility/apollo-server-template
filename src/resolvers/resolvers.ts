import { GraphQLScalarType, Kind } from 'graphql'
import GraphQLJSON from 'graphql-type-json';

import { HelloResolvers } from './hello.resolvers.js'
import {DBResolvers} from "./db.resolvers.js";

export const resolvers = [
    {
        JSON: GraphQLJSON,
        Date: new GraphQLScalarType({
            name: 'Date',
            description: 'Date custom scalar type',
            parseValue(value: any) {
                return new Date(value) // value from the client
            },
            serialize(value: any) {
                if (value && value.getTime) {
                    return value.getTime() // value sent to the client
                }
                return value
            },
            // @ts-ignore-next-line
            parseLiteral(ast) {
                if (ast.kind === Kind.INT) {
                    return parseInt(ast.value, 10) // ast value is always in string format
                }
                return null
            },
        }),
    },
    DBResolvers, // remove sample
    HelloResolvers, // remove sample
    // insert imported resolvers
]
