import {
  QueryResolvers,
  VideoResolvers,
  ClipResolvers
} from "./generated/graphql"
import { videos, clips } from "./airtable"

export const Query: QueryResolvers = {
  async videos() {
    return (await videos
      .select({
        sort: [{ field: "Published", direction: "asc" }]
      })
      .all()) as Airtable.Row<{}>[]
  },

  async clips() {
    return (await clips.select().all()) as Airtable.Row<{}>[]
  },

  async randomClip() {
    const highestIDClips = await clips
      .select({
        sort: [{ field: "ID", direction: "desc" }],
        maxRecords: 1
      })
      .firstPage()
    const highestID = highestIDClips[0].fields["ID"]

    while (true) {
      const randomID = Math.floor(Math.random() * Math.floor(highestID)) + 1
      const clipArray = await clips
        .select({
          filterByFormula: `{ID} = ${randomID}`,
          maxRecords: 1
        })
        .firstPage()
      if (clipArray.length) {
        return clipArray[0]
      }
    }
  }
}

export const Clip: ClipResolvers = {
  async video({ fields }) {
    const [videoID] = fields["Video"]
    return ((await videos.find(videoID)) as unknown) as Airtable.Row<{}>
  },

  start({ fields }) {
    return fields["Start Time"]
  },

  quote({ fields }) {
    return fields["Quote Text"]
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
