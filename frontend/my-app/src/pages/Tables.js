import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import MyTable from '../components/Table';
import { Box, Text, Button, Spinner } from '@chakra-ui/react';
import NoScheduler from '../images/NoScheduler.svg';
import { useNavigate ,useParams } from 'react-router-dom';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react';

const Tables = () => {
  const [rows, setRows] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const {courses,type}=useParams()

  let coursesArray=courses.split(',')

  useEffect(() => {
    const fetch = async () => {
    const postList=[coursesArray,type]
      setIsPending(true);
      try {
        const res = await axios.post('https://juc-fasiapi.herokuapp.com/',postList)
        const dataTable = res.data;
        setIsPending(false);
        tablesData(dataTable);
      } catch (error) {
        setIsPending(false);
        console.log(error.message);
      }
    };
    fetch();
  }, []);

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
      // console.log('rowArray', rowArray);
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
          <Text mx='15px' as="h1" textAlign="center" fontSize="2xlg" fontWeight="bold">
            You have{' '}
            <Text as="span" color="orange">
              {rows.length}
            </Text>{' '}
            possible options of schedules, choose the best for you
          </Text>
          <MyTable rows={rows} columns={columns} />
        </>
      )}
      
    </Box>
  );
};

export default Tables;
