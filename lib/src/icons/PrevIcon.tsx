import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

export default (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </SvgIcon>
)
