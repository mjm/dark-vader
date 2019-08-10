import {
  Box,
  Typography,
  Card,
  Grid,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core"
import YouTube from "react-youtube"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    quote: {
      padding: theme.spacing(3)
    }
  })
)

interface Props {
  clip: any
}

export const Clip: React.FC<Props> = ({ clip }) => {
  return (
    <Grid container direction="column" alignItems="center">
      <YouTube
        videoId={clip.video.videoID}
        opts={{
          width: "720",
          height: "405",
          playerVars: { start: clip.start, autoplay: 1 }
        }}
      />
      <ClipQuote text={clip.quote} />
    </Grid>
  )
}

const ClipQuote: React.FC<{ text: string }> = ({ text }) => {
  const classes = useStyles({})

  return (
    <Box maxWidth={720} mt={2}>
      <Card className={classes.quote}>
        <Typography variant="body1">{text}</Typography>
      </Card>
    </Box>
  )
}
