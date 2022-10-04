import { Box, Center, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { isTemplateMiddle } from 'typescript';
import { getUserID } from '../../../api/common';
import { Paragraph } from '../../common/Paragraph';
import ProblemDataChart from './Item/ProblemDataChart';

const CodingTestAnalysis = () => {
  // 푼 문제 리스트
  const solvedList = useSelector((state: any) => state.CTReducer.solvedList);

  let solvedListForTest = [
    {
      solved: '(풀이 유무 true/false)',
      probNo: '1987',
      userInfo: {
        userId: 'arcde40',
        memory: 14440,
        time: 684,
        lang: 'Java 11',
        timeStamp: '2022-09-28 19:24:30',
      },
      time_sort_list: [
        {
          userId: 'arcde40',
          memory: 14440,
          time: 684,
          lang: 'Java 11',
          timeStamp: '2022-09-28 19:24:30',
        },
        {
          userId: 'woonie155',
          memory: 15196,
          time: 828,
          lang: 'Java 11',
          timeStamp: '2022-09-23 21:29:33',
        },
        {
          userId: 'dh54kim',
          memory: 14584,
          time: 856,
          lang: 'Java 8 (OpenJDK)',
          timeStamp: '2022-09-23 10:17:20',
        },
        {
          userId: 'dudwls143',
          memory: 15144,
          time: 856,
          lang: 'Java 11',
          timeStamp: '2022-09-22 22:42:34',
        },
        {
          userId: 'd_min3',
          memory: 15356,
          time: 896,
          lang: 'Java 11',
          timeStamp: '2022-09-23 00:04:37',
        },
      ],
      memory_sort_list: [
        {
          userId: 'arcde40',
          memory: 14440,
          time: 684,
          lang: 'Java 11',
          timeStamp: '2022-09-28 19:24:30',
        },
        {
          userId: 'woonie155',
          memory: 15196,
          time: 828,
          lang: 'Java 11',
          timeStamp: '2022-09-23 21:29:33',
        },
        {
          userId: 'dh54kim',

          memory: 14584,
          time: 856,
          lang: 'Java 8 (OpenJDK)',
          timeStamp: '2022-09-23 10:17:20',
        },
        {
          userId: 'dudwls143',

          memory: 15144,
          time: 856,
          lang: 'Java 11',
          timeStamp: '2022-09-22 22:42:34',
        },
        {
          userId: 'd_min3',

          memory: 15356,
          time: 896,
          lang: 'Java 11',
          timeStamp: '2022-09-23 00:04:37',
        },
      ],
    },
    {
      solved: '(풀이 유무 true/false)',
      probNo: '1987',
      userInfo: {
        userId: 'arcde40',
        memory: 14440,
        time: 684,
        lang: 'Java 11',
        timeStamp: '2022-09-28 19:24:30',
      },
      time_sort_list: [
        {
          userId: 'arcde40',

          memory: 14440,
          time: 684,
          lang: 'Java 11',
          timeStamp: '2022-09-28 19:24:30',
        },
        {
          userId: 'woonie155',

          memory: 15196,
          time: 828,
          lang: 'Java 11',
          timeStamp: '2022-09-23 21:29:33',
        },
        {
          userId: 'dh54kim',

          memory: 14584,
          time: 856,
          lang: 'Java 8 (OpenJDK)',
          timeStamp: '2022-09-23 10:17:20',
        },
        {
          userId: 'dudwls143',

          memory: 15144,
          time: 856,
          lang: 'Java 11',
          timeStamp: '2022-09-22 22:42:34',
        },
        {
          userId: 'd_min3',

          memory: 15356,
          time: 896,
          lang: 'Java 11',
          timeStamp: '2022-09-23 00:04:37',
        },
      ],
      memory_sort_list: [
        {
          userId: 'arcde40',

          memory: 14440,
          time: 684,
          lang: 'Java 11',
          timeStamp: '2022-09-28 19:24:30',
        },
        {
          userId: 'woonie155',

          memory: 15196,
          time: 828,
          lang: 'Java 11',
          timeStamp: '2022-09-23 21:29:33',
        },
        {
          userId: 'dh54kim',

          memory: 14584,
          time: 856,
          lang: 'Java 8 (OpenJDK)',
          timeStamp: '2022-09-23 10:17:20',
        },
        {
          userId: 'dudwls143',
          memory: 15144,
          time: 856,
          lang: 'Java 11',
          timeStamp: '2022-09-22 22:42:34',
        },
        {
          userId: 'd_min3',
          memory: 15356,
          time: 896,
          lang: 'Java 11',
          timeStamp: 'rgba(157, 236, 249, 0.6)',
        },
      ],
    },
  ];

  return (
    <Box ml="24vw">
      <Paragraph
        title="실력 점검"
        description={
          <>
            {getUserID()} 님의 문제 풀이를 분석한 결과입니다.
            <br />
            분석 결과를 보고, 실력을 점검해보세요!
          </>
        }
      >
        <VStack ml="-12vw">
          {solvedListForTest.map((item, index) => (
            <VStack>
              <Box>{item.probNo}</Box>
              <HStack>
                <Center>
                  <ProblemDataChart problem={item.memory_sort_list} userInfo={item.userInfo} />
                </Center>
                <Center>
                  <ProblemDataChart problem={item.time_sort_list} userInfo={item.userInfo} />
                </Center>
              </HStack>
            </VStack>
          ))}
        </VStack>
      </Paragraph>
    </Box>
  );
};

export default CodingTestAnalysis;
