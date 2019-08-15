import React from "react"

export const Timestamp: React.FC<{ seconds: number }> = ({ seconds }) => {
  return <>{formatTimestamp(seconds)}</>
}

export function formatTimestamp(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}:${secs < 10 ? `0${secs}` : secs}`
}
