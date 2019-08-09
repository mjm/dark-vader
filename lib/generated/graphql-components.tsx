import gql from "graphql-tag"
import * as ApolloReactCommon from "@apollo/react-common"
import * as ApolloReactHooks from "@apollo/react-hooks"
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Query = {
  __typename?: "Query"
  videos: Array<Video>
}

export type Video = {
  __typename?: "Video"
  id: Scalars["ID"]
  name: Scalars["String"]
  videoID: Scalars["String"]
  videoURL: Scalars["String"]
  game?: Maybe<Scalars["String"]>
  monsterName?: Maybe<Scalars["String"]>
  published?: Maybe<Scalars["String"]>
}
export type AllVideosQueryVariables = {}

export type AllVideosQuery = { __typename?: "Query" } & {
  videos: Array<{ __typename?: "Video" } & Pick<Video, "id" | "name">>
}

export const AllVideosDocument = gql`
  query AllVideos {
    videos {
      id
      name
    }
  }
`

export function useAllVideosQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AllVideosQuery,
    AllVideosQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<AllVideosQuery, AllVideosQueryVariables>(
    AllVideosDocument,
    baseOptions
  )
}
export type AllVideosQueryHookResult = ReturnType<typeof useAllVideosQuery>
export type AllVideosQueryResult = ApolloReactCommon.QueryResult<
  AllVideosQuery,
  AllVideosQueryVariables
>
