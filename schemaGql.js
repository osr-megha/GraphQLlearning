import { gql } from "apollo-server-express";

/**  schema ie blueprint mentioning type of data being called -here "user" is queryname that client-side will ask the server 
 * & "[User]" is the collection of data we have
 * server will return entire data of user ie array of users ie [User]
 * now as the type User was not defined here so we will create type User
 * an ! mark makes it mandatory field

*/

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [QuoteWithName]
    iquote(by: ID!): [Quote]
    myprofile:User
  }

  type QuoteWithName{
    name:String
    by:IdName
  }

  type IdName{
    _id:String
    firstName:String
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password:String!
    quotes: [Quote]
  }
  type Quote {
    name: String!
    by: ID!
  }

  type Token{
    token:String!
  }

  type Mutation {
    signupUser(userNew: UserInput!): User
    signinUser(userSignin: UserSigninInput!):Token
    createQuote(name:String!):String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UserSigninInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
