import React from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import ReactPaginate from 'react-paginate';

const PaginatedTable = ({
  columns: tableColumns,
  data,
  currentPage,
  pageMeta,
  paginationHandler,
  handleDelete,
  handleEdit,
}) => {
  const columns = React.useMemo(() => tableColumns, [tableColumns]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: currentPage }, // Set initial page index
      manualPagination: true, // Let the table handle pagination manually
      autoResetPage: false, // Prevent page reset on data change
    },
    useSortBy,
    usePagination
  );

  const handlePageClick = ({ selected }) => {
    paginationHandler(selected + 1); // Adjusting selected index to 1-based
  };

  return (
    <div className='table'>
      <table {...getTableProps()} className='my-table'>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page?.map((row) => {
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
                            handleEdit(row.original);
                          }}
                        >
                          {'Edit'}
                        </span>
                        <span
                          className='link'
                          onClick={() => {
                            handleDelete(row.original);
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
                        {row?.original?.status === true ? 'Active' : 'Inactive'}
                      </span>
                    ) : (
                      cell.render('Cell')
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
          {/* Render no data message when data is empty */}
          {page?.length === 0 && (
            <tr>
              <td colSpan='1000'>
                <div className='bottom-pagination'>
                  <span className='content-container__pagination'>
                    No Data Found
                  </span>
                </div>
              </td>
            </tr>
          )}
          <tr>
            <td colSpan='1000'>
              <div className='bottom-pagination'>
                <span className='content-container__pagination__left'>
                  Showing {page?.length} of {pageMeta?.total.length} results
                </span>
                <span className='content-container__pagination'>
                  <ReactPaginate
                    onPageChange={handlePageClick}
                    pageCount={pageMeta?.pageCount}
                    previousLabel='<'
                    renderOnZeroPageCount={null}
                    forcePage={pageMeta?.initialPage}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={6}
                    activeClassName={'active'}
                    containerClassName={'pagination '}
                    pageClassName={'page-item'}
                    previousClassName={'page-item'}
                    nextClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    breakLinkClassName={'page-link'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    disableInitialCallback={true}
                  />
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaginatedTable;
