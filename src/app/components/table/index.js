import React, { useEffect, useState } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';

import { ArrowDownImage, ArrowUpImage } from 'constants/image-constants';

import Message from 'utils/Message';
import Toast from 'utils/Toast';
import ActionMenu from '../ActionMenu';
import './index.scss';

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
const Table = ({
  columns,
  data,
  fetchData,
  ShareLink,
  loading,
  pageCount: controlledPageCount,
  menuAction,
  setRowData,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
      autoResetPage: false,
    },
    useSortBy,
    usePagination
  );
  const [activeId, setActiveId] = useState('');
  const [faqId, setFaqId] = useState('');
  const [staticPageId, setStaticPageId] = useState('');
  const [challengeId, setChallengesId] = useState('');
  const [activityId, setActivityId] = useState('');
  const [homepageId, sethomepageId] = useState('');
  const [activityVitalsId, setactivityVitalsId] = useState('');
  const [userId, setUserId] = useState('');
  const [masterId, setMasterId] = useState('');
  const [bannerId, setBannerId] = useState('');
  const [quizId, setQuizId] = useState('');
  const [breathefreeId, setBreatheFreeId] = useState('');
  const [splashscreenId, setSplashScreenId] = useState('');
  const [celebrity, setCelebrityId] = useState('');
  const [didyouknow, setDidyouknowId] = useState('');
  const [understand, setUnderstandId] = useState('');
  const [webinar, setWebinarId] = useState('');
  const [habitId, setHabitId] = useState('');

  const createToggler = (row) => {
    setActiveId(row.original.article_id);
    setFaqId(row.original.module_id);
    setStaticPageId(row.original.static_page_id);
    setUnderstandId(row.original.understanding_device_id);
    // setChallengesId(row.original.challenge_id);
    setChallengesId(row.original.id);
    // setActivityId(row.original.activity_id);
    setActivityId(row.original.id);
    sethomepageId(row.original.id);
    setCelebrityId(row.original.celebrity_video_id);
    setDidyouknowId(row.original.did_you_know_video_id);
    setUserId(row.original.employee_id);
    setMasterId(row.original.id);
    setBannerId(row.original.banner_type_id);
    setQuizId(row.original.quiz_id);
    setBreatheFreeId(row.original.educator_video_id);
    setRowData && setRowData(row.original);
    setSplashScreenId(row.original.id);
    setactivityVitalsId(row.original.activity_id);
    setWebinarId(row.original.webinar_id);
    setHabitId(row.original.habit_id);
  };

  const onClickOutside = () => {
    setActiveId('');
  };

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  const renderPagination = () => {
    // if (!hasPagination) {
    //   return null;
    // }

    /* Pagination can be built however you'd like. 
       This is just a very basic UI implementation: */
    return (
      <div className='pagination'>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'Prev'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'Next'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            value={pageIndex + 1}
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        {/* <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </div>
    );
  };

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <img
                          className='arrow'
                          src={ArrowDownImage}
                          alt='Desc'
                        />
                      ) : (
                        <img className='arrow' src={ArrowUpImage} alt='Asc' />
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <>
                      {cell.column.id === 'Action' ? (
                        <td
                          style={{ position: 'relative' }}
                          className='pointer'
                          onClick={() => createToggler(row)}
                        >
                          :
                          <>
                            {activeId === row.original.article_id &&
                            faqId === row.original.module_id &&
                            staticPageId === row.original.static_page_id &&
                            challengeId === row.original.id &&
                            activityId === row.original.id &&
                            userId === row.original.employee_id &&
                            masterId === row.original.id &&
                            breathefreeId === row.original.educator_video_id &&
                            bannerId === row.original.banner_type_id &&
                            splashscreenId === row.original.id &&
                            celebrity === row.original.celebrity_video_id &&
                            didyouknow === row.original.did_you_know_video_id &&
                            homepageId === row.original.id &&
                            activityVitalsId === row.original.activity_id &&
                            webinar === row.original.webinar_id &&
                            habitId === row.original.habit_id &&
                            understand ===
                              row.original.understanding_device_id &&
                            quizId === row.original.quiz_id ? (
                              <ActionMenu
                                menuAction={menuAction}
                                onClickOutside={onClickOutside}
                                row={row.original}
                              />
                            ) : null}
                          </>
                        </td>
                      ) : cell.column.id === 'Share' ? (
                        <td
                          onClick={() => ShareLink(row.original)}
                          className='sharebutton'
                        >
                          Link
                        </td>
                      ) : (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      )}
                    </>
                  );
                })}
              </tr>
            );
          })}
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan='10000'>Loading...</td>
            ) : (
              <td colSpan='10000'>
                Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                results
              </td>
            )}
          </tr>
        </tbody>
      </table>
      {renderPagination()}
    </>
  );
};

function SampleTable({
  tableHeader,
  names,
  menuAction,
  pagination,
  type,
  ShareLink,
  getData,
  searchVal,
  searchKey = 'title',
  hasPagination,
  filterData,
  responseCallback,
  setRowData,
}) {
  const columns = React.useMemo(() => tableHeader, []);

  // We'll start our table without any data
  const [data, setData] = React.useState([]);
  const [rawData, setRawData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // // Give this fetch an ID
    // const fetchId = ++fetchIdRef.current;

    if (getData) {
      // Set the loading state
      setLoading(true);

      getData(pageIndex + 1, filterData).then((response) => {
        responseCallback && responseCallback(response);
        setLoading(false);
        let pageCount = 0;
        if (response.error === false) {
          if (response && response.tableData) {
            pageCount = response.tableData.length;
            setData(response.tableData);
            setRawData(response.tableData);
          }
          if (
            response &&
            response.pagination &&
            response.pagination.total_records
          ) {
            setPageCount(
              Math.ceil(response.pagination.total_records / pageSize)
            );
          } else {
            setPageCount(Math.ceil(pageCount / pageSize));
          }
        } else {
          if (response.message) {
            Toast.error(response.message);
          } else {
            Toast.error(Message.Error.COMMON_MESSAGE);
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    if (searchVal && searchVal.trim().length > 0) {
      let searchString = searchVal.trim().toLowerCase();
      let newData = [...rawData];
      // We are searching. Filter the results.
      newData = newData.filter((e) => {
        if (e[searchKey]) {
          return e[searchKey].toLowerCase().match(searchString);
        }
        return false;
      });
      setData(newData);
    } else {
      setData([...rawData]);
    }
  }, [searchVal]);

  return (
    <Table
      columns={columns}
      data={data}
      ShareLink={ShareLink}
      fetchData={fetchData}
      loading={loading}
      pageCount={pageCount}
      menuAction={menuAction}
      hasPagination={hasPagination}
      setRowData={setRowData}
    />
  );
}

export default SampleTable;
