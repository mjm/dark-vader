import { ApolloServer, makeExecutableSchema, gql } from "apollo-server-micro"
import * as resolvers from "../../lib/resolvers"
import typeDefs from "../../lib/schema"
import { cache } from "../../lib/cache"

const schema = makeExecutableSchema({ typeDefs, resolvers: resolvers as any })

const server = new ApolloServer({
  context: { cache },
  schema,
  introspection: true,
  // @ts-ignore
  playground: {
    settings: {
      "request.credentials": "same-origin"
    }
  }
})

export default server.createHandler({ path: "/api/graphql" })

export const config = {
  api: {
    bodyParser: false
  }
}
