# Apollo Server Template

A simple Apollo Server template setup to work with Typescript.

### Features

✅ Suggested File Structure  
✅ Sample Query  
✅ Sample Mutation  
✅ Jest configuration with [supertest](https://www.npmjs.com/package/supertest)

### Contents

`/src`:

-   `/resolvers`: Directory for implementing resolvers. `resolvers.ts` should import any of your `*.resolvers.ts` definitions and be the single source for exported resolvers. These are used in `server.ts` to initialize the server.
-   `/types`: Directory for defining your GQL types. Note: GQL types should be following the `*.type.ts` naming conventions to avoid conflicts with typescript type definitions which I've chosen to Capitalize to distinguish from any GQL files. You could also choose to create a separate directory for them.
-   `/datasources`: A directory to implement any necessary data sources.
-   `server.ts`: Exports a `createServer` function with the type definitions and resolvers. Also used by jest to create a server during testing.
-   `index.ts`: Where the magic happens. This creates a server instance and invokes the listener.

`/tests`: Includes spec files for tests.
