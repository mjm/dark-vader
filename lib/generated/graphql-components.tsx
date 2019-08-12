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

export type AddProposedClipInput = {
  videoID: Scalars["ID"]
  start: Scalars["Int"]
  quote: Scalars["String"]
}

export type AddProposedClipPayload = {
  __typename?: "AddProposedClipPayload"
  id: Scalars["ID"]
}

export type Clip = {
  __typename?: "Clip"
  id: Scalars["ID"]
  video: Video
  start: Scalars["Int"]
  quote: Scalars["String"]
}

export type Mutation = {
  __typename?: "Mutation"
  addProposedClip: AddProposedClipPayload
}

export type MutationAddProposedClipArgs = {
  input: AddProposedClipInput
}

export type Query = {
  __typename?: "Query"
  videos: Array<Video>
  video: Video
  clip: Clip
  randomClip: Clip
}

export type QueryVideoArgs = {
  id: Scalars["ID"]
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
  clips: Array<Clip>
}
export type GetClipQueryVariables = {
  id: Scalars["ID"]
}

export type GetClipQuery = { __typename?: "Query" } & {
  clip: { __typename?: "Clip" } & ClipDetailsFragment
}

export type GetRandomClipQueryVariables = {}

export type GetRandomClipQuery = { __typename?: "Query" } & {
  randomClip: { __typename?: "Clip" } & Pick<Clip, "id">
}

export type GetVideoQueryVariables = {
  id: Scalars["ID"]
}

export type GetVideoQuery = { __typename?: "Query" } & {
  video: { __typename?: "Video" } & VideoDetailsFragment
}

export type BasicVideoDetailsFragment = { __typename?: "Video" } & Pick<
  Video,
  "id" | "name" | "videoID"
>

export type VideoDetailsFragment = { __typename?: "Video" } & Pick<
  Video,
  "monsterName" | "published"
> & {
    clips: Array<{ __typename?: "Clip" } & BasicClipDetailsFragment>
  } & BasicVideoDetailsFragment

export type BasicClipDetailsFragment = { __typename?: "Clip" } & Pick<
  Clip,
  "id" | "start" | "quote"
>

export type ClipDetailsFragment = { __typename?: "Clip" } & {
  video: { __typename?: "Video" } & BasicVideoDetailsFragment
} & BasicClipDetailsFragment

export type AddProposedClipMutationVariables = {
  input: AddProposedClipInput
}

export type AddProposedClipMutation = { __typename?: "Mutation" } & {
  addProposedClip: { __typename?: "AddProposedClipPayload" } & Pick<
    AddProposedClipPayload,
    "id"
  >
}
export const BasicVideoDetailsFragmentDoc = gql`
  fragment basicVideoDetails on Video {
    id
    name
    videoID
  }
`
export const BasicClipDetailsFragmentDoc = gql`
  fragment basicClipDetails on Clip {
    id
    start
    quote
  }
`
export const VideoDetailsFragmentDoc = gql`
  fragment videoDetails on Video {
    ...basicVideoDetails
    monsterName
    published
    clips {
      ...basicClipDetails
    }
  }
  ${BasicVideoDetailsFragmentDoc}
  ${BasicClipDetailsFragmentDoc}
`
export const ClipDetailsFragmentDoc = gql`
  fragment clipDetails on Clip {
    ...basicClipDetails
    video {
      ...basicVideoDetails
    }
  }
  ${BasicClipDetailsFragmentDoc}
  ${BasicVideoDetailsFragmentDoc}
`
export const GetClipDocument = gql`
  query GetClip($id: ID!) {
    clip(id: $id) {
      ...clipDetails
    }
  }
  ${ClipDetailsFragmentDoc}
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
export const GetVideoDocument = gql`
  query GetVideo($id: ID!) {
    video(id: $id) {
      ...videoDetails
    }
  }
  ${VideoDetailsFragmentDoc}
`

export function useGetVideoQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetVideoQuery,
    GetVideoQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetVideoQuery, GetVideoQueryVariables>(
    GetVideoDocument,
    baseOptions
  )
}
export type GetVideoQueryHookResult = ReturnType<typeof useGetVideoQuery>
export type GetVideoQueryResult = ApolloReactCommon.QueryResult<
  GetVideoQuery,
  GetVideoQueryVariables
>
export const AddProposedClipDocument = gql`
  mutation AddProposedClip($input: AddProposedClipInput!) {
    addProposedClip(input: $input) {
      id
    }
  }
`
export type AddProposedClipMutationFn = ApolloReactCommon.MutationFunction<
  AddProposedClipMutation,
  AddProposedClipMutationVariables
>

export function useAddProposedClipMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddProposedClipMutation,
    AddProposedClipMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AddProposedClipMutation,
    AddProposedClipMutationVariables
  >(AddProposedClipDocument, baseOptions)
}
export type AddProposedClipMutationHookResult = ReturnType<
  typeof useAddProposedClipMutation
>
export type AddProposedClipMutationResult = ApolloReactCommon.MutationResult<
  AddProposedClipMutation
>
export type AddProposedClipMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddProposedClipMutation,
  AddProposedClipMutationVariables
>
