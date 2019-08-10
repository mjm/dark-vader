import { Box, Typography } from "@material-ui/core"
import YouTube from "react-youtube"

interface Props {
  clip: any
}

export const Clip: React.FC<Props> = ({ clip }) => {
  return (
    <Box textAlign="center">
      <Typography variant="h4">{clip.video.name}</Typography>
      <YouTube
        videoId={clip.video.videoID}
        opts={{
          width: "720",
          height: "405",
          playerVars: { start: clip.start, autoplay: 1 }
        }}
      />
      <Typography variant="body1">{clip.quote}</Typography>
    </Box>
  )
}
