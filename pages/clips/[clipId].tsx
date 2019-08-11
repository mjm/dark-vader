import React from "react"
import { NextPage } from "next"
import withData from "../../components/apollo"
import { useGetClipQuery } from "../../lib/generated/graphql-components"
import { Clip } from "../../components/clip"
import { Typography, Link } from "@material-ui/core"
import Layout from "../../components/layout"
import Head from "next/head"
import { useRouter } from "next/router"
import NextLink from "next/link"

const ShowClip: NextPage = () => {
  const router = useRouter()
  const { clipId } = router.query

  const { loading, error, data } = useGetClipQuery({
    variables: { id: clipId as string }
  })

  if (loading) {
    return <Layout>Loading...</Layout>
  }

  if (error) {
    return <Layout>Error: {error}</Layout>
  }

  const clip = data.clip
  return (
    <Layout
      breadcrumbs={
        <NextLink
          href="/videos/[videoId]"
          as={`/videos/${clip.video.id}`}
          passHref
        >
          <Link color="inherit">
            <Typography variant="subtitle1">{clip.video.name}</Typography>
          </Link>
        </NextLink>
      }
    >
      <Head>
        <title>Monster Factory: {clip.video.name}</title>
      </Head>
      <Clip clip={clip} />
    </Layout>
  )
}

export default withData(ShowClip)
