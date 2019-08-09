import Airtable from "airtable"
import { GraphQLResolveInfo } from "graphql"
type AirtableRow = Airtable.Row<{}>
export type EnumMap<T extends string, U> = { [K in T]: U }
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Cursor: string
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

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  Video: ResolverTypeWrapper<AirtableRow>
  ID: ResolverTypeWrapper<Scalars["ID"]>
  String: ResolverTypeWrapper<Scalars["String"]>
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Video: AirtableRow
  ID: Scalars["ID"]
  String: Scalars["String"]
  Boolean: Scalars["Boolean"]
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  videos?: Resolver<Array<ResolversTypes["Video"]>, ParentType, ContextType>
}

export type VideoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Video"] = ResolversParentTypes["Video"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  videoID?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  videoURL?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  game?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  monsterName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >
  published?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>
  Video?: VideoResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
