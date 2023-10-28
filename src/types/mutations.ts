export const mutations = `
  type Mutation {
    addItem(content: String!): DBItem
    setUser(name: String!): String # TODO: Remove
  }
`
