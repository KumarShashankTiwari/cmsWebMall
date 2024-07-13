import React from 'react';
import './index.scss';
import ReactPaginate from 'react-paginate';

function Pagination({ pageMeta, handleChange }) {
  let { total, pageSize, initialPage } = pageMeta;
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const pageCount = Math.ceil(total.length / pageSize);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    //   const newOffset = (event.selected * pageSize) % total.length;
    // //   setItemOffset(newOffset);
    console.log(event);
    handleChange(event.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel='<'
        renderOnZeroPageCount={null}
        forcePage={initialPage}
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
    </>
  );
}
export default Pagination;
