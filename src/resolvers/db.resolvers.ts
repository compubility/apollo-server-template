import {ServerContext} from "../types/ServerContext.js";
import {ObjectId} from "mongodb";

export const DBResolvers = {
    Query: {
        item: async(_: any, { id }: { id: string }, { myCollection }: ServerContext) => {
            return myCollection.findOne({ _id: new ObjectId(id) })
        },
        items:  async (_: any, { query, pagination }: { query?: string, pagination?: {
                pageSize: number,
                page: number,
                sortOptions: {
                    sortBy: string,
                    sortOrder: "ASC" | "DESC"
                }
            } }, { myCollection }: ServerContext) => {
            let searchQuery = {};
            if (query) {
                const searchRegex = { $regex: new RegExp(query, 'i') }; // Case-insensitive search

                searchQuery["$or"] = [
                    { content: searchRegex }
                ];
            }

            const { page = 1, pageSize= 25, sortOptions } = pagination || {};
            const skip = (page - 1) * pageSize;
            const { sortBy = null, sortOrder = null } = sortOptions || {};
            let sortQuery = {};
            if (sortBy) {
                sortQuery[sortBy] = sortOrder;
            }
            const results =  await myCollection.find(searchQuery)
                .sort(sortQuery)
                .skip(skip)
                .limit(pageSize)
                .toArray();
            const totalCount = await myCollection.countDocuments(searchQuery);

            return {
                results,
                pagination: {
                    total: totalCount,
                    pages: Math.ceil(totalCount / pageSize)
                }
            }

        }
    },
    Mutation: {
        addItem: async(_: any, { content }: { content: string }, { myCollection }: ServerContext)=> {
            const result = await myCollection.insertOne({
                createdAt: new Date().toISOString(),
                content
            });
            return myCollection.findOne({ _id: result.insertedId });

        }
    },
    DBItem: {
        id: (parent) => parent._id
    }
}