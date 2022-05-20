import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Delete as DeleteIcon,
  Edit,
} from '@mui/icons-material'
import {
  Divider as MuiDivider,
  IconButton as MuiIconButton,
  Tooltip as MuiTooltip,
} from '@mui/material'
import React from 'react'
import { RadioButton } from '../../../../../shared'
import {
  MoreActionOption,
  MoreActionsButton,
} from '../../../../../shared/components'
import { CollectionColumn, labels } from '../../../../../shared'
import { useWindowSize } from '../../../../AppBase/WindowSizeProvider'
import {
  DividerDiv,
  StateFlexDiv,
  IconButtonDiv,
  InDesktopListIcon,
  InMobileListIcon,
  SearchableIcon,
  SortableIcon,
  TileDiv,
  PropertyGridDiv,
  PropDiv,
  PropNameDiv,
  PropTextDiv,
  ButtonsDiv,
  MoveButtonsDiv,
  MoreButtonDiv,
} from './ColumnTile.styles'

interface IconbButtonProps {
  onClick: () => void
  gridArea?: string
  tooltip?: string
  disabled?: boolean
  visible?: boolean
}

export const IconButton: React.FC<IconbButtonProps> = ({
  gridArea,
  children,
  onClick,
  tooltip,
  disabled,
  visible = true,
}) => {
  return (
    <div style={{ visibility: visible ? 'visible' : 'hidden' }}>
      {tooltip ? (
        <MuiTooltip title={tooltip} placement="top" arrow>
          <IconButtonDiv gridArea={gridArea ?? ''}>
            <MuiIconButton onClick={onClick} disabled={disabled}>
              {children}
            </MuiIconButton>
          </IconButtonDiv>
        </MuiTooltip>
      ) : (
        <IconButtonDiv gridArea={gridArea ?? ''}>
          <MuiIconButton onClick={onClick} disabled={disabled}>
            {children}
          </MuiIconButton>
        </IconButtonDiv>
      )}
    </div>
  )
}

interface ColumnTileProps {
  length: number
  index: number
  column: CollectionColumn
  clickSetDefaultSort: (column: CollectionColumn) => void
  onStateChange: (column: CollectionColumn) => void
  onMoveUpward: (column: CollectionColumn) => void
  onMoveDownward: (column: CollectionColumn) => void
  onEdit: (column: CollectionColumn) => void
  onDelete: (column: CollectionColumn) => void
}

export const ColumnTile: React.FC<ColumnTileProps> = ({
  length,
  index,
  column,
  clickSetDefaultSort,
  onStateChange,
  onMoveUpward,
  onMoveDownward,
  onEdit,
  onDelete,
}) => {
  const { isMobileView } = useWindowSize()

  const onRadioClick = (value: any) => {
    clickSetDefaultSort(value as CollectionColumn)
  }

  const onChangeSortable = () => {
    column.sortable = !column.sortable
    if (!column.sortable) {
      column.default_order_by = false
    }
    onStateChange(column)
  }

  const onChangeSearchable = () => {
    column.searchable = !column.searchable
    onStateChange(column)
  }

  const onChangeShowInDesktop = () => {
    column.show_in_desktop = !column.show_in_desktop
    onStateChange(column)
  }

  const onChangeShowInMobile = () => {
    column.show_in_mobile = !column.show_in_mobile
    onStateChange(column)
  }

  const onMoveUpwardClick = () => {
    onMoveUpward(column)
  }

  const onMoveDownwardClick = () => {
    onMoveDownward(column)
  }

  const tileOptions: Array<MoreActionOption> = [
    {
      type: 'item',
      label: labels.BUTTON_EDIT,
      icon: <Edit />,
      onClick: () => {
        onEdit(column)
      },
    },
    { type: 'divider' },
    {
      type: 'item',
      label: labels.BUTTON_DELETE,
      icon: <DeleteIcon />,
      onClick: () => {
        onDelete(column)
      },
    },
  ]

  const disabledUpward = index === 0
  const disabledDownward = index === length - 1

  return (
    <TileDiv>
      <ButtonsDiv>
        <MoveButtonsDiv>
          <IconButton
            gridArea="up"
            onClick={onMoveUpwardClick}
            disabled={disabledUpward}
            visible={!disabledUpward}
          >
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton
            gridArea="down"
            onClick={onMoveDownwardClick}
            disabled={disabledDownward}
            visible={!disabledDownward}
          >
            <ArrowDownwardIcon />
          </IconButton>
        </MoveButtonsDiv>
        <MoreButtonDiv>
          <MoreActionsButton options={tileOptions} />
        </MoreButtonDiv>
      </ButtonsDiv>

      <PropertyGridDiv
        isEnum={column.type === 'enum'}
        isMobileView={isMobileView}
      >
        <PropDiv area="name">
          <PropNameDiv>{labels.PROP_NAME}</PropNameDiv>
          <PropTextDiv>{column.title}</PropTextDiv>
        </PropDiv>
        <PropDiv area="type">
          <PropNameDiv>{labels.PROP_Type}</PropNameDiv>
          <PropTextDiv>
            {column.type === 'string'
              ? labels.TYPE_TEXT
              : column.type === 'number'
              ? labels.TYPE_NUMBER
              : labels.TYPE_CUSTOM}
          </PropTextDiv>
        </PropDiv>
        {column.type === 'enum' && (
          <PropDiv area="enum">
            <PropNameDiv>{labels.PROP_VALUES}</PropNameDiv>
            <PropTextDiv>{column.enum.join(', ')}</PropTextDiv>
          </PropDiv>
        )}
      </PropertyGridDiv>

      <StateFlexDiv>
        <RadioButton
          label="default sort"
          lablePlacement="start"
          checked={column.default_order_by}
          value={column}
          onClick={onRadioClick}
          disabled={!column.sortable}
        />
        <DividerDiv>
          <MuiDivider sx={{ height: '80%', m: 0.5 }} orientation="vertical" />
        </DividerDiv>
        <IconButton
          gridArea="sort"
          onClick={onChangeSortable}
          tooltip={labels.TOOLTIP_SORTABLE}
        >
          <SortableIcon id={column.sortable ? 'active' : ''} />
        </IconButton>
        <IconButton
          gridArea="search"
          onClick={onChangeSearchable}
          tooltip={labels.TOOLTIP_SEARCHABLE}
        >
          <SearchableIcon id={column.searchable ? 'active' : ''} />
        </IconButton>
        <IconButton
          gridArea="desktop"
          onClick={onChangeShowInDesktop}
          tooltip={labels.TOOLTIP_SHOW_IN_DESKTOP}
        >
          <InDesktopListIcon id={column.show_in_desktop ? 'active' : ''} />
        </IconButton>
        <IconButton
          gridArea="mobile"
          onClick={onChangeShowInMobile}
          tooltip={labels.TOOLTIP_SHOW_IN_MOBILE}
        >
          <InMobileListIcon id={column.show_in_mobile ? 'active' : ''} />
        </IconButton>
      </StateFlexDiv>
    </TileDiv>
  )
}

export default ColumnTile
