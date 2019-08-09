const { gql } = require("apollo-server-micro")

module.exports = gql`
  type Query {
    videos: [Video!]!
  }

  type Video {
    id: ID!
    name: String!
    videoID: String!
    videoURL: String!
    game: String
    monsterName: String
    published: String
  }
`
