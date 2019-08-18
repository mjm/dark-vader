import React from "react"
import Router from "next/router"

interface RouterEventHandlers {
  [key: string]: (...evts: any[]) => void
}

export const useRouterEvents = (
  handlers: RouterEventHandlers,
  deps: readonly any[]
) => {
  React.useEffect(() => {
    for (const eventName of Object.keys(handlers)) {
      Router.events.on(eventName, handlers[eventName])
    }

    return () => {
      for (const eventName of Object.keys(handlers)) {
        Router.events.off(eventName, handlers[eventName])
      }
    }
  }, deps)
}
