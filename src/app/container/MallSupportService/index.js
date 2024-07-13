import AddUser from '../../../assets/images/ic-users-add.svg';
import PageLoader from '../../components/PageLoader';
import Button from '../../components/button';
import Search from '../../components/search';
import PaginatedTable from '../../components/table/PaginationTable';
import { APP_CONSTANTS } from '../../constants/app-constants';
import { supportServiceTableHeader } from '../../constants/table-header-constants';
import useMallSupportService from './useMallSupportService';

const MallSupportService = () => {
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
  } = useMallSupportService();

  return (
    <>
      <div className='cms-content__container'>
        <h4>Mall Support Service</h4>
        <div className='content-container__actionBox'>
          <div className='content-container__filterSearch'>
            <Search
              value={values}
              placeholder='Search'
              className={''}
              onChange={inputChangeHandler}
            />
          </div>

          <Button
            onClick={() => navigate(`${APP_CONSTANTS.CREATE_SUPPORT_SERVICE}`)}
            className='content-container__filter-btn'
          >
            <img
              src={AddUser}
              alt='Add user'
              width='25'
              height='25'
              className='mr-5'
            />
            {`${APP_CONSTANTS.CREATE_SUPPORT_SERVICE_TAG}`}
          </Button>
        </div>

        <div className='table-wrapper'>
          <PaginatedTable
            columns={supportServiceTableHeader}
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

export default MallSupportService;
