import React from "react"
import { NextPage } from "next"
import { Router } from "next/router"
import {
  useGetVideoQuery,
  useAddProposedClipMutation,
  BasicVideoDetailsFragment
} from "../../lib/generated/graphql-components"
import Layout from "../../components/layout"
import { Video, VideoCardMediaRef } from "../../components/video"
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  IconButton,
  Tooltip,
  CircularProgress
} from "@material-ui/core"
import Head from "next/head"
import withData from "../../components/apollo"
import { Formik, FormikHelpers, Form, Field } from "formik"
import { formatTimestamp } from "../../components/timestamp"
import { ClipList } from "../../components/clipList"
import LockIcon from "@material-ui/icons/Lock"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import ReplayIcon from "@material-ui/icons/Replay"

const ShowVideo: NextPage<{ query: Router["query"] }> = ({ query }) => {
  const { videoId } = query

  const videoRef = React.useRef<VideoCardMediaRef>(null)
  const [videoTime, setVideoTime] = React.useState(0)

  function onRewind(seconds: number) {
    if (videoRef.current) {
      videoRef.current.seekTo(seconds)
    }
  }

  const { loading, error, data } = useGetVideoQuery({
    variables: { id: videoId as string }
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

  const video = data.video

  return (
    <Layout
      breadcrumbs={<Typography variant="subtitle1">{video.name}</Typography>}
    >
      <Head>
        <title>Monster Factory: {video.name}</title>
      </Head>

      <Video ref={videoRef} video={video} onTimeChange={setVideoTime} />
      <ProposeClipForm video={video} start={videoTime} onRewind={onRewind} />
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
  start: number | null
}

interface ProposeClipFormProps {
  video: BasicVideoDetailsFragment
  start: number
  onRewind: (seconds: number) => void
}

const ProposeClipForm: React.FC<ProposeClipFormProps> = ({
  video,
  start,
  onRewind
}) => {
  const [addClip] = useAddProposedClipMutation()

  async function onSubmit(input: FormInput, actions: FormikHelpers<FormInput>) {
    try {
      await addClip({
        variables: {
          input: {
            videoID: video.id,
            start: input.start === null ? start : input.start,
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
        <Formik initialValues={{ quote: "", start: null }} onSubmit={onSubmit}>
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography variant="body2" component="p">
                    To suggest a new clip, adjust the video player to be at the
                    spot where the clip should start.
                  </Typography>
                </Grid>
                <Grid item container direction="row">
                  <Grid item>
                    <TextField
                      style={{ width: 80 }}
                      variant="outlined"
                      label="Start Time"
                      disabled
                      value={formatTimestamp(
                        values.start === null ? start : values.start
                      )}
                    />
                  </Grid>
                  <Grid item style={{ marginLeft: 8 }}>
                    <Tooltip
                      title={
                        values.start === null
                          ? "Lock the start time to the current time in the video"
                          : "Unlock the start time so it follows the video"
                      }
                      placement="top"
                    >
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setFieldValue(
                            "start",
                            values.start === null ? start : null
                          )
                        }}
                      >
                        {values.start === null ? (
                          <LockOpenIcon />
                        ) : (
                          <LockIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip
                      title="Rewind the video to the start time of the clip"
                      placement="top"
                    >
                      <IconButton
                        color="primary"
                        onClick={() => {
                          if (values.start !== null) {
                            onRewind(values.start)
                          }
                        }}
                        disabled={values.start === null}
                      >
                        <ReplayIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid item>
                  <Field
                    as={TextField}
                    name="quote"
                    label="Quote"
                    variant="outlined"
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
