import styled from 'styled-components'
import {
  DesktopWindows,
  PhoneAndroid,
  Search,
  SortByAlpha,
} from '@mui/icons-material'
import {
  COLOR_ACTIVE_ICON,
  COLLECTION_EDIT_PROP_NAME_WIDTH,
} from '../../../../AppBase'

export const TileDiv = styled.div`
  && {
  }
`

export const DividerDiv = styled.div`
  && {
    margin: 0 8px;
  }
`

export const ButtonsDiv = styled.div`
  && {
    display: grid;
    grid-template-areas: 'move . . more';
    grid-template-columns: 50px auto auto 50px;
  }
`

export const MoveButtonsDiv = styled.div`
  && {
    grid-area: move;
    display: grid;
    grid-template-areas: 'up down';
  }
`

export const MoreButtonDiv = styled.div`
  && {
    grid-area: more;
  }
`

interface PropertyGridDivProps {
  isMobileView: boolean
  isEnum: boolean
}
export const PropertyGridDiv = styled.div<PropertyGridDivProps>`
  && {
    display: grid;
    grid-template-areas: ${({ isMobileView }) =>
        isMobileView
          ? `'name name name name' 'type type type type'`
          : `'name name type type'`} ${({ isEnum }) =>
        isEnum && `'enum enum enum enum'`};
    grid-template-columns: 25% 25% 25% 25%;
    ${({ isEnum }) => isEnum && `row-gap: 8px;`}
    margin-bottom: 16px;
  }
`

interface PropDivProps {
  area: string
}
export const PropDiv = styled.div<PropDivProps>`
  && {
    width: 100%;
    grid-area: ${({ area }) => area};
    display: grid;
    grid-template-areas: 'name text text text';
    grid-template-columns: ${COLLECTION_EDIT_PROP_NAME_WIDTH} auto auto auto;
    grid-template-rows: auto;
  }
`

export const PropNameDiv = styled.div`
  && {
    grid-area: name;
    font-weight: bold;
  }
`

export const PropTextDiv = styled.div`
  && {
    grid-area: text;
    overflow: auto;
  }
`

export const StateFlexDiv = styled.div`
  && {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
`

export const IconButtonDiv = styled.div<{ gridArea: string }>`
  && {
    grid-area: ${({ gridArea }) => gridArea};
  }
`

export const ColumnEnumValuesDiv = styled.div`
  && {
    grid-area: enum;
    margin: auto 0;
  }
`

export const SortableIcon = styled(SortByAlpha)`
  && {
    ${(props) => (props.id === 'active' ? `color: ${COLOR_ACTIVE_ICON}` : '')};
  }
`

export const SearchableIcon = styled(Search)`
  && {
    ${(props) => (props.id === 'active' ? `color: ${COLOR_ACTIVE_ICON}` : '')};
  }
`

export const InDesktopListIcon = styled(DesktopWindows)`
  && {
    ${(props) => (props.id === 'active' ? `color: ${COLOR_ACTIVE_ICON}` : '')};
  }
`

export const InMobileListIcon = styled(PhoneAndroid)`
  && {
    ${(props) => (props.id === 'active' ? `color: ${COLOR_ACTIVE_ICON}` : '')};
  }
`
