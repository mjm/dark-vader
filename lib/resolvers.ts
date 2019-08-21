import {
  QueryResolvers,
  VideoResolvers,
  ClipResolvers,
  MutationResolvers
} from "./generated/graphql"
import { videos, clips, proposedClips } from "./airtable"

export const Query: QueryResolvers = {
  async videos(_, {}, { cache }) {
    return await cache.getOrCache(
      "videos",
      async () =>
        await videos
          .select({
            sort: [{ field: "Published", direction: "asc" }]
          })
          .all(),
      { expire: 7200, refresh: false }
    )
  },

  async video(_, { id }, { cache }) {
    return await cache.getOrCache(
      ["videos", id],
      async () => await videos.find(id),
      {
        expire: true,
        extraKeys: video => [["videos", "ytid", video.fields["Video ID"]]]
      }
    )
  },

  async clip(_, { id }, { cache }) {
    return await cache.getOrCache(
      ["clips", id],
      async () => await clips.find(id),
      {
        expire: true,
        extraKeys: clip => [["clips", "id", clip.fields["ID"].toString()]]
      }
    )
  },

  async randomClip(_, {}, { cache }) {
    const highestID = await cache.getOrCache(
      "highest-id",
      async () => {
        const highestIDClips = await clips
          .select({
            sort: [{ field: "ID", direction: "desc" }],
            maxRecords: 1
          })
          .firstPage()
        return highestIDClips[0].fields["ID"]
      },
      { expire: true, refresh: false }
    )

    while (true) {
      const randomID = Math.floor(Math.random() * Math.floor(highestID)) + 1

      const clip = await cache.getOrCache(
        ["clips", "id", `${randomID}`],
        async () => {
          const clipArray = await clips
            .select({
              filterByFormula: `{ID} = ${randomID}`,
              maxRecords: 1
            })
            .firstPage()
          if (clipArray.length) {
            return clipArray[0]
          } else {
            console.log("missed random clip", randomID)
            return "not-found"
          }
        },
        {
          expire: true,
          extraKeys: clip => (clip === "not-found" ? [] : [["clips", clip.id]])
        }
      )
      if (clip !== "not-found") {
        return clip
      }
    }
  }
}

export const Mutation: MutationResolvers = {
  async addProposedClip(_, { input }) {
    const clip = await proposedClips.create({
      Video: [input.videoID],
      "Start Time": input.start,
      "Quote Text": input.quote
    })

    return { id: clip.id }
  }
}

export const Clip: ClipResolvers = {
  async video({ fields }, {}, { cache }) {
    const [videoID] = fields["Video"]

    return await cache.getOrCache(
      ["videos", videoID],
      async () => videos.find(videoID),
      {
        expire: true,
        extraKeys: video => [["videos", "ytid", video.fields["Video ID"]]]
      }
    )
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
  },

  async clips({ fields }, {}, { cache }) {
    const videoID = fields["Video ID"]
    return await cache.getOrCache(
      ["clips", videoID],
      async () =>
        await clips
          .select({
            filterByFormula: `{Video} = '${videoID}'`,
            sort: [{ field: "Start Time", direction: "asc" }]
          })
          .all(),
      { expire: true, refresh: false }
    )
  }
}
