import React from 'react'
import { useAsyncRetry } from 'react-use'
import { CssBaseline, Container, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  Refresh as RefreshIcon,
  Add as AddIcon,
  Create as EditIcon,
  DeleteOutline as DeleteIcon
} from '@material-ui/icons'
import DataTable from '@plastic-ui/datatable'
import { Item, getItems } from './providers/items'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2)
  },
  tableHeader: {
    backgroundColor: theme.palette.grey[300]
  }
}))

export default () => {
  const classes = useStyles()
  const [items, setItems] = React.useState<Item[]>([])

  const { loading, retry } = useAsyncRetry(async () => {
    setItems(await getItems())
  })

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container>
        <DataTable
          headerProps={{ className: classes.tableHeader }}
          tableProps={{ size: 'small' }}
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
                  {/* TODO: replace console.log by a snackbar */}
                  <IconButton onClick={() => console.log('Insert')}>
                    <AddIcon />
                  </IconButton>
                </>
              ),
              computed: row => (
                <>
                  <IconButton onClick={() => console.log(`Edit ${row.id}`)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => console.log(`Delete ${row.id}`)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )
            }
          ]}
          rows={items}
        />
      </Container>
    </div>
  )
}
