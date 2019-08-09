import Airtable from "airtable"

const base = new Airtable().base("appMFtJSYaRi5uoUO")

export const videos = base("Videos")
export const clips = base("Clips")
