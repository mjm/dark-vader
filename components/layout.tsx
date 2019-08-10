import {
  Toolbar,
  AppBar,
  Typography,
  Container,
  makeStyles,
  Theme,
  createStyles,
  Button,
  CssBaseline,
  Paper
} from "@material-ui/core"
import Router from "next/router"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2)
    },
    paper: {
      padding: theme.spacing(3)
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
)

const Layout: React.FC = ({ children }) => {
  const classes = useStyles({})

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Random Monster Factory Clips
          </Typography>
          <Button
            color="default"
            variant="contained"
            onClick={() => {
              Router.push("/clips/random")
            }}
          >
            Another!
          </Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Paper className={classes.paper}>{children}</Paper>
      </Container>
    </>
  )
}

export default Layout
