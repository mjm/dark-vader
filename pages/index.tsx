import { NextPage } from "next"
import Router from "next/router"

const Home: NextPage = () => null

Home.getInitialProps = async ({ req, res }) => {
  if (req) {
    res.writeHead(301, { Location: "/clips/random" })
    res.end()
  } else {
    Router.replace("/clips/random")
  }

  return {}
}

export default Home
