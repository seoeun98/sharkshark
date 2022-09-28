import {
  Box,
  Button,
  Center,
  useColorModeValue,
  VStack,
  useDisclosure,
  Badge,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Flex,
  Avatar,
} from '@chakra-ui/react';
import axios from 'axios';
import { iteratorSymbol } from 'immer/dist/internal';
import { useEffect, useState } from 'react';
import { FaDatabase, FaGithub } from 'react-icons/fa';
import { ColorText } from '../components/common/ColorText';
import { Tier } from '../components/common/Tier';
import { QuizTable } from '../components/recquiz/QuizTable';
import { Problem } from '../types/DataTypes';
export const BloggingPage = () => {
  const [ghToken, setGhToken] = useState('');
  const [ghRepos, setGhRepos] = useState([] as Array<{ name: string; url: string }>);
  const [ghRepo, setGhRepo] = useState({} as { name: string; url: string; dir: string });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getAuthCode = () => {
    console.log('getAuthCode');
    const client_id = '9539ff1ae93c2ccb932b';
    const redirect_uri = 'http://localhost:3000/blogging';
    const scope = 'repo,user';
    const URL = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;
    window.location.assign(URL);
  };

  const getGhRepos = () => {
    axios
      .get('https://api.github.com/user/repos', {
        headers: {
          Authorization: 'Bearer ' + ghToken,
        },
      })
      .then(({ data }) => {
        let repos: Array<{ name: string; url: string }> = [];
        data.map((item: any) => {
          repos.push({ name: item.full_name, url: item.owner.avatar_url });
        });
        setGhRepos(repos);
      });
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');

    if (authorizationCode) {
      // auth code와 token 교환 및 업데이트
      // getghtokenapi
      setGhToken('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');
    } else {
      // token이 db에 존재하는지 확인
      // checkdbtokenapi
    }
  }, []);

  return (
    <Box>
      {/* image & slogan */}
      <Center
        bgImage={useColorModeValue(
          'url(/assets/header/github_header_light.png)',
          'url(/assets/header/github_header.png)',
        )}
        bgSize="cover"
        bgPos="center"
        h="35vh"
        textAlign="center"
      >
        <VStack spacing="1vh">
          <Box fontSize="32px" pt="4vh" fontWeight={useColorModeValue(800, 700)}>
            깃허브 블로그 포스팅
          </Box>
          <Box fontSize="16px" fontWeight={useColorModeValue(500, 200)}>
            문제 풀이 블로그를 작성하기 번거롭지 않으셨나요?
            <br />
            깃허브 블로그에 내가 푼 문제에 한해 자동 포스팅을 해드립니다.
          </Box>
        </VStack>
      </Center>

      {/* main body */}
      <Box mx="10vw" my="6vh">
        {/* 초기 설정 */}
        <Box mb="6vh">
          <Box fontSize="24px">블로그 계정 초기 설정</Box>
          <Box fontSize="12px" mt="2vh" mb="4vh">
            깃허브 블로그 포스팅을 위해 계정 연동이 필요합니다.
            <br />
            GitHub에 로그인 하여 계정을 인증해주세요.
          </Box>
          <Box ml="2vw">
            <Button
              borderRadius="8px"
              px="40px"
              onClick={getAuthCode}
              disabled={ghToken ? true : false}
            >
              <FaGithub fontSize="20px" /> &nbsp;{' '}
              {!ghToken ? 'Github 계정 연동' : 'Github 연동 완료'}
            </Button>
          </Box>
        </Box>

        {/* 저장소 선택 */}
        <Box mb="6vh">
          <Box fontSize="24px">Repository 선택</Box>
          <Box fontSize="12px" mt="2vh" mb="4vh">
            계정에 올릴 문제를 선택해주세요.
            <br />
            최근 풀이한 문제 5개 중 하나를 선택할 수 있습니다.
          </Box>
          <Box ml="2vw">
            <Button
              borderRadius="8px"
              px="40px"
              onClick={() => {
                onOpen();
                getGhRepos();
              }}
              disabled={!ghToken ? true : false}
            >
              <FaDatabase fontSize="20px" /> &nbsp; 저장소 선택
            </Button>
          </Box>
        </Box>

        <Modal size="3xl" isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(45deg)" />
          <ModalContent bg={useColorModeValue('neutral.0', 'neutral.500')}>
            <ModalCloseButton />
            <ModalBody textAlign="center" margin="32px" p={12}>
              <Box>
                {ghRepos.map((item, index) => (
                  <Flex>
                    <Avatar src={item.url} />
                    {item.name}
                  </Flex>
                ))}
              </Box>
              <Button size="cmd">확인</Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};
