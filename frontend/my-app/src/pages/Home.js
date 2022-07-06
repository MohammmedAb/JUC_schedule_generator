import { Input, Text, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import {
  Button,
  ButtonGroup,
  IconButton,
  TableContainer,
  FormControl,
  Box,
  Flex,
  Heading,
  CloseButton,
  Square,
  Spinner,
  Select,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { Table } from 'react-chakra-pagination';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Icon,
} from '@chakra-ui/react';
import LandingSvg from '../images/LandingSvg.svg';
import { Radio, RadioGroup } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';

function Home() {
  const [userCourse, setUserCourse] = useState(['', '', '']);
  const [inputsIsCorrect, setInputsIsCorrect] = useState(true);
  const [page, setPage] = useState(1); //pagination
  const [fepage, setFePage] = useState(1); //pagination

  const [rowsMale, setRowsMale] = useState([]); //tables row
  const [rowsFemale, setRowsFemale] = useState([]); //tables row
  const [radioValue, setRadioValue] = useState('1');
  const [isPending, setIsPending] = useState(false);
  const [filter, setFilter] = useState('');
  console.log(filter);
  let navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          'https://juc-fasiapi.herokuapp.com/home_scheduls'
        );
        console.log(response.data[0]);
        setRowsMale(response.data[0]);
        setRowsFemale(response.data[1]);
      } catch (error) {
        console.log(error.m);
      }
    };
    fetch();
  }, []);
  const maleTableData = rowsMale.map((row) => ({
    courseCode: row[0],
    couseName: row[1],
    cr: row[2],
    ct: row[3],
    seq: row[4],
    sc: row[5],
    activ: row[6],
    sun: row[7],
    mon: row[8],
    tue: row[9],
    wed: row[10],
    thy: row[11],
    room: row[12],
    staff: row[13],
  }));
  // console.log('rows: ', rows);

  const Malecolumns = [
    {
      Header: 'Course Code',
      accessor: 'courseCode',
    },
    {
      Header: 'Course name',
      accessor: 'couseName',
    },
    {
      Header: 'CR',
      accessor: 'cr',
    },
    {
      Header: 'CT',
      accessor: 'ct',
    },
    {
      Header: 'S. Seq',
      accessor: 'seq',
    },
    {
      Header: 'SC',
      accessor: 'sc',
    },
    {
      Header: 'Activity',
      accessor: 'activ',
    },
    {
      Header: 'SUN',
      accessor: 'sun',
    },
    {
      Header: 'MON',
      accessor: 'mon',
    },
    {
      Header: 'TUE',
      accessor: 'the',
    },
    {
      Header: 'WED',
      accessor: 'wed',
    },
    {
      Header: 'THU',
      accessor: 'thu',
    },
    {
      Header: 'Room No',
      accessor: 'room',
    },
    {
      Header: 'STAFF',
      accessor: 'staff',
    },
  ];

  const femaleTableData = rowsFemale.map((row) => ({
    fecourseCode: row[0],
    fecouseName: row[1],
    fecr: row[2],
    fect: row[3],
    feseq: row[4],
    fesc: row[5],
    feactiv: row[6],
    fesun: row[7],
    femon: row[8],
    fetue: row[9],
    fewed: row[10],
    fefethy: row[11],
    feroom: row[12],
    festaff: row[13],
  }));

  const femaleColumns = [
    {
      Header: 'Course Code',
      accessor: 'fecourseCode',
    },
    {
      Header: 'Course name',
      accessor: 'fecouseName',
    },
    {
      Header: 'CR',
      accessor: 'fecr',
    },
    {
      Header: 'CT',
      accessor: 'fect',
    },
    {
      Header: 'S. Seq',
      accessor: 'feseq',
    },
    {
      Header: 'SC',
      accessor: 'fesc',
    },
    {
      Header: 'Activity',
      accessor: 'feactiv',
    },
    {
      Header: 'SUN',
      accessor: 'fesun',
    },
    {
      Header: 'MON',
      accessor: 'femon',
    },
    {
      Header: 'TUE',
      accessor: 'fethe',
    },
    {
      Header: 'WED',
      accessor: 'fewed',
    },
    {
      Header: 'THU',
      accessor: 'fethu',
    },
    {
      Header: 'Room No',
      accessor: 'feroom',
    },
    {
      Header: 'STAFF',
      accessor: 'festaff',
    },
  ];

  const handleUserCourseChange = useCallback((event) => {
    const index = parseInt(event.target.dataset.index, 10);
    setUserCourse((userCourse) => {
      const newUserCourse = [...userCourse];
      newUserCourse[index] = event.target.value
        .toUpperCase()
        .replace(/\s+/g, ' '); //strip()
      return newUserCourse;
    });
  }, []);

  const removeCourse = useCallback((event) => {
    const index = parseInt(event.target.dataset.index, 10);
    setUserCourse((userCourse) => {
      const newUserCourse = [...userCourse];
      newUserCourse.splice(index, 1);
      return newUserCourse;
    });
  }, []);

  const addCourse = useCallback(
    () => setUserCourse((UserCourse) => [...UserCourse, '']),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    let filteredCourses = userCourse.filter(function (e) {
      return e;
    });
    console.log(filteredCourses);
    const postList = [filteredCourses, radioValue];
    setIsPending(true);
    try {
      const res = await axios.post(
        'https://juc-fasiapi.herokuapp.com/',
        postList
      );
      setIsPending(false);
      navigate(`/Schedules/${filteredCourses}/${radioValue}`);
    } catch (error) {
      setIsPending(false);
      setInputsIsCorrect(false);
    }
  };

  console.log(
    rowsMale.flatMap((row) => (row[0].startsWith('CS') ? row[0] : [])).length
  );

  return (
    <Box className="App">
      {/* banner */}
      <Flex
        bg="bg-surface"
        alignItems="center"
        justifyContent="center"
        boxShadow="sm"
        as="section"
        pb="2"
      >
        <Flex alignItems="center" py={{ base: '4', md: '2.5' }}>
          <Square size="12" bg="bg-subtle" borderRadius="md">
            <Icon as={FiInfo} boxSize="6" />
          </Square>
          <Text fontWeight="medium">
            This is not an offical website provided by JUC
          </Text>
        </Flex>
      </Flex>
      {/* Hero section */}
      <Flex
        align="center"
        justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
        direction={{ base: 'column-reverse', md: 'row' }}
        wrap="no-wrap"
        minH="60vh"
        px={{ base: 10, lg: 100 }}
      >
        <Stack
          spacing={4}
          w={{ base: '80%', md: '40%' }}
          align={['center', 'center', 'flex-start', 'flex-start']}
        >
          <Heading
            as="h1"
            textAlign={['center', 'center', 'left', 'left']}
            my={3}
            color="headLineColor.500"
            fontSize="3xl"
            fontWeight="bold"
          >
            <Text as="span" color="orange.400">
              JUC
            </Text>{' '}
            Scheduls Generator
          </Heading>
          <Heading
            as="h2"
            size="md"
            pb="2"
            textAlign={['center', 'center', 'left', 'left']}
            fontWeight="normal"
            color="headLineColor.500"
            fontSize="md"
          >
            We help you scheduling your college classes without any conflict and
            provide you all possible scheduls so you can pick the best for you
          </Heading>
          <Flex
            direction={{ base: 'column-reverse', lg: 'row' }}
            w="full"
            justifyContent="space-between"
          >
            <Text as="p" textAlign="left" fontWeight="medium">
              Enter your courses code
            </Text>

            <RadioGroup onChange={setRadioValue} value={radioValue}>
              <Stack direction="row">
                <Radio colorScheme="orange" value="1">
                  Male branch
                </Radio>
                <Radio colorScheme="orange" value="2">
                  Female branch
                </Radio>
              </Stack>
            </RadioGroup>
          </Flex>

          {userCourse.map((course, index) => (
            <InputGroup mx="300px" maxW="900px" size="md" key={index}>
              <Input
                value={course}
                data-index={index}
                onChange={handleUserCourseChange}
                display="flex"
                placeholder="CS 123"
              />
              <InputRightElement>
                <IconButton
                  onClick={removeCourse}
                  data-index={index}
                  icon={<CloseIcon />}
                />
              </InputRightElement>
            </InputGroup>
          ))}
        </Stack>
        <Box w={{ base: '80%', sm: '70%', md: '50%' }} mb={{ base: 12, md: 0 }}>
          <img src={LandingSvg} size="100%" />
        </Box>
      </Flex>
      <VStack my="4">
        {!inputsIsCorrect && (
          <Text fontWeight="bold" color="red.500" fontSize="md">
            Course code is not correct{' '}
          </Text>
        )}
        {isPending && <Spinner />}
        <HStack>
          <Button onClick={addCourse} variant="outline" rightIcon={<AddIcon />}>
            Add Course
          </Button>
          <Button
            onClick={handleSubmit}
            isDisabled={isPending}
            colorScheme="orange"
          >
            Submit
          </Button>
        </HStack>

        <Tabs align="center" maxW="full" variant="enclosed">
          <TabList>
            <Tab>Male branch</Tab>
            <Tab>Female branch</Tab>
          </TabList>
          <TableContainer
            align="center"
            maxW="90%"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
          >
            <Select
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter the courses"
            >
              <option value="">No filter</option>
              <option value="ACCT">ACCT</option>
              <option value="BUS">BUS</option>
              <option value="CE">CE</option>
              <option value="CS">CS</option>
              <option value="ENGL">ENGL</option>
              <option value="GS">GS</option>
              <option value="HRM">HRM</option>
              <option value="LSCM">LSCM</option>
              <option value="MATH">MATH</option>
              <option value="ME">ME</option>
              <option value="MIS">MIS</option>
              <option value="SCI">SCI</option>
            </Select>
            <TabPanels>
              <TabPanel>
                <Table
                  emptyData={{ text: 'No courses' }}
                  columns={Malecolumns}
                  // data={maleTableData}
                  data={maleTableData.filter((data) =>
                    data.courseCode.startsWith(filter)
                  )}
                  totalRegisters={
                    rowsMale.flatMap((row) =>
                      row[0].startsWith(filter) ? row[0] : []
                    ).length
                  }
                  page={page}
                  onPageChange={(page) => setPage(page)}
                />
              </TabPanel>
              <TabPanel>
                <Table
                  emptyData={{ text: 'No courses' }}
                  columns={femaleColumns}
                  data={femaleTableData.filter((data) =>
                    data.fecourseCode.startsWith(filter)
                  )}
                  totalRegisters={
                    rowsFemale.flatMap((row) =>
                      row[0].startsWith(filter) ? row[0] : []
                    ).length
                  }
                  page={fepage}
                  onPageChange={(fepage) => setFePage(fepage)}
                />
              </TabPanel>
            </TabPanels>
          </TableContainer>
        </Tabs>
      </VStack>
      <Container
        mt="150"
        bg="orange.50"
        maxW="full"
        as="footer"
        role="contentinfo"
        py={{ base: '12', md: '16' }}
        px={{ base: '8', md: '16' }}
      >
        <Stack spacing={{ base: '4', md: '5' }}>
          <Stack justify="space-between" direction="row" align="center">
            <Text fontSize="lg">JUC Scheduls Generator </Text>
            <ButtonGroup variant="ghost">
              <IconButton
                as="a"
                target="_blank"
                href="https://github.com/MohammmedAb"
                aria-label="GitHub"
                icon={<FaGithub fontSize="1.25rem" />}
              />
            </ButtonGroup>
          </Stack>
          <Text fontSize="sm">
            &copy; {new Date().getFullYear()} Designed & developed by{' '}
            <Text as="span" fontWeight="medium">
              Mohammed Albrayh
            </Text>
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}

export default Home;
