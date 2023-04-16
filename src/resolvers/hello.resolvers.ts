export const HelloResolvers = {
    Query: {
        hello: (_, { name }, context) => {
            const greet = name || context.name || 'World';
            return `Hello ${greet}!`;
        }
    },
    Mutation: {
        setUser: (_, { name }, context) => {
            // sample only, does nothing
            context.name = name;
            return name;
        }
    }
}