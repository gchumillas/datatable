import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

export default (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M19 7H22L18 3L14 7H17V21H19M2 17H12V19H2M6 5V7H2V5M2 11H9V13H2V11Z"
    />
  </SvgIcon>
)
