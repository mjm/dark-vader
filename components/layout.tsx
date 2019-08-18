import React from "react"
import clsx from "clsx"
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
  Link,
  IconButton,
  Drawer,
  Divider,
  Hidden,
  useMediaQuery,
  useTheme,
  CircularProgress
} from "@material-ui/core"
import AutorenewIcon from "@material-ui/icons/Autorenew"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import Router from "next/router"
import Head from "next/head"
import { VideoList } from "./videoList"

const drawerWidth = 300

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: "0 8px",
      ...theme.mixins.toolbar,
      justifyContent: "flex-end"
    },
    title: {
      flexGrow: 1,
      color: theme.palette.common.white
    },
    icon: {
      marginRight: theme.spacing(0.5)
    },
    content: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth,
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3)
      }
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    },
    buttonText: {
      flexShrink: 0
    },
    toolbar: {
      height: theme.spacing(7),
      overflowY: "hidden",
      [theme.breakpoints.up("sm")]: {
        height: theme.spacing(8)
      }
    },
    container: {
      [theme.breakpoints.down("xs")]: {
        padding: 0
      }
    }
  })
)

interface Props {
  breadcrumbs?: React.ReactNode | React.ReactNode[]
}

const Layout: React.FC<Props> = ({ breadcrumbs, children }) => {
  const theme = useTheme()
  const isMobile = !useMediaQuery(theme.breakpoints.up("sm"), {
    defaultMatches: true
  })
  const isSmall = !useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true
  })
  const classes = useStyles({})
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [randomizing, setRandomizing] = React.useState(false)

  React.useEffect(() => {
    const routeChangeStart = (url: string) => {
      setMenuOpen(false)
      if (url === "/clips/random") {
        setRandomizing(true)
      }
    }

    const routeChangeComplete = () => {
      setRandomizing(false)
    }

    const routeChangeError = () => {
      setRandomizing(false)
    }

    Router.events.on("routeChangeStart", routeChangeStart)
    Router.events.on("routeChangeComplete", routeChangeComplete)
    Router.events.on("routeChangeError", routeChangeError)
    return () => {
      Router.events.off("routeChangeStart", routeChangeStart)
      Router.events.off("routeChangeComplete", routeChangeComplete)
      Router.events.off("routeChangeError", routeChangeError)
    }
  }, [setMenuOpen])

  return (
    <Box display="flex">
      <Head>
        <title>Monster Factory!</title>
      </Head>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: menuOpen
        })}
      >
        <Toolbar className={classes.toolbar}>
          {menuOpen ? null : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Breadcrumbs
            className={classes.title}
            maxItems={isMobile ? 1 : isSmall ? 2 : 4}
            itemsBeforeCollapse={0}
            itemsAfterCollapse={isMobile ? 1 : 2}
          >
            <Typography variant="h6" color="inherit">
              Monster Factory
            </Typography>
            {breadcrumbs}
          </Breadcrumbs>
          <Hidden implementation="css" smDown>
            <Button
              color="default"
              variant="contained"
              onClick={() => {
                Router.push("/clips/random")
              }}
            >
              {randomizing ? (
                <Box mr={1} height={20}>
                  <CircularProgress size={20} color="inherit" />
                </Box>
              ) : (
                <AutorenewIcon className={classes.icon} />
              )}
              <span className={classes.buttonText}>Random Clip!</span>
            </Button>
          </Hidden>
          <Hidden implementation="css" mdUp>
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => Router.push("/clips/random")}
            >
              {randomizing ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <AutorenewIcon />
              )}
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={menuOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setMenuOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <VideoList />
      </Drawer>
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: menuOpen
        })}
      >
        <div className={classes.drawerHeader} />
        <Container className={classes.container}>
          {children}
          <Box mt={6} mb={4}>
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
      </div>
    </Box>
  )
}

export default Layout
