import React from "react"
import { NextPage } from "next"
import { Router } from "next/router"
import {
  useGetVideoQuery,
  BasicClipDetailsFragment,
  useAddProposedClipMutation,
  BasicVideoDetailsFragment
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
  createStyles,
  TextField,
  Button,
  Grid
} from "@material-ui/core"
import Head from "next/head"
import withData from "../../components/apollo"
import Link from "next/link"
import { Formik, FormikHelpers, Form, Field } from "formik"

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

  const [videoTime, setVideoTime] = React.useState(0)
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

      <Video video={video} onTimeChange={setVideoTime} />
      <ProposeClipForm video={video} start={videoTime} />
      <ClipList clips={video.clips} />
    </Layout>
  )
}

ShowVideo.getInitialProps = async ({ query }) => {
  return { query }
}

export default withData(ShowVideo)

interface FormInput {
  quote: string
}

interface ProposeClipFormProps {
  video: BasicVideoDetailsFragment
  start: number
}

const ProposeClipForm: React.FC<ProposeClipFormProps> = ({ video, start }) => {
  const [addClip] = useAddProposedClipMutation()

  async function onSubmit(input: FormInput, actions: FormikHelpers<FormInput>) {
    try {
      await addClip({
        variables: {
          input: {
            videoID: video.id,
            start,
            quote: input.quote
          }
        }
      })
      actions.resetForm()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Box mt={4} maxWidth={720} marginX="auto">
      <Paper style={{ padding: 16 }}>
        <Formik initialValues={{ quote: "" }} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography variant="body2" component="p">
                    To suggest a new clip, adjust the video player to be at the
                    spot where the clip should start.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    Start Time: <Timestamp seconds={start} />
                  </Typography>
                </Grid>
                <Grid item>
                  <Field
                    as={TextField}
                    name="quote"
                    label="Quote"
                    multiline
                    fullWidth
                    margin="dense"
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Suggesting..." : "Suggest"}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  )
}

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
