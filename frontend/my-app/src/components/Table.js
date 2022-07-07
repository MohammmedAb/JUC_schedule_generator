import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Text,
} from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

import ReactPaginate from 'react-paginate';
import './paginate.css'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const downloadPdf = (rows, columns) => {
  const doc = new jsPDF();

  doc.autoTable({
    margin: 5,
    head: columns,
    body: rows,
  });
  doc.save('JUC-441-table.pdf');
};

const MyTable = ({ rows, columns }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(rows.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(rows.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, rows]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % rows.length;
    setItemOffset(newOffset);
  };
  return (
    <Box>
      {rows.map((itemRows, index) => {
        return (
          <TableContainer
            border="1px solid"
            borderColor="gray.400"
            mx={{ base: '15px', lg: '50px' }}
            my="50px"
            borderRadius="md"
          >
            <Table colorScheme="orange" variant="striped" size="sm">
              <Thead>
                <Tr>
                  {columns.map((item, index) => (
                    <TableHead item={item} />
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {itemRows.map((trItem, index) => (
                  <TableRow item={trItem} />
                ))}
              </Tbody>
            </Table>
            <Flex m="5" gap="4" justify="center" align="center">
              <Button
                size="sm"
                colorScheme="orange"
                onClick={() => downloadPdf(itemRows, [columns])}
              >
                Downlod as pdf
              </Button>
              <Text as="p">Table number {index + 1}</Text>
            </Flex>
          </TableContainer>
        );
      })}
    </Box>
  );
};
const TableHead = ({ item }) => <Th>{item}</Th>;
const TableRow = ({ item: trItem }) => {
  return (
    <Tr>
      {trItem.map((item, index) => (
        <Td>{item}</Td>
      ))}
    </Tr>
  );
};

export default MyTable;
