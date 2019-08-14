import {
  Typography,
  Card,
  makeStyles,
  Theme,
  createStyles,
  CardContent
} from "@material-ui/core"
import Markdown from "react-markdown"
import { VideoCardMedia } from "./video"
import { ClipDetailsFragment } from "../lib/generated/graphql-components"
import { QuoteText } from "./quote"

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
  clip: ClipDetailsFragment
}

export const Clip: React.FC<Props> = ({ clip }) => {
  const classes = useStyles({})

  return (
    <Card className={classes.card}>
      <VideoCardMedia video={clip.video} autoplay start={clip.start} />
      <CardContent className={classes.content}>
        <Typography variant="body1" component="div">
          <QuoteText>{clip.quote}</QuoteText>
        </Typography>
      </CardContent>
    </Card>
  )
}
