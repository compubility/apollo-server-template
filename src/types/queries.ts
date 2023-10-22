export const queries = `
  type Query {
    hello(name: String = "World"): String # TODO: Remove
    item(id: String!): DBItem
    items(query: String, pagination: JSON): ItemPage
  }
`
