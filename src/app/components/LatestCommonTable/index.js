import React from 'react';
import { useTable } from 'react-table';

const LatestCommonTable = ({
  pageMeta,
  tableHeader,
  content = [],
  handleDelete,
  handleEdit,
  children,
}) => {
  const columns = React.useMemo(() => tableHeader, [tableHeader]);
  const data = React.useMemo(() => content, [content]);

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({
      columns,
      data,
    });

  return (
    <div className='table'>
      {content?.length > 0 ? (
        <table {...getTableProps()} className='my-table'>
          <thead>
            {headerGroups?.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup?.headers?.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.column.id === 'Actions' ? (
                        <div>
                          <span
                            className='link'
                            onClick={() => {
                              handleEdit(row?.original);
                            }}
                          >
                            {'Edit'}
                          </span>
                          <span
                            className='link'
                            onClick={() => {
                              handleDelete(row?.original);
                            }}
                          >
                            {'Delete'}
                          </span>
                        </div>
                      ) : cell.column.id === 'Status' ? (
                        <span
                          className={
                            row.original.status ? 'active bdg' : 'inactive bdg'
                          }
                        >
                          {row?.original?.status === true
                            ? 'Active'
                            : 'In-active'}
                        </span>
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table className='my-table'>
          <tbody>
            <tr>
              <td>No Data Found</td>
            </tr>
          </tbody>
        </table>
      )}
      {pageMeta?.total && (
        <div className='content-container__pagination'>{children}</div>
      )}
    </div>
  );
};

export default LatestCommonTable;
