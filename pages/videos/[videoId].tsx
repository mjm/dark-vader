import { NextPage } from "next"
import { Router } from "next/router"
import {
  useGetVideoQuery,
  BasicClipDetailsFragment
} from "../../lib/generated/graphql-components"
import Layout from "../../components/layout"
import { Video } from "../../components/video"
import {
  Typography,
  Box,
  List,
  ListItem,
  Paper,
  ListItemText,
  ListItemIcon,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core"
import Head from "next/head"
import withData from "../../components/apollo"
import Link from "next/link"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    clipsHeading: {
      padding: theme.spacing(2)
    },
    timestamp: {
      alignSelf: "flex-start",
      marginTop: 7
    }
  })
)

const ShowVideo: NextPage<{ query: Router["query"] }> = ({ query }) => {
  const { videoId } = query

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
      <ClipList clips={video.clips} />
    </Layout>
  )
}

ShowVideo.getInitialProps = async ({ query }) => {
  return { query }
}

export default withData(ShowVideo)

const ClipList: React.FC<{ clips: BasicClipDetailsFragment[] }> = ({
  clips
}) => {
  const classes = useStyles({})

  if (!clips.length) {
    return null
  }

  return (
    <Box mt={4} maxWidth={720} marginX="auto">
      <Typography variant="h5" className={classes.clipsHeading}>
        {clips.length} Clip{clips.length === 1 ? "" : "s"}
      </Typography>
      <Paper>
        <List>
          {clips.map(clip => (
            <Link
              key={clip.id}
              href="/clips/[clipId]"
              as={`/clips/${clip.id}`}
              passHref
            >
              <ListItem button component="a">
                <ListItemIcon className={classes.timestamp}>
                  <Typography variant="caption">
                    <Timestamp seconds={clip.start} />
                  </Typography>
                </ListItemIcon>
                <ListItemText primary={clip.quote} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

const Timestamp: React.FC<{ seconds: number }> = ({ seconds }) => {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return <>{`${minutes}:${secs < 10 ? `0${secs}` : secs}`}</>
}
