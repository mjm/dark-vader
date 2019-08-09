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

export type Clip = {
  __typename?: "Clip"
  id: Scalars["ID"]
  video: Video
  start: Scalars["Int"]
  quote: Scalars["String"]
}

export type Query = {
  __typename?: "Query"
  videos: Array<Video>
  clips: Array<Clip>
  clip: Clip
  randomClip: Clip
}

export type QueryClipArgs = {
  id: Scalars["ID"]
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
export type GetClipQueryVariables = {
  id: Scalars["ID"]
}

export type GetClipQuery = { __typename?: "Query" } & {
  clip: { __typename?: "Clip" } & Pick<Clip, "id" | "start" | "quote"> & {
      video: { __typename?: "Video" } & Pick<Video, "name" | "videoID">
    }
}

export type GetRandomClipQueryVariables = {}

export type GetRandomClipQuery = { __typename?: "Query" } & {
  randomClip: { __typename?: "Clip" } & Pick<Clip, "id">
}

export const GetClipDocument = gql`
  query GetClip($id: ID!) {
    clip(id: $id) {
      id
      video {
        name
        videoID
      }
      start
      quote
    }
  }
`

export function useGetClipQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetClipQuery,
    GetClipQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetClipQuery, GetClipQueryVariables>(
    GetClipDocument,
    baseOptions
  )
}
export type GetClipQueryHookResult = ReturnType<typeof useGetClipQuery>
export type GetClipQueryResult = ApolloReactCommon.QueryResult<
  GetClipQuery,
  GetClipQueryVariables
>
export const GetRandomClipDocument = gql`
  query GetRandomClip {
    randomClip {
      id
    }
  }
`

export function useGetRandomClipQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetRandomClipQuery,
    GetRandomClipQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetRandomClipQuery,
    GetRandomClipQueryVariables
  >(GetRandomClipDocument, baseOptions)
}
export type GetRandomClipQueryHookResult = ReturnType<
  typeof useGetRandomClipQuery
>
export type GetRandomClipQueryResult = ApolloReactCommon.QueryResult<
  GetRandomClipQuery,
  GetRandomClipQueryVariables
>
