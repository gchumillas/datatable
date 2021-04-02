import React from 'react'
import { IconButton, Snackbar } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

export type AlertProps = {
  message: string
  onClose: () => void
}

export default ({ message, onClose }: AlertProps) => (
  <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    onClose={onClose}
    open={!!message}
    message={message}
    action={
      <IconButton color="inherit" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    }
  />
)
