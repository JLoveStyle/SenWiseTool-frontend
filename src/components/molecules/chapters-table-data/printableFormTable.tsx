"use client";
import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  incomingColumns: ColumnDef<TData, TValue>[];
  incomingData: TData[];
  chapter: string;
}
export default function PrintableFormTable<TData, TValue>({
  incomingColumns,
  incomingData,
  chapter,
}: DataTableProps<TData, TValue>) {
  const data = useMemo(() => incomingData, []);
  const columns = useMemo(() => incomingColumns, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const answer = table.getSelectedRowModel()
  console.log('ans =>', answer)

  return (
    <div className="">
      <table>
        {table.getHeaderGroups().map((headerEl) => {
          return (
            <tr className="border p-2" key={headerEl.id}>
              {headerEl.headers.map((columnEl) => {
                return (
                  <th className="border p-2" key={columnEl.id} colSpan={columnEl.colSpan}>
                    {columnEl.isPlaceholder
                      ? null
                      : flexRender(
                          columnEl.column.columnDef.header,
                          columnEl.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          );
        })}
        <tbody>
          {table.getRowModel().rows.map((rowEl) => {
            return (
              <tr className="border p-2" key={rowEl.id}>
                {rowEl.getVisibleCells().map(cellEl => {
                  return (
                    <td className="border p-2" key={cellEl.id}>
                      {flexRender(
                        cellEl.column.columnDef.cell, cellEl.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
