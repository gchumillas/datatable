import React from 'react'
import clsx from 'clsx'
import _ from 'lodash'
import { Button, ButtonGroup, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// TODO: download icons and remove peer dependency
import {
  FirstPage as FirstIcon,
  LastPage as LastIcon,
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon
} from '@material-ui/icons'
import context from './context'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  selectedBtn: {
    backgroundColor: theme.palette.action.selected
  }
}))

export type PaginatorProps = {
  page: number
  onSelectPage: (page: number) => void
}

export default ({ page: _page, onSelectPage }: PaginatorProps) => {
  const classes = useStyles()
  const { numPages, maxPages, label } = React.useContext(context)
  const [offset, setOffset] = React.useState(0)
  const page0 = React.useMemo(() => Math.max(0, offset), [offset])
  const page1 = React.useMemo(() => Math.max(page0, Math.min(numPages, offset + maxPages) - 1), [
    offset,
    page0,
    numPages,
    maxPages
  ])
  const page = React.useMemo(() => Math.max(0, Math.min(numPages - 1, _page)), [_page, numPages])
  const hideArrowButtons = maxPages < numPages

  React.useEffect(() => {
    if (page < offset) {
      setOffset(page)
    } else if (page > page1) {
      setOffset(page - maxPages + 1)
    }
  }, [page, offset, page1, maxPages])

  return (
    <Box className={classes.root}>
      <div>{label && label({ page, numPages })}</div>
      <ButtonGroup size="small">
        {hideArrowButtons && [
          <Button key={0} disabled={page <= 0} onClick={() => onSelectPage(0)}>
            <FirstIcon />
          </Button>,
          <Button key={1} disabled={page <= 0} onClick={() => onSelectPage(page - 1)}>
            <PrevIcon />
          </Button>
        ]}
        {_.range(page0, page1 + 1).map(value => (
          <Button
            key={value}
            className={clsx({ [classes.selectedBtn]: value == page })}
            onClick={() => onSelectPage(value)}
          >
            {value + 1}
          </Button>
        ))}
        {hideArrowButtons && [
          <Button key={0} disabled={page >= numPages - 1} onClick={() => onSelectPage(page + 1)}>
            <NextIcon />
          </Button>,
          <Button
            key={1}
            disabled={page >= numPages - 1}
            onClick={() => onSelectPage(numPages - 1)}
          >
            <LastIcon />
          </Button>
        ]}
      </ButtonGroup>
    </Box>
  )
}
