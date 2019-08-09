import { QueryResolvers, VideoResolvers } from "./generated/graphql"
import { videos } from "./airtable"

export const Query: QueryResolvers = {
  async videos() {
    return (await videos
      .select({
        sort: [{ field: "Published", direction: "asc" }]
      })
      .all()) as Airtable.Row<{}>[]
  }
}

export const Video: VideoResolvers = {
  name({ fields }) {
    return fields["Name"]
  },

  videoID({ fields }) {
    return fields["Video ID"]
  },

  videoURL({ fields }) {
    return fields["Video URL"]
  },

  game({ fields }) {
    return fields["Game"]
  },

  monsterName({ fields }) {
    return fields["Monster Name"]
  },

  published({ fields }) {
    return fields["Published"]
  }
}
