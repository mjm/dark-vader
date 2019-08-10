import {
  Typography,
  Card,
  makeStyles,
  Theme,
  createStyles,
  CardMedia,
  CardContent
} from "@material-ui/core"
import YouTube from "react-youtube"

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
  clip: any
}

export const Clip: React.FC<Props> = ({ clip }) => {
  const classes = useStyles({})

  return (
    <Card className={classes.card}>
      <CardMedia
        component={YouTube}
        videoId={clip.video.videoID}
        opts={{
          width: "720",
          height: "405",
          playerVars: { start: clip.start, autoplay: 1 }
        }}
      />
      <CardContent className={classes.content}>
        <Typography variant="body1">{clip.quote}</Typography>
      </CardContent>
    </Card>
  )
}
