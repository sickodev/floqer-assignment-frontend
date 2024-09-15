"use client"
import React, { forwardRef, useRef } from 'react'
import { Table, TableCaption } from '../ui/table'

const BaseTable = ({tableRef}:{tableRef:React.RefObject<HTMLDivElement>})=> {
  return (
    <section ref={tableRef} id='#base-table'className='h-full w-full'>
        <Table>
            <TableCaption>
                A list of your recent invoices.
            </TableCaption>
        </Table>
    </section>
  )
}

export default BaseTable