import React from "react"
import { NextPage } from "next"
import withData from "../../components/apollo"
import { useGetClipQuery } from "../../lib/generated/graphql-components"
import { Clip } from "../../components/clip"
import { Typography, Link, CircularProgress, Box } from "@material-ui/core"
import Layout from "../../components/layout"
import Head from "next/head"
import { Router } from "next/router"
import NextLink from "next/link"

const ShowClip: NextPage<{ query: Router["query"] }> = ({ query }) => {
  const { clipId } = query

  const { loading, error, data } = useGetClipQuery({
    variables: { id: clipId as string }
  })

  if (loading) {
    return (
      <Layout>
        <Box my={2} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </Layout>
    )
  }

  if (error) {
    return <Layout>Error: {error}</Layout>
  }

  const clip = data.clip
  return (
    <Layout
      breadcrumbs={[
        <NextLink
          key="video"
          href="/videos/[videoId]"
          as={`/videos/${clip.video.id}`}
          passHref
        >
          <Link color="inherit">
            <Typography variant="subtitle1">{clip.video.name}</Typography>
          </Link>
        </NextLink>,
        <Typography key="clip" variant="subtitle1">
          Clip
        </Typography>
      ]}
    >
      <Head>
        <title>Monster Factory: {clip.video.name}</title>
      </Head>
      <Clip clip={clip} />
    </Layout>
  )
}

ShowClip.getInitialProps = async ({ query }) => {
  return { query }
}

export default withData(ShowClip)
