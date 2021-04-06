import React from 'react'
import _ from 'lodash'
import { toString } from './utils'
import { Row, InternalRow, Column, ColumnSort } from '../types'

export const useComputedRows = ({ rows, columns }: { rows: Row[]; columns: Column[] }) =>
  React.useMemo(
    () =>
      rows.map(row => ({
        id: { value: row.id, sorted: row.id, computed: row.id },
        ..._.mapValues(
          _.keyBy(columns, col => col.name),
          ({ name, computed, sorted }) => {
            const value = row[name]
            const sortedValue = sorted?.(row)
            const computedValue = computed?.(row) ?? toString(row[name])
            return { value, sorted: sortedValue, computed: computedValue }
          }
        )
      })),
    [rows, columns]
  )

export const useSortedRows = ({
  rows,
  columnsSort
}: {
  rows: InternalRow[]
  columnsSort?: ColumnSort[]
}) =>
  React.useMemo(
    () =>
      columnsSort
        ? _.orderBy(
            rows,
            columnsSort.map(sort => row => {
              const item = row[sort.name]
              // sorting preference
              const value = item.sorted ?? item.computed ?? item.value
              return _.isString(value) ? _.toLower(value) : value
            }),
            columnsSort.map(sort => sort.direction || 'asc')
          )
        : rows,
    [rows, columnsSort]
  )

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
