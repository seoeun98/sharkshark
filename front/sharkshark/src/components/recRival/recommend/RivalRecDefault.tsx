import { Box, Center, Flex, useColorModeValue, Text } from '@chakra-ui/react';
import { getUserID } from '../../../api/common';
import { UserBasicCard } from '../common/UserBasicCard';
import RivalPreviewList from './RivalPreviewList';
import RivalAllList from './RivalRecAllList';
import RivalRecList from './RivalRecList';

export const RivalRecDefault = (props: { propFunction: (arg0: string) => void }) => {
  const titlefw = useColorModeValue(700, 500);
  const subtitleColor = useColorModeValue('neutral.700', 'neutral.50');
  const subtitlefw = useColorModeValue(500, 300);

  return (
    <>
      {/* <Box children={comp} /> */}
      <Center mb="10vh">
        <UserBasicCard />
      </Center>
      <Box mb="6vh">
        <Box mb="4vh">
          <Box fontSize="24px" fontWeight={titlefw} mb="2vh">
            라이벌 추천 목록
          </Box>
          <Box fontSize="14px" mb="4vh" fontWeight={subtitlefw} color={subtitleColor}>
            {getUserID()} 님보다 비슷하거나 조금 상위에 있는 라이벌을 뽑아봤어요!
            <br />
            클릭을 통해 자세한 정보를 볼 수 있답니다!
          </Box>
        </Box>
        <RivalRecList />
      </Box>
      <Box mt="8vh">
        <Flex>
          <RivalAllList />
          <Box w="24vw">
            <Flex justifyContent="space-between">
              <Box fontSize="24px" fontWeight={titlefw} mb="6vh">
                나의 라이벌 목록
              </Box>
              <Text
                fontWeight="500"
                fontSize="12px"
                as="u"
                _hover={{
                  color: 'primary.cyan0',
                }}
                // eslint-disable-next-line react/destructuring-assignment
                onClick={() => props.propFunction('RivalList')}
              >
                자세히 보기
              </Text>
            </Flex>
            <RivalPreviewList />
          </Box>
        </Flex>
      </Box>
    </>
  );
};
