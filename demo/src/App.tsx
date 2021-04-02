import React from 'react'
import { useAsyncRetry } from 'react-use'
import { CssBaseline, Container, IconButton } from '@material-ui/core'
import { Refresh as RefreshIcon, Add as AddIcon } from '@material-ui/icons'
import DataTable from '@plastic-ui/datatable'
import { Item, getItems } from './providers/items'

export default () => {
  const [items, setItems] = React.useState<Item[]>([])

  const { loading, retry } = useAsyncRetry(async () => {
    setItems(await getItems())
  }, [])

  return (
    <>
      <CssBaseline />
      <Container>
        <DataTable
          loading={loading}
          title="List of items"
          columns={[
            { name: 'title', label: 'Title' },
            {
              name: 'actions',
              align: 'right',
              label: (
                <>
                  <IconButton onClick={retry}>
                    <RefreshIcon />
                  </IconButton>
                  <IconButton onClick={() => alert('Unimplemented')}>
                    <AddIcon />
                  </IconButton>
                </>
              )
            }
          ]}
          rows={items}
        />
      </Container>
    </>
  )
}
