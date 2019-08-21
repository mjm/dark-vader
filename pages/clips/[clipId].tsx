import React from "react"
import { NextPage } from "next"
import withData from "../../components/apollo"
import { useGetClipQuery } from "../../lib/generated/graphql-components"
import { Clip } from "../../components/clip"
import { Typography, Link } from "@material-ui/core"
import Layout from "../../components/layout"
import Head from "next/head"
import { Router } from "next/router"
import NextLink from "next/link"
import Skeleton from "@material-ui/lab/Skeleton"

const ShowClip: NextPage<{ query: Router["query"] }> = ({ query }) => {
  const { clipId } = query

  const { loading, error, data } = useGetClipQuery({
    variables: { id: clipId as string }
  })

  if (error) {
    return <Layout>Error: {error}</Layout>
  }

  const clip = loading ? null : data && data.clip

  return (
    <Layout
      breadcrumbs={[
        clip ? (
          <NextLink
            key="video"
            href="/videos/[videoId]"
            as={`/videos/${clip.video.id}`}
            passHref
          >
            <Link color="inherit">
              <Typography variant="subtitle1">{clip.video.name}</Typography>
            </Link>
          </NextLink>
        ) : (
          <Skeleton width={150} />
        ),
        <Typography key="clip" variant="subtitle1">
          Clip
        </Typography>
      ]}
    >
      <Head>
        {clip ? <title>Monster Factory: {clip.video.name}</title> : null}
      </Head>
      <Clip clip={clip} />
    </Layout>
  )
}

ShowClip.getInitialProps = async ({ query }) => {
  return { query }
}

export default withData(ShowClip)
