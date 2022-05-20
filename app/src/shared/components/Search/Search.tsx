import { Search as SearchIcon } from '@mui/icons-material'
import {
  IconButton as MuiIconButton,
  InputBase as MuiInputBase,
  Paper as MuiPaper,
} from '@mui/material'
import React from 'react'
import { INVALID_SEARCH_CHARS_MAPPING } from '../../../components/AppBase'
import { useWindowSize } from '../../../components/AppBase/WindowSizeProvider'
import { labels } from '../../resources'

interface SearchProps {
  searchFor: string
  setSearch: (newSearch: string) => void
  searchForSelector?: React.ReactNode
}

export const Search: React.FC<SearchProps> = ({
  searchFor,
  setSearch,
  searchForSelector,
}) => {
  const { isMobileView } = useWindowSize()

  const [currentSearch, setCurrentSearch] = React.useState<string>('')

  const onChange = (newSearch: string) => {
    let checkedSearch = newSearch
    if (checkedSearch !== undefined) {
      INVALID_SEARCH_CHARS_MAPPING.forEach((char) => {
        checkedSearch = checkedSearch.replaceAll(char[0], char[1])
      })
    }
    checkedSearch.trim()
    setCurrentSearch(checkedSearch)
  }

  const onSubmit = (event: any) => {
    if (event) {
      event.preventDefault()
    }

    setSearch(currentSearch)
  }

  return (
    <MuiPaper
      component="form"
      variant="outlined"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: isMobileView ? '100%' : 400,
      }}
    >
      <MuiInputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={labels.SEARCH(searchFor)}
        onChange={(event) => {
          const newSearch = event.target.value
          onChange(newSearch)
        }}
        type="text"
        onSubmit={onSubmit}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            onSubmit(event)
          }
        }}
      />
      <MuiIconButton
        type="button"
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={onSubmit}
      >
        <SearchIcon />
      </MuiIconButton>
      {searchForSelector ?? null}
    </MuiPaper>
  )
}

export default Search
