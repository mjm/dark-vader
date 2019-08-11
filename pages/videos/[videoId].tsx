import { NextPage } from "next"
import { useRouter } from "next/router"
import { useGetVideoQuery } from "../../lib/generated/graphql-components"
import Layout from "../../components/layout"
import { Video } from "../../components/video"
import { Typography } from "@material-ui/core"
import Head from "next/head"
import withData from "../../components/apollo"

const ShowVideo: NextPage = () => {
  const router = useRouter()
  const { videoId } = router.query

  const { loading, error, data } = useGetVideoQuery({
    variables: { id: videoId as string }
  })

  if (loading) {
    return <Layout>Loading...</Layout>
  }

  if (error) {
    return <Layout>Error: {error}</Layout>
  }

  const video = data.video
  return (
    <Layout
      breadcrumbs={<Typography variant="subtitle1">{video.name}</Typography>}
    >
      <Head>
        <title>Monster Factory: {video.name}</title>
      </Head>

      <Video video={video} />
    </Layout>
  )
}

export default withData(ShowVideo)
