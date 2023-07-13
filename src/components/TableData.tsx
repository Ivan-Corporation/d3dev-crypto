import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

type Coin = {
  Date?: string;
};

const defaultColumns: ColumnDef<Coin>[] = [
  {
    accessorKey: "Date",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "Open",
    header: () => "Open price",
    footer: (props) => props.column.id,
  },

  {
    accessorKey: "Close",
    header: () => <span>Close price</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "High",
    header: "High",
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "Low",
    header: "Low",
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "Volume USDT",
    header: "Volume USDT",
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "Volume POND",
    header: "Volume POND",
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "tradecount",
    header: "Trade Count",
    footer: (props) => props.column.id,
  },
];

function TableData({ cryptoData }: any) {
  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  let data = cryptoData?.data;
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });
  return (
    <div className="flex gap-2 mt-6 mb-20 flex-col lg:flex-row">
      <div className="lg:w-48 h-full text-sm font-medium border rounded-lg bg-gray-700 border-gray-600 text-white">
        <div className="px-1 border-b border-gray-600 py-2">
          <label>
            <input
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
              {...{
                type: "checkbox",
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />{" "}
            Toggle All
          </label>
        </div>
        {table.getAllLeafColumns().map((column) => {
          return (
            <div key={column.id} className="px-1 py-1">
              <label>
                <input
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                  {...{
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{" "}
                {column.id}
              </label>
            </div>
          );
        })}
      </div>
      <div className="h-4" />
      <div
        className="relative overflow-x-auto rounded w-full"
        style={{ height: "500px" }}
      >
        <table className="w-full text-sm text-left text-gray-400 ">
          <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-6 py-3"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b bg-gray-800 border-gray-700">
                {row.getVisibleCells().map((cell) => (
                  <td className="px-6 py-4 font-medium" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableData;
