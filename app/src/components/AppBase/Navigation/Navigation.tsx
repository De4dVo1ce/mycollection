import React from 'react'
import { Tooltip } from '@mui/material'
import {
  IconDiv,
  LogoDiv,
  NavigationListDiv,
  NavigationListEntryDiv,
  TitleDiv,
} from './Navigation.styles'
import { NavigationEntry } from '../appValues'
import { useNavigate } from 'react-router-dom'
import { LogoDev } from '@mui/icons-material'

const isEntryActive = (path: string): boolean => {
  const mainLocation: string = document.location.pathname
    .toLocaleLowerCase()
    .split('/')[1]
  const mainPath: string = path.toLocaleLowerCase().split('/')[1]
  return mainLocation === mainPath
}

interface NavigationProps {
  navigationEntries: Array<NavigationEntry>
  isMobileView: boolean
}

export const Navigation: React.FC<NavigationProps> = ({
  navigationEntries,
  isMobileView,
}) => {
  const navigate = useNavigate()

  return (
    <>
      <NavigationListDiv>
        <Tooltip title="">
          <LogoDiv isMobileView={isMobileView}>
            <LogoDev />
          </LogoDiv>
        </Tooltip>
        {navigationEntries.map(({ id, title, path: link, icon }, index) => (
          <Tooltip
            key={`${index}-${id}`}
            title={title}
            arrow
            placement="bottom"
            enterDelay={750}
          >
            <NavigationListEntryDiv
              isMobileView={isMobileView}
              active={isEntryActive(link)}
              onClick={() => {
                navigate(link)
              }}
            >
              <IconDiv isMobileView={isMobileView}>{icon}</IconDiv>
              <TitleDiv isMobileView={isMobileView}>{title}</TitleDiv>
            </NavigationListEntryDiv>
          </Tooltip>
        ))}
      </NavigationListDiv>
    </>
  )
}

export default Navigation
