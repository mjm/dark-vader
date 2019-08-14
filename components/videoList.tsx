import { useAllVideosQuery } from "../lib/generated/graphql-components"
import { List, ListItem } from "@material-ui/core"
import Link from "next/link"

export const VideoList: React.FC = () => {
  const { loading, error, data } = useAllVideosQuery()

  if (loading) {
    return <div>Loading videos...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const videos = data.videos
  return (
    <List>
      {videos.map(video => (
        <Link
          key={video.id}
          href="/videos/[videoId]"
          as={`/videos/${video.id}`}
          passHref
        >
          <ListItem button component="a">
            {video.name}
          </ListItem>
        </Link>
      ))}
    </List>
  )
}
