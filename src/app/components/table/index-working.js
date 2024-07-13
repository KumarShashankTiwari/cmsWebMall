import React, { useState } from 'react';
import {
  MDBBtn,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from 'mdb-react-ui-kit';
import ActionMenu from '../ActionMenu';
import './index.scss';

/* const Styles = styled.div`
   padding: 1rem;
   
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`; */

const Table = ({
  names,
  currentPage,
  loadNames,
  pageLimit,
  tableHeader = [],
}) => {
  const [toggles, setToggles] = useState({});
  const [activeId, setActiveId] = useState('');

  const renderPagination = () => {
    if (currentPage === 0) {
      return (
        <MDBPagination className='mb-0'>
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn onClick={() => loadNames(4, 8, 1)}>Next</MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage < pageLimit - 1 && names.length === pageLimit) {
      return (
        <MDBPagination className='mb-0'>
          <MDBPaginationItem>
            <MDBPaginationItem>
              <MDBBtn
                onClick={() =>
                  loadNames((currentPage - 1) * 4, currentPage * 4, -1)
                }
              >
                Prev
              </MDBBtn>
            </MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadNames((currentPage + 1) * 4, (currentPage + 2) * 4, 1)
              }
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination className='mb-0'>
          <MDBPaginationItem>
            <MDBBtn onClick={() => loadNames(4, 8, 1)}>Prev</MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  // const createToggler = (id) => {
  //   setToggles((prevState) => !prevState[id]);
  // };

  const createToggler = (item) => {
    setActiveId(item.id);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {/* <th>Title</th>
            <th>Description</th>
            <th>Published by</th>
            <th>Last edited</th>
            <th>Status</th>
            <th>Expired on</th>
            <th>Tag</th> */}
            {tableHeader &&
              tableHeader.length > 0 &&
              tableHeader.map((name) => {
                return <th>{name}</th>;
              })}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {names &&
            names.length &&
            names.length > 0 &&
            names.map((item) => {
              // const id = item.id;
              // const toggle = toggles[id];
              // const toggler = createToggler(id);
              return (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.published_by}</td>
                  <td>{item.last_edited}</td>
                  <td>{item.status}</td>
                  <td>{item.expired_on}</td>
                  <td>{item.tag.join(', ')}</td>
                  <td className='pointer' onClick={() => createToggler(item)}>
                    <>⋮{activeId === item.id ? <ActionMenu /> : null}</>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className='pagination'>{renderPagination()}</div>
    </div>
  );
};

export default Table;
