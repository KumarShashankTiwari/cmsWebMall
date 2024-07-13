import PageLoader from '../../components/PageLoader';
import Search from '../../components/search';

import PaginatedTable from '../../components/table/PaginationTable';
import { userHeader } from '../../constants/table-header-constants';
import useCustomerManagement from './useCustomerManagement';

const CustomerManagement = () => {
  const {
    handleDelete,
    handleEdit,
    values,
    inputChangeHandler,
    changeHandler,
    pageLoading,
    currentData,
    currentPage,
    dataPerPage,
    pageMeta,
    pageCount,
    paginationHandler,
    navigate,
  } = useCustomerManagement();

  return (
    <>
      <div className='cms-content__container'>
        <h4>Customer Management</h4>
        <div className='content-container__actionBox'>
          <div className='content-container__filterSearch'>
            <Search
              value={values}
              placeholder='Search'
              className={''}
              onChange={inputChangeHandler}
            />
          </div>
          {/* <Button
            onClick={() => navigate(`${APP_CONSTANTS.CREATE_USER}`)}
            className='content-container__filter-btn'
          >
            Create User
          </Button> */}
        </div>

        <div className='table-wrapper'>
          <PaginatedTable
            columns={userHeader}
            data={currentData}
            currentPage={currentPage}
            dataPerPage={dataPerPage}
            pageMeta={pageMeta}
            pageCount={pageCount}
            paginationHandler={paginationHandler}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            inputChangeHandler={inputChangeHandler}
            changeHandler={changeHandler}
            pageLoading={pageLoading}
            navigate={navigate}
          />
        </div>
      </div>
      {pageLoading === true && <PageLoader pageLoading={pageLoading} />}
    </>
  );
};

export default CustomerManagement;
