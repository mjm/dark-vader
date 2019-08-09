import { NextPage } from "next"
import { initApollo } from "../../components/apollo"
import {
  GetRandomClipDocument,
  GetRandomClipQuery
} from "../../lib/generated/graphql-components"
import Router from "next/router"

const Random: NextPage = () => null

Random.getInitialProps = async ctx => {
  const client = initApollo(null, ctx)
  const { data } = await client.query<GetRandomClipQuery>({
    query: GetRandomClipDocument,
    fetchPolicy: "no-cache"
  })

  const id = data.randomClip.id
  if (ctx.req) {
    ctx.res.writeHead(301, { Location: `/clips/${id}` })
    ctx.res.end()
  } else {
    Router.replace("/clips/[clipdId]", `/clips/${id}`)
  }

  return {}
}

export default Random
