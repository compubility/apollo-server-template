
import { MongoClient, ServerApiVersion, Db } from 'mongodb';
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URI}/?retryWrites=true&w=majority`;

async function connectToDatabase({ uri = URI }: {uri?: string } = {}): Promise<Db> {
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect()
        return client.db(process.env.DB_NAME) // Replace with your database name
    } catch (err) {
        console.error('Failed to connect to MongoDB', err)
        throw err
    }
}

export { connectToDatabase }
