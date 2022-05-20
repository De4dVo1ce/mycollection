import hotkeys, { HotkeysEvent } from 'hotkeys-js'
import React from 'react'

type CallbackFn = (event: KeyboardEvent, handler: HotkeysEvent) => void

export const useKeyShortcut = (
  keys: string,
  callback: CallbackFn,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  deps: Array<any> = []
) => {
  React.useEffect(
    () => {
      hotkeys.filter = () => {
        return true
      }
      hotkeys(keys, callback)

      return () => hotkeys.unbind(keys)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [keys, callback]
  )
}
