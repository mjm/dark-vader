import React from "react"
import Markdown from "react-markdown"
import { makeStyles, Theme, createStyles } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    quote: {
      "& p": {
        marginTop: 0,
        marginBottom: theme.spacing(2),
        "&:last-child": {
          marginBottom: 0
        }
      }
    }
  })
)

export const QuoteText: React.FC = ({ children }) => {
  const classes = useStyles({})

  return <Markdown className={classes.quote}>{children}</Markdown>
}
