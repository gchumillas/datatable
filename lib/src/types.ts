import { TableCellProps } from '@material-ui/core'

export type SortDirection = 'asc' | 'desc'

export type ColumnSort = {
  name: string
  direction?: SortDirection
}

export type Column = {
  name: string
  label?: React.ReactNode
  sortable?: boolean
  align?: string
  shrink?: boolean
  visibility?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  computed?: (row: Row) => React.ReactNode
  sorted?: (row: Row) => any
  cellProps?: (row: Row) => TableCellProps | undefined
}

export type Row = {
  [name: string]: any
}

export type InternalRow = {
  [name: string]: { value: any; computed: React.ReactNode }
}
