import React from 'react'
import { MAX_WIDTH_MOBILE_VIEW } from '../resources'

interface WindowSize {
  width: number
  height: number
}

interface WindowSizeContextType {
  windowSize: WindowSize
  isMobileView: boolean
}

export const WindowSizeContext = React.createContext<WindowSizeContextType>(
  null!
)

interface WindowSizeProviderProps {}

const WindowSizeProvider: React.FC<WindowSizeProviderProps> = ({
  children,
}) => {
  const [windowSize, setWindowSize] = React.useState<WindowSize>({
    width: Number.MAX_VALUE,
    height: Number.MAX_VALUE,
  })
  React.useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  const value: WindowSizeContextType = {
    windowSize,
    isMobileView: windowSize.width <= MAX_WIDTH_MOBILE_VIEW,
  }

  return (
    <WindowSizeContext.Provider value={value}>
      {children}
    </WindowSizeContext.Provider>
  )
}

export default WindowSizeProvider

export const useWindowSize = () => {
  return React.useContext(WindowSizeContext)
}
