import React from "react"
import Head from "../components/head"
import { NextPage } from "next"
import { Typography, Container } from "@material-ui/core"
import YouTube from "react-youtube"

const Home: NextPage = () => (
  <Container fixed>
    <Head>
      <title>Home</title>
    </Head>

    <Typography variant="h4">Random Monster Factory!</Typography>
    <YouTube
      videoId="TamwFUUd9Yk"
      opts={{
        width: "720",
        height: "405",
        playerVars: { start: 145 }
      }}
    />
    <Typography variant="body1">Oh, you're a sunfish!</Typography>
  </Container>
)

export default Home
