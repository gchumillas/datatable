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
import Alert from './components/Alert'

const useStyles = makeStyles(theme => ({
  root: {
    padding: `${theme.spacing(4)}px 0`
  },
  tableHeader: {
    backgroundColor: theme.palette.grey[300]
  },
  buttons: {
    display: 'flex'
  }
}))

export default () => {
  const classes = useStyles()
  const [message, setMessage] = React.useState('')
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
            { name: 'id', label: '#ID', shrink: true, align: 'right' },
            { name: 'name', label: 'Name', computed: row => `${row.first_name} ${row.last_name}` },
            { name: 'job_title', label: 'Job title' },
            { name: 'gender', label: 'Gender' },
            { name: 'email', label: 'Email' },
            { name: 'phone', label: 'Phone' },
            {
              name: 'actions',
              align: 'right',
              label: (
                <div className={classes.buttons}>
                  <IconButton onClick={retry}>
                    <RefreshIcon />
                  </IconButton>
                  <IconButton onClick={() => setMessage('ADD ITEM: not implemented')}>
                    <AddIcon />
                  </IconButton>
                </div>
              ),
              computed: row => (
                <div className={classes.buttons}>
                  <IconButton onClick={() => setMessage(`EDIT ITEM ${row.id}: not implemented`)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => setMessage(`DELETE ITEM ${row.id}: not implemented`)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              )
            }
          ]}
          rows={items}
        />
      </Container>
      <Alert message={message} onClose={() => setMessage('')} />
    </div>
  )
}
