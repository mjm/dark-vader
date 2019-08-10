import React from "react"
import { NextPage } from "next"
import withData from "../../components/apollo"
import { useGetClipQuery } from "../../lib/generated/graphql-components"
import { Clip } from "../../components/clip"
import { Typography } from "@material-ui/core"
import Layout from "../../components/layout"
import Head from "next/head"

interface Props {
  clipId: string
}

const ShowClip: NextPage<Props> = ({ clipId }) => {
  const { loading, error, data } = useGetClipQuery({
    variables: { id: clipId }
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
        <Typography variant="subtitle1">{clip.video.name}</Typography>
      }
    >
      <Head>
        <title>Monster Factory: {clip.video.name}</title>
      </Head>
      <Clip clip={clip} />
    </Layout>
  )
}

ShowClip.getInitialProps = async ({ query }): Promise<Props> => {
  // @ts-ignore
  return { clipId: query.clipId }
}

export default withData(ShowClip)
