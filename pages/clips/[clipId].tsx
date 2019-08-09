import React from "react"
import { NextPage } from "next"
import withData from "../../components/apollo"
import { useGetClipQuery } from "../../lib/generated/graphql-components"
import { Clip } from "../../components/clip"
import { Box, Button } from "@material-ui/core"
import Router from "next/router"

interface Props {
  clipId: string
}

const ShowClip: NextPage<Props> = ({ clipId }) => {
  const { loading, error, data } = useGetClipQuery({
    variables: { id: clipId }
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const clip = data.clip
  return (
    <Box>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          Router.push("/clips/random")
        }}
      >
        Random
      </Button>
      <Clip clip={clip} />
    </Box>
  )
}

ShowClip.getInitialProps = async ({ query }): Promise<Props> => {
  // @ts-ignore
  return { clipId: query.clipId }
}

export default withData(ShowClip)
