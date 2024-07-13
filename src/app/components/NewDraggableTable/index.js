import React, { useState } from 'react';

// Container

// Components
import TableDesign from '../DraggableTable';

const NewTableDesign = ({
  tableHeader,
  menuAction,
  handleResourseToggle,
  sectionObj,
  VitalsActivity,
  handleDragEnd,
  pagination,
  type,
  getData,
  HomePageOrder,
  setRowData,
  isHide,
  searchKey,
  hasPagination,
  filterData,
  responseCallback,
  selectedContent = [],
}) => {
  const [currentPage] = useState(0);
  const [pageLimit] = useState(4);
  const [searchVal, setSearchVal] = useState('');

  const onSearch = (val) => {
    setSearchVal(val);
  };

  return (
    <div>
      <TableDesign
        // handleDragEnd={handleDragEnd}
        tableHeader={tableHeader}
        currentPage={currentPage}
        pageLimit={pageLimit}
        menuAction={menuAction}
        handleResourseToggle={handleResourseToggle}
        pagination={pagination}
        type={type}
        HomePageOrder={HomePageOrder}
        VitalsActivity={VitalsActivity}
        setRowData={setRowData}
        getData={getData}
        searchVal={searchVal}
        searchKey={searchKey}
        hasPagination={hasPagination}
        filterData={filterData}
        responseCallback={responseCallback}
        selectedContent={selectedContent}
      />
    </div>
  );
};
export default NewTableDesign;
