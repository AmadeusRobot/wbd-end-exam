const typeDefs = `
type User {
    name: String!
    dob: String!
    email: String!
    phone: String!
    password: String!
    profilePhoto: String
    role: String!
    admin: String!
    hospital: String
    fee: String
    _id: String
}

type Session {
    user: String!
    token: String!
    createdAt: String!
    _id: String!
}


type Query {
  users: [User]
  doctors: [User]
}

type Mutation {
    login (email: String!, password: String!): Session
    register(
        name: String!
        dob: String!
        email: String!
        phone: String!
        password: String!
        profilePhoto: String
        role: String!
        hospital: String
        fee: String
    ): Session
    deleteUser (
        id: String
    ): String
    updateUser(
        name: String!
        dob: String!
        email: String!
        phone: String!
        password: String!
        profilePhoto: String
        role: String!
        hospital: String
        fee: String
        id: String!
    ): String
}
`

export default typeDefs