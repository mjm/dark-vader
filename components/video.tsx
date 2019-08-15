import React from "react"
import {
  Typography,
  Card,
  makeStyles,
  Theme,
  createStyles,
  CardMedia,
  CardContent
} from "@material-ui/core"
import YouTube, { PlayerVars } from "react-youtube"
import {
  BasicVideoDetailsFragment,
  VideoDetailsFragment
} from "../lib/generated/graphql-components"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: 720,
      marginLeft: "auto",
      marginRight: "auto"
    },
    content: {
      paddingTop: theme.spacing(3)
    }
  })
)

interface Props {
  video: VideoDetailsFragment
  onTimeChange?: (time: number) => void
}

export const Video = React.forwardRef<VideoCardMediaRef, Props>(
  ({ video, onTimeChange }, ref) => {
    const classes = useStyles({})

    return (
      <Card className={classes.card}>
        <VideoCardMedia ref={ref} video={video} onTimeChange={onTimeChange} />
        <CardContent className={classes.content}>
          <Typography variant="subtitle2">
            Published {video.published}
          </Typography>
          <Typography variant="body1">Starring {video.monsterName}</Typography>
        </CardContent>
      </Card>
    )
  }
)

interface VideoCardMediaProps {
  video: BasicVideoDetailsFragment
  autoplay?: boolean
  start?: number
  onTimeChange?: (time: number) => void
}

export interface VideoCardMediaRef {
  seekTo(seconds: number): void
}

export const VideoCardMedia = React.forwardRef<
  VideoCardMediaRef,
  VideoCardMediaProps
>(({ video, autoplay, start, onTimeChange }, ref) => {
  const player = React.useRef<any>(null)

  React.useImperativeHandle(ref, () => {
    return {
      seekTo(seconds: number) {
        if (player.current) {
          player.current.seekTo(seconds, true)
        }
      }
    }
  })

  React.useEffect(() => {
    if (onTimeChange) {
      const interval = setInterval(() => {
        if (player.current) {
          const time = player.current.getCurrentTime()
          onTimeChange(Math.floor(time))
        }
      })

      return () => clearInterval(interval)
    }
  }, [onTimeChange])

  const playerVars: PlayerVars = { autoplay: autoplay ? 1 : 0 }
  if (start) {
    playerVars.start = start
  }

  return (
    <CardMedia
      component={YouTube}
      videoId={video.videoID}
      image="foo"
      opts={{
        width: "720",
        height: "405",
        playerVars
      }}
      onReady={evt => {
        player.current = evt.target
      }}
    />
  )
})
