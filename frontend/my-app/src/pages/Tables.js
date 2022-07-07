import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import MyTable from '../components/Table';
import { Box, Text, Button, Spinner } from '@chakra-ui/react';
import NoScheduler from '../images/NoScheduler.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';

const Tables = () => {
  const [rows, setRows] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const { courses, type } = useParams();
  const [len, setLen] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [curPage,setCurPage]=useState(1)
  let coursesArray = courses.split(',');
  const pageSize=8
  useEffect(() => {
    const fetch = async () => {
      const postList = [coursesArray, type];
      setIsPending(true);
      try {
        const res = await axios.post('https://juc-fasiapi.herokuapp.com/', postList, {
          params: { page_num: curPage, page_size: pageSize },
        });
        setLen(res.data[1]);
        const dataTable = res.data[0];
        console.log(dataTable);
        setIsPending(false);
        tablesData(dataTable);
      } catch (error) {
        setIsPending(false);
        console.log(error.message);
      }
    };
    fetch();
  }, [curPage]);

  const tablesData = useCallback((dataTable) => {
    var rowArray = [];
    var stateArray = [];

    dataTable.forEach((element) => {
      //loop over the array of objects
      rowArray = [];
      element.data.forEach((row) => {
        rowArray.push(row);
      });
      stateArray.push(rowArray);
    });
    setRows(stateArray);
  }, []);

  const columns = [
    'Course Code',
    'Course name',
    'CR',
    'CT',
    'S. Seq',
    'SC',
    'Activity',
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'Room No',
    'STAFF',
  ];

  const handlePageClick = (event) => {
    console.log(event.selected+1)
    setCurPage(event.selected+1)
  };

  return (
    <Box>
      <Breadcrumb
        m="10"
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink fontWeight="medium">
            Avaliable Schedules
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box align="center" my="10" mx="10">
        {isPending && <Spinner size="xl" />}
        {rows.length === 0 && !isPending && (
          <>
            <img src={NoScheduler} width="300px" />
            <Text
              color="headLineColor.500"
              fontWeight="bold"
              fontSize="2xl"
              maxW="700px"
            >
              There's course conflict, there's no way you can add these courses
              together :(
            </Text>
            <Text maxW="800px" color="paragraphColor.500" my="4">
              Try to delete or change some courses
            </Text>
            <Button onClick={() => navigate('/')} colorScheme="orange">
              Try again
            </Button>
          </>
        )}
      </Box>
      {rows.length > 0 && (
        <>
          <Text
            mx="15px"
            as="h1"
            textAlign="center"
            fontSize="2xlg"
            fontWeight="bold"
          >
            You have{' '}
            <Text as="span" color="orange">
              {len}
            </Text>{' '}
            possible options of schedules, choose the best for you
          </Text>
          <MyTable rows={rows} columns={columns} />

          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageCount={Math.ceil(len/pageSize)}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName={'pagination'}
            activeClassName={'active'}
            subContainerClassName={'pages pagination'}
            // breakLinkClassName={'pagination-wrapper'}
          />
        </>
      )}
    </Box>
  );
};

export default Tables;
