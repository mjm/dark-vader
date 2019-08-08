import React from "react"
import { NextPage } from "next"

interface Props {
  clipId: string
}

const ShowClip: NextPage<Props> = ({ clipId }) => {
  return <div>{clipId}</div>
}

ShowClip.getInitialProps = async ({ query }): Promise<Props> => {
  // @ts-ignore
  return { clipId: query.clipId }
}

export default ShowClip
