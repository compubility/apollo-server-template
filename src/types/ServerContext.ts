import { Collection } from "mongodb";

export interface ServerContext {
    name: string
    myCollection: Collection
}
