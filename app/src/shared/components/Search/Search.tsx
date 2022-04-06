import { Search as SearchIcon } from '@mui/icons-material'
import {
  IconButton as MuiIconButton,
  InputBase as MuiInputBase,
  Paper as MuiPaper,
} from '@mui/material'
import React from 'react'
import { INVALID_SEARCH_CHARS_MAPPING } from '../../../components/AppBase'
import { useWindowSize } from '../../../components/AppBase/WindowSizeProvider'

interface SearchProps {
  searchFor: string
  setSearch: (newSearch: string | undefined) => void
  searchForSelector?: React.ReactNode
}

export const Search: React.FC<SearchProps> = ({
  searchFor,
  setSearch,
  searchForSelector,
}) => {
  const { isMobileView } = useWindowSize()

  const onChange = (newSearch: string | undefined) => {
    let checkedSearch = newSearch
    if (checkedSearch !== undefined) {
      INVALID_SEARCH_CHARS_MAPPING.forEach((char) => {
        if (checkedSearch !== undefined) {
          while (checkedSearch.includes(char[0])) {
            checkedSearch = checkedSearch.replace(char[0], char[1])
          }
        }
      })
    }

    checkedSearch?.trim()

    setSearch(checkedSearch)
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
        placeholder={`Search ${searchFor}`}
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(event) => {
          const newSearch = event.target.value
          onChange(newSearch && newSearch.length > 0 ? newSearch : undefined)
        }}
      />
      <MuiIconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </MuiIconButton>
      {searchForSelector ?? null}
    </MuiPaper>
  )
}

export default Search
