import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

export default (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M19 17H22L18 21L14 17H17V3H19M2 17H12V19H2M6 5V7H2V5M2 11H9V13H2V11Z"
    />
  </SvgIcon>
)
