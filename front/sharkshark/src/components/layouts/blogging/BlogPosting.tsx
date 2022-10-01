import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Tag,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaGithub, FaDatabase } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { probsDetailAPI, probsRecentAPI } from '../../../api/auth';
import { buildMarkDown, githubUpload } from '../../../api/common';
import { setAuthToken, setRepo } from '../../../reducers/ghAPIReducer';
import { Problem } from '../../../types/DataTypes';
import { ColorText } from '../../common/ColorText';
import { GradientScrollBox } from '../../common/GradientScrollBox';
import { Paragraph } from '../../common/Paragraph';
import { Tier } from '../../common/Tier';

export const BlogPosting = () => {
  const [problems, setProblems] = useState<Array<Problem>>([]);
  const [selected, setSelected] = useState(-1);
  const [code, setCode] = useState('');
  const itemcolor = useColorModeValue('neutral.25', 'neutral.500');

  const authToken = useSelector((state: any) => state.ghAPIReducer.authToken);
  const repo = useSelector((state: any) => state.ghAPIReducer.repo);

  const required = ['문제 제목', '문제 아이디', '문제 링크'];
  const [metainfo, setMetaInfo] = useState([
    { text: '문제 등급', toggle: false },
    { text: '문제 설명', toggle: false },
    { text: '문제 분류', toggle: false },
  ]);

  const getProblems = async () => {
    setProblems(await probsRecentAPI());
  };
  useEffect(() => {
    getProblems();
  }, []);

  const uploadPost = async () => {
    const prob = problems[selected];
    const detail = await probsDetailAPI(prob.no);

    const message = 'uploaded from sharkshark';

    const text = buildMarkDown({
      title: prob.title,
      no: prob.no,
      code: code,
      lang: 'c',
    });

    const content = btoa('test string');

    const filename = 'test.md';
    githubUpload(authToken, message, content, repo.name, repo.dir, filename);
  };

  return (
    <>
      <Paragraph
        title="문제 선택"
        description={
          <>
            계정에 올릴 문제를 선택해주세요.
            <br />
            최근 풀이한 문제 5개 중 하나를 선택할 수 있습니다.
          </>
        }
      >
        {problems.length > 0 ? (
          problems.map((item, index) => (
            <Box
              key={index}
              p="32px"
              bg={index === selected ? 'cyan.200' : itemcolor}
              borderRadius="10px"
              onClick={() => setSelected(index)}
            >
              <Flex>
                {/* level */}
                <Box ml="16px" w="24px">
                  <Tier level={item.level} size="auto" />
                </Box>

                {/* id */}
                <Box ml="24px">{item.no}</Box>

                {/* title */}
                <Box ml="16px">
                  <Box mb="16px">{item.title}</Box>
                  <Box>
                    {item.tags.split(',').map((e, idx) => (
                      <Tag borderRadius="20px" py="6px" px="12px" mr="8px" key={idx}>
                        <ColorText># {e}</ColorText>
                      </Tag>
                    ))}
                  </Box>
                </Box>
              </Flex>
            </Box>
          ))
        ) : (
          <Box p="32px" bg={itemcolor} borderRadius="10px">
            ~최근에 해결한 문제가 없습니다~
          </Box>
        )}
      </Paragraph>

      <Paragraph
        title="정보 선택"
        description={
          <>
            문제의 어떤 정보를 올리길 원하시나요?
            <br />
            원하는 항목을 모두 선택해주세요.
          </>
        }
      >
        <Flex h="48px" mb="16px">
          <Box w="120px" lineHeight="44px">
            필수 정보
          </Box>
          {required.map((item, index) => (
            <Button key={index} w="48px" mx="8px" borderRadius="10px" disabled>
              {item}
            </Button>
          ))}
        </Flex>
        <Flex h="48px" mb="16px">
          <Box w="120px" lineHeight="44px">
            문제 메타 정보
          </Box>
          {metainfo.map((item, index) => (
            <Button
              key={index}
              w="48px"
              mx="8px"
              borderRadius="10px"
              variant={item.toggle ? 'primary' : 'solid'}
              onClick={() =>
                setMetaInfo(data => {
                  const temp = [...data];
                  temp[index].toggle = !temp[index].toggle;
                  return temp;
                })
              }
            >
              {item.text}
            </Button>
          ))}
        </Flex>
        <Flex mb="16px">
          <Box w="120px" lineHeight="44px">
            사용자 제출 정보
          </Box>
          <Box w="full" ml="16px">
            <Textarea
              variant="outline"
              placeholder="코드 입력"
              rows={6}
              w="full"
              onChange={e => setCode(e.target.value)}
            />
          </Box>
        </Flex>
      </Paragraph>
      <Center>
        <Button onClick={uploadPost}>테스트 포스팅</Button>
      </Center>
    </>
  );
};
