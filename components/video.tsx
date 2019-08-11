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
import { BasicVideoDetailsFragment } from "../lib/generated/graphql-components"

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
  video: BasicVideoDetailsFragment
}

export const Video: React.FC<Props> = ({ video }) => {
  const classes = useStyles({})

  return (
    <Card className={classes.card}>
      <VideoCardMedia video={video} />
      <CardContent className={classes.content}>
        <Typography variant="body1">Foo bar</Typography>
      </CardContent>
    </Card>
  )
}

interface VideoCardMediaProps {
  video: BasicVideoDetailsFragment
  autoplay?: boolean
  start?: number
}

export const VideoCardMedia: React.FC<VideoCardMediaProps> = ({
  video,
  autoplay,
  start
}) => {
  const playerVars: PlayerVars = { autoplay: autoplay ? 1 : 0 }
  if (start) {
    playerVars.start = start
  }

  return (
    <CardMedia
      component={YouTube}
      videoId={video.videoID}
      opts={{
        width: "720",
        height: "405",
        playerVars
      }}
    />
  )
}
