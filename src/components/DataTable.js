import React from "react";
import { useTable, useFilters, useSortBy } from "react-table";

// utilities
import { matchSorterFn } from "../utilities/sorting";

const DataTable = (props) => {
  // MEMOS
  const data = React.useMemo(() => props.data, [props.data]);
  const columns = React.useMemo(() => props.columns, [props.columns]);
  const initialState = React.useMemo(() => props.initialState);
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: ""
    }),
    []
  );
  const filterTypes = React.useMemo(
    () => ({
      rankedMatchSorter: matchSorterFn
    }),
    []
  );

  // CONFIGURE useTable
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState
    },
    useFilters,
    useSortBy
  );

  // RENDERING
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                <div>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </div>
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
