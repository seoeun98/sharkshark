import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getCTproblemAPI } from '../../../api/auth/codingTest';

export const CodingTestDefault = () => {
  // const [CTPList, setCTPList] = useState([]);

  const fetchCTPList = async () => {
    getCTproblemAPI();
    // setCTPList(await g);
  };

  useEffect(() => {
    fetchCTPList();
  }, []);

  return <Box />;
};
