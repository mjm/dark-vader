import Airtable from "airtable"

const base = new Airtable().base("appMFtJSYaRi5uoUO")

export interface Video {
  "Video ID": string
  "Video URL": string
  Name: string
  Game: string
  "Monster Name": string
  Published: string
  Clips: string[]
}

export const videos = base<Video>("Videos")

export interface Clip {
  ID: number
  Video: [string]
  "Start Time": number
  "Quote Text": string
}

export const clips = base<Clip>("Clips")

export interface ProposedClip extends Clip {}

export const proposedClips = base<ProposedClip>("Proposed Clips")
