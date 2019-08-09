import { NextApiRequest, NextApiResponse } from "next"
import { videos } from "../../lib/airtable"

export default async function(_req: NextApiRequest, res: NextApiResponse) {
  const result = await videos
    .select({
      sort: [{ field: "Published", direction: "asc" }]
    })
    .all()
  res.json(
    result.map(record => ({
      id: record.id,
      videoID: record.fields["Video ID"],
      videoURL: record.fields["Video URL"],
      published: record.fields["Published"],
      name: record.fields["Name"],
      monsterName: record.fields["Monster Name"],
      game: record.fields["Game"]
    }))
  )
}
