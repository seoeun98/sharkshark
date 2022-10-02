import React, { useEffect, useState } from 'react';
import { getCTproblemAPI } from '../../../api/auth/codingTest';
import { CTproblem } from '../../../types/DataTypes';

const CodingTestMain = () => {
  const [CTPList, setCTPList] = useState<CTproblem[]>([]);

  const fetchCTPList = async () => {
    setCTPList(await getCTproblemAPI());
  };

  useEffect(() => {
    fetchCTPList();
  }, []);

  return <div />;
};

export default CodingTestMain;
