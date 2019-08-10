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
  Breadcrumbs,
  Box,
  Link
} from "@material-ui/core"
import AutorenewIcon from "@material-ui/icons/Autorenew"
import Router from "next/router"
import Head from "next/head"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(3)
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
      <Head>
        <title>Monster Factory!</title>
      </Head>
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
        {children}
        <Box mt={6}>
          <Typography variant="body2" color="textSecondary" align="center">
            Created by{" "}
            <Link
              href="https://www.mattmoriarity.com/"
              target="_blank"
              rel="noopener"
            >
              Matt Moriarity
            </Link>
            . Source code available on{" "}
            <Link
              href="https://github.com/mjm/dark-vader/"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </Link>
            .
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default Layout
