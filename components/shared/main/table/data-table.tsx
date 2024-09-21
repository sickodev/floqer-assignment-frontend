"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable as useTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { columns } from "./columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const DataTable = ({ data }: { data: TableData[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state:{
        sorting,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

  // const totalPageCount = table.getPageCount();
  // const currentPage = table.getState().pagination.pageIndex + 1;

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>No Results</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center space-x-4 py-4">
        {/* Previous Button */}
        <Button
          variant="outline"
          className="rounded-none"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>

        <p className="text-lg font-semibold">
          {table.getState().pagination.pageIndex + 1}
        </p>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          className="rounded-none"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
