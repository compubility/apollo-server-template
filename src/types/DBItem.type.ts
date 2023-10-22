export const DBItemType = `

    """
    multiline comment
    """
    type ItemPage {
        results: [DBItem]
        pagination: Pagination
    }
    type DBItem {
        id: String!
        content: String
        createdAt: String!
    }
`