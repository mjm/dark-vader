const { gql } = require("apollo-server-micro")

module.exports = gql`
  type Query {
    videos: [Video!]!

    clip(id: ID!): Clip!

    randomClip: Clip!
  }

  type Clip {
    id: ID!
    video: Video!
    start: Int!
    quote: String!
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
