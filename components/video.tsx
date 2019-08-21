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
import YouTube, { PlayerVars, YouTubeProps } from "react-youtube"
import {
  BasicVideoDetailsFragment,
  VideoDetailsFragment
} from "../lib/generated/graphql-components"
import moment from "moment"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 720,
      marginLeft: "auto",
      marginRight: "auto"
    },
    content: {
      paddingTop: theme.spacing(3)
    },
    videoContainer: {
      position: "relative",
      width: "100%",
      height: 0,
      paddingBottom: "56.25%"
    },
    video: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    },
    published: {
      marginBottom: theme.spacing(1)
    },
    emphasized: {
      fontWeight: 500
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
          <Typography variant="subtitle2" className={classes.published}>
            Published {moment(video.published).format("LL")}
          </Typography>
          <Typography variant="body1">
            Playing <span className={classes.emphasized}>{video.game}</span>{" "}
            with <span className={classes.emphasized}>{video.monsterName}</span>
          </Typography>
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
  const classes = useStyles({})
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

  const playerVars: PlayerVars = { playsinline: 1, autoplay: autoplay ? 1 : 0 }
  if (start) {
    playerVars.start = start
  }

  return (
    <CardMedia
      classes={{ root: classes.video }}
      component={FullWidthYouTube}
      image={video.videoID}
      videoId={video.videoID}
      opts={{
        playerVars
      }}
      onReady={evt => {
        player.current = evt.target
      }}
    />
  )
})

const FullWidthYouTube = ({
  opts,
  ...props
}: YouTubeProps & { image: string }) => {
  const classes = useStyles({})

  opts = { ...opts, width: null, height: null }

  return (
    <YouTube
      containerClassName={classes.videoContainer}
      opts={opts}
      {...props}
    />
  )
}
