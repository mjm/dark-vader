import React from "react"
import { NextPage } from "next"
import { Router } from "next/router"
import {
  useGetVideoQuery,
  useAddProposedClipMutation,
  BasicVideoDetailsFragment
} from "../../lib/generated/graphql-components"
import Layout from "../../components/layout"
import { Video } from "../../components/video"
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid
} from "@material-ui/core"
import Head from "next/head"
import withData from "../../components/apollo"
import { Formik, FormikHelpers, Form, Field } from "formik"
import { Timestamp } from "../../components/timestamp"
import { ClipList } from "../../components/clipList"

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
