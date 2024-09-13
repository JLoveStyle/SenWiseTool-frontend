"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { UNDERSCORE_NOT_FOUND_ROUTE } from "next/dist/shared/lib/constants";

interface DataTableProps<TData, TValue> {
  incomingColumns: ColumnDef<TData, TValue>[];
  incomingData: TData[];
}
export default function PrintableFormTable<TData, TValue>({
  incomingColumns,
  incomingData,
}: DataTableProps<TData, TValue>) {
  const data = useMemo(() => incomingData, []);
  const columns = useMemo(() => incomingColumns, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const answer = table.getSelectedRowModel();
  console.log("ans =>", answer);

  return (
    <div className="">
      <table>
        {table.getHeaderGroups().map((headerEl) => {
          return (
            <tr className="border p-2" key={headerEl.id}>
              {headerEl.headers.map((columnEl) => {
                return (
                  <th
                    className="border p-2"
                    key={columnEl.id}
                    colSpan={columnEl.colSpan}
                  >
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
                {rowEl.getVisibleCells().map((cellEl) => {
                  return (
                    <td className="border p-2" key={cellEl.id}>
                      {flexRender(
                        cellEl.column.columnDef.cell,
                        cellEl.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
