import React from 'react'
import _ from 'lodash'
import { toString } from './utils'
import { Row, Column, ColumnSort } from '../types'

export const useSort = ({
  rows,
  columns,
  columnsSort
}: {
  rows: Row[]
  columns: Column[]
  columnsSort?: ColumnSort[]
}) => {
  const computedRows: { [name: string]: { value: any; label: React.ReactNode } }[] = React.useMemo(
    () =>
      rows.map(row => ({
        id: { value: row.id, label: row.id },
        ..._.mapValues(
          _.keyBy(columns, col => col.name),
          ({ name, computed, sorted }) => {
            const label = computed ? computed(row) : toString(row[name])
            const value = sorted ? sorted?.(row) : label
            return { value, label }
          }
        )
      })),
    [rows, columns]
  )

  return React.useMemo(() => {
    const rows = columnsSort
      ? _.orderBy(
          computedRows,
          columnsSort.map(sort => row => {
            const item = row[sort.name]
            const { value } = item
            return _.isString(value) ? _.toLower(value) : value
          }),
          columnsSort.map(sort => sort.direction)
        )
      : computedRows

    return _.map(rows, row => _.mapValues(row, row => row.label)) as Row[]
  }, [computedRows, columnsSort])
}

export const usePaginator = ({
  rows,
  rowsPerPage,
  page
}: {
  rows: Row[]
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
