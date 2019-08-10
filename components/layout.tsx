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
  Paper,
  Breadcrumbs
} from "@material-ui/core"
import AutorenewIcon from "@material-ui/icons/Autorenew"
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
      flexGrow: 1,
      color: theme.palette.common.white
    },
    icon: {
      marginRight: theme.spacing(0.5)
    }
  })
)

interface Props {
  breadcrumbs?: React.ReactNode
}

const Layout: React.FC<Props> = ({ breadcrumbs, children }) => {
  const classes = useStyles({})

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Breadcrumbs className={classes.title}>
            <Typography variant="h6" color="inherit">
              Monster Factory
            </Typography>
            {breadcrumbs}
          </Breadcrumbs>
          <Button
            color="default"
            variant="contained"
            onClick={() => {
              Router.push("/clips/random")
            }}
          >
            <AutorenewIcon className={classes.icon} />
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
