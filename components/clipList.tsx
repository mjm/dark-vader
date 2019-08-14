import React from "react"
import { BasicClipDetailsFragment } from "../lib/generated/graphql-components"
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  makeStyles,
  createStyles
} from "@material-ui/core"
import Link from "next/link"
import { Timestamp } from "./timestamp"
import Markdown from "react-markdown"
import { QuoteText } from "./quote"

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

export const ClipList: React.FC<{ clips: BasicClipDetailsFragment[] }> = ({
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
                <ListItemText primary={<QuoteText>{clip.quote}</QuoteText>} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </Box>
  )
}
