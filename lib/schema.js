const { gql } = require("apollo-server-micro")

module.exports = gql`
  type Query {
    videos: [Video!]!
    video(id: ID!): Video!

    clip(id: ID!): Clip!

    randomClip: Clip!
  }

  type Mutation {
    addProposedClip(input: AddProposedClipInput!): AddProposedClipPayload!
  }

  input AddProposedClipInput {
    videoID: ID!
    start: Int!
    quote: String!
  }

  type AddProposedClipPayload {
    id: ID!
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

    clips: [Clip!]!
  }
`
