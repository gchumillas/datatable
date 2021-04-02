import React from 'react'

export default React.createContext<{
  numPages: number
  maxPages: number
  label?: (props: { page: number; numPages: number }) => React.ReactNode
}>({
  numPages: 0,
  maxPages: 0
})
