import React from 'react'
import { Label } from '../ui/label'

export default function Footer() {
  return (
    <div className='my-6 items-center justify-center flex'>
      <Label className="text-sm text-muted-foreground">
    © {new Date().getFullYear()} Celest. All rights reserved.
  </Label>
    </div>
  )
}
