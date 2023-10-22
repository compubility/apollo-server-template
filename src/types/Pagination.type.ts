export const PaginationType = `
    enum SortOrder {
        ASC
        DESC
    }
    input PaginationSortOptions {
        sortBy: String!
        sortOrder: SortOrder
    }
    input PaginationOptions {
        pageSize: Int
        page: Int
        sortOption: PaginationSortOptions
    }
    type Pagination {
        total: Int
        pages: Int
    }
`