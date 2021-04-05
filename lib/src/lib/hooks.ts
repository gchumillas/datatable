import React from 'react'
import _ from 'lodash'
import { toString } from './utils'
import { Row, InternalRow, Column, ColumnSort } from '../types'

export const useSort = ({
  rows,
  columns,
  columnsSort
}: {
  rows: Row[]
  columns: Column[]
  columnsSort?: ColumnSort[]
}) => {
  const computedRows: InternalRow[] = React.useMemo(
    () =>
      rows.map(row => ({
        id: { value: row.id, computed: row.id },
        ..._.mapValues(
          _.keyBy(columns, col => col.name),
          ({ name, computed: comp, sorted }) => {
            const computed = comp ? comp(row) : toString(row[name])
            const value = sorted ? sorted?.(row) : computed
            return { value, computed }
          }
        )
      })),
    [rows, columns]
  )

  return React.useMemo(() => {
    return columnsSort
      ? _.orderBy(
          computedRows,
          columnsSort.map(sort => row => {
            const item = row[sort.name]
            const { value } = item
            return _.isString(value) ? _.toLower(value) : value
          }),
          columnsSort.map(sort => sort.direction || 'asc')
        )
      : computedRows
  }, [computedRows, columnsSort])
}

export const usePaginator = ({
  rows,
  rowsPerPage,
  page
}: {
  rows: InternalRow[]
  rowsPerPage: number
  page: number
}) =>
  React.useMemo(() => {
    const numRows = rows.length
    const numPages = Math.floor(numRows / rowsPerPage) + Number(numRows % rowsPerPage > 0)
    const fixedPage = Math.max(Math.min(page, numPages - 1), 0)
    const pageRows = rows.slice(rowsPerPage * fixedPage, rowsPerPage * (fixedPage + 1))

    return { pageRows, numPages }
  }, [page, rows, rowsPerPage])
