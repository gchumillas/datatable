import React from 'react'
import { useAsync } from 'react-use'
import { CssBaseline, Container } from '@material-ui/core'
import DataTable from '@plastic-ui/datatable'
import { Item, getItems } from './providers/items'

export default () => {
  const [items, setItems] = React.useState<Item[]>([])

  useAsync(async () => {
    setItems(await getItems())
  }, [])

  return (
    <>
      <CssBaseline />
      <Container>
        <DataTable
          title="List of items"
          columns={[{ name: 'title', label: 'Title' }]}
          rows={items}
        />
      </Container>
    </>
  )
}
