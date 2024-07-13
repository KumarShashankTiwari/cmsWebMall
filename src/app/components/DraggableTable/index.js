import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { usePagination, useSortBy, useTable } from 'react-table';
import dragIcon from '../../../assets/images/drag_icon.png';
import './newindex.scss';

const Table = ({
  columns,
  data,
  pageCount: controlledPageCount,
  menuAction,
  handleDelete,
  HomePageOrder,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
      usePagination
    );

  const [pageData, setPageData] = useState([]);

  const handleDragEnd = async (e) => {
    if (!e.destination) return;

    const tempData = Array.from(pageData);
    const [movedItem] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, movedItem);

    setPageData(tempData);
    await HomePageOrder(tempData);
  };

  useEffect(() => {
    setPageData(page);
  }, [page]);

  const RenderFile = ({ data, alt }) => {
    // Determine if the URL is remote
    const isRemoteUrl = typeof data === 'string' && /^https?:\/\//.test(data);

    // Determine the URL to use for the media source
    const mediaUrl = isRemoteUrl ? data : '';

    // Check the file type based on the file extension
    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(data);

    return isImage ? (
      <img src={mediaUrl} alt={alt} crossOrigin='anonymous' width='100' />
    ) : (
      <video controls>
        <source
          crossOrigin='anonymous'
          src={mediaUrl}
          type='video/mp4'
          width='100'
          height='100'
        />
      </video>
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='table'>
        {data.length > 0 ? (
          <table {...getTableProps()} className='my-table'>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <Droppable droppableId='droppable-1'>
              {(provider) => (
                <tbody
                  ref={provider.innerRef}
                  {...provider.droppableProps}
                  {...getTableBodyProps()}
                >
                  {pageData.map((row, i) => {
                    prepareRow(row);
                    return (
                      <Draggable key={row.id} draggableId={row.id} index={i}>
                        {(provider) => (
                          <tr
                            {...provider.draggableProps}
                            ref={provider.innerRef}
                            {...row.getRowProps()}
                          >
                            {row.cells.map((cell) => (
                              <td {...cell.getCellProps()}>
                                {cell.column.id === 'Action' ? (
                                  <div>
                                    <span
                                      className='link'
                                      onClick={() => {
                                        menuAction(row.original);
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
                                ) : cell.column.id === 'Ranking' ? (
                                  <div {...provider.dragHandleProps}>
                                    <img
                                      src={dragIcon}
                                      alt='Drag'
                                      width='10'
                                      height='10'
                                    />
                                  </div>
                                ) : cell.column.id === 'Image' ? (
                                  <RenderFile
                                    data={row?.original?.img_url}
                                    alt={row?.original?.name}
                                  ></RenderFile>
                                ) : cell.column.id === 'Status' ? (
                                  <span
                                    className={`${
                                      row.original.status
                                        ? 'active bdg'
                                        : 'inactive bdg'
                                    }`}
                                  >
                                    {row?.original?.status === true
                                      ? 'Active'
                                      : 'Inactive'}
                                  </span>
                                ) : (
                                  cell.render('Cell')
                                )}
                              </td>
                            ))}
                          </tr>
                        )}
                      </Draggable>
                    );
                  })}
                </tbody>
              )}
            </Droppable>
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
      </div>
    </DragDropContext>
  );
};

const DraggableTable = ({
  tableHeader,
  handleResourseToggle,
  menuAction,
  getData,
  hasPagination,
  setRowData,
  HomePageOrder,
  handleDelete,
}) => {
  const columns = React.useMemo(() => tableHeader, [tableHeader]);

  return (
    <Table
      columns={columns}
      data={getData}
      pageCount={0}
      menuAction={menuAction}
      handleResourseToggle={handleResourseToggle}
      hasPagination={hasPagination}
      setRowData={setRowData}
      HomePageOrder={HomePageOrder}
      handleDelete={handleDelete}
    />
  );
};

export default DraggableTable;
