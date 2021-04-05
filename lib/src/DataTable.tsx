import React from 'react'
import clsx from 'clsx'
import _ from 'lodash'
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCellProps,
  LinearProgress,
  TableProps,
  Link,
  Button,
  Box,
  BoxProps
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Column, Row, ColumnSort, SortDirection } from './types'
import context from './context'
import { useSort, usePaginator } from './lib/hooks'
import AscIcon from './icons/AscIcon'
import DescIcon from './icons/DescIcon'
import Paginator from './Paginator'

const useStyles = makeStyles(theme => ({
  header: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
    paddingLeft: theme.spacing(3)
  },
  headerTitle: {
    flexGrow: 1
  },
  headerCell: {
    whiteSpace: 'pre-line'
  },
  linearProgress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  },
  footer: {
    padding: theme.spacing(2)
  },
  hidden: {
    visibility: 'hidden'
  },
  xs: {
    '@media (max-width:399.95px)': {
      display: 'none'
    }
  },
  sm: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  md: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  lg: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  xl: {
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  }
}))

export type DataTableProps = {
  title: string
  columns: Column[]
  rows: Row[]
  sort?: ColumnSort | ColumnSort[]
  rowsPerPage?: number
  paginator?: {
    maxPages: number
    label?: (props: { page: number; numPages: number }) => React.ReactNode
  }
  header?: React.ReactNode
  headerProps?: BoxProps
  tableProps?: TableProps
  cellProps?: (row: Row) => TableCellProps | undefined
  loading?: boolean
}

export default ({
  title,
  columns,
  rows,
  sort: defaultColumnsSort,
  rowsPerPage = 10,
  paginator = {
    maxPages: 5,
    label: ({ page, numPages }) => `Page ${page + 1} of ${numPages}`
  },
  header,
  headerProps,
  tableProps,
  cellProps,
  loading
}: DataTableProps) => {
  const classes = useStyles()

  const [columnsSort, setColumnsSort] = React.useState<ColumnSort[]>()
  const sortedRows = useSort({ columns, rows, columnsSort })

  const [page, setPage] = React.useState(0)
  const { pageRows, numPages } = usePaginator({ rows: sortedRows, rowsPerPage, page })

  const sortBy = (name: string) => () => {
    setColumnsSort(columnsSort => {
      const sort = columnsSort?.[0]
      let direction: SortDirection = 'asc'
      if (sort && name == sort.name) {
        direction = sort.direction == 'desc' ? 'asc' : 'desc'
      }

      return [{ name, direction }]
    })
  }

  React.useEffect(() => {
    if (!defaultColumnsSort) {
      return
    }

    const columnsSort = _.isArray(defaultColumnsSort) ? defaultColumnsSort : []
    setColumnsSort(columnsSort)
  }, [defaultColumnsSort])

  return (
    <context.Provider value={{ numPages, ...paginator }}>
      <TableContainer component={Paper} variant="outlined">
        <Box {...headerProps} className={clsx(classes.header, headerProps?.className)}>
          <div>
            <Typography className={classes.headerTitle} variant="h6">
              {title}
            </Typography>
          </div>
          {header && <div>{header}</div>}
          <div>
            <LinearProgress
              className={clsx(classes.linearProgress, { [classes.hidden]: !loading })}
            />
          </div>
        </Box>
        <Table {...tableProps}>
          <TableHead>
            <TableRow>
              {columns.map(col => {
                const sort = columnsSort?.[0]
                let sortIcon: React.ReactNode
                if (sort && col.name == sort.name) {
                  sortIcon = sort.direction == 'desc' ? <DescIcon /> : <AscIcon />
                }

                return (
                  <TableCell
                    key={col.name}
                    className={clsx(
                      classes.headerCell,
                      col.visibility ? classes[col.visibility] : undefined
                    )}
                    style={{ textAlign: col.align as any, width: col.shrink ? 1 : undefined }}
                  >
                    {col.sortable ? (
                      <Link underline="none" onClick={sortBy(col.name)}>
                        <Button endIcon={sortIcon}>{col.label}</Button>
                      </Link>
                    ) : (
                      col.label
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {pageRows.map(internalRow => {
              const row: Row = _.mapValues(internalRow, row => row.value)

              return (
                <TableRow key={row.id}>
                  {columns.map(col => {
                    const props = col.cellProps?.(row) || cellProps?.(row) || {}
                    const { style, ...rest } = props

                    return (
                      <TableCell
                        key={col.name}
                        className={col.visibility ? classes[col.visibility] : undefined}
                        style={{ textAlign: col.align as any, ...style }}
                        {...rest}
                      >
                        {internalRow[col.name].computed}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {numPages > 1 && (
          <div className={classes.footer}>
            <Paginator page={page} onSelectPage={setPage} />
          </div>
        )}
      </TableContainer>
    </context.Provider>
  )
}
