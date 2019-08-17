import React from "react"
import {
  Typography,
  Card,
  makeStyles,
  Theme,
  createStyles,
  CardContent,
  Button
} from "@material-ui/core"
import { VideoCardMedia, VideoCardMediaRef } from "./video"
import { ClipDetailsFragment } from "../lib/generated/graphql-components"
import { QuoteText } from "./quote"
import ReplayIcon from "@material-ui/icons/Replay"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 720,
      marginLeft: "auto",
      marginRight: "auto"
    },
    content: {
      paddingTop: theme.spacing(3)
    }
  })
)

interface Props {
  clip: ClipDetailsFragment
}

export const Clip: React.FC<Props> = ({ clip }) => {
  const classes = useStyles({})

  const videoRef = React.useRef<VideoCardMediaRef>(null)

  return (
    <Card className={classes.card}>
      <VideoCardMedia
        ref={videoRef}
        video={clip.video}
        autoplay
        start={clip.start}
      />
      <CardContent className={classes.content}>
        <Typography variant="body1" component="div">
          <QuoteText>{clip.quote}</QuoteText>
        </Typography>
        <Button
          style={{ marginTop: 8 }}
          color="primary"
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.seekTo(clip.start)
            }
          }}
        >
          <ReplayIcon style={{ marginRight: 4 }} />
          Replay
        </Button>
      </CardContent>
    </Card>
  )
}
