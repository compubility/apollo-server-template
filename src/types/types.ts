import { queries } from './queries.js'
import { mutations } from './mutations.js'
import {PaginationType} from "./Pagination.type.js";
import {DBItemType} from "./DBItem.type.js";

export const typeDefinitions = [
    `scalar Date`,
    `scalar JSON`,
    mutations,
    queries,
    PaginationType,
    DBItemType
]
