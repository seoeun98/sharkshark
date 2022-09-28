import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaGithub, FaDatabase } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, setRepo } from '../../../reducers/ghAPIReducer';
import { GradientScrollBox } from '../../common/GradientScrollBox';
import { Paragraph } from '../../common/Paragraph';

export const BlogSetting = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state: any) => state.ghAPIReducer.authToken);
  const repo = useSelector((state: any) => state.ghAPIReducer.repo);

  const [ghRepo, setGhRepo] = useState({} as { name: string; url: string; dir: string });
  const [ghRepos, setGhRepos] = useState([] as Array<{ name: string; url: string }>);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getAuthCode = () => {
    console.log('getAuthCode');
    const client_id = '9539ff1ae93c2ccb932b';
    const redirect_uri = 'http://j7b205.p.ssafy.io/blogging';
    const scope = 'repo,user';
    const URL = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;
    window.location.assign(URL);
  };

  const getGhRepos = () => {
    axios
      .get('https://api.github.com/user/repos', {
        headers: {
          Authorization: 'Bearer ' + authToken,
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

  const setOnClose = () => {
    // call setuserinfo api
    dispatch(setRepo(ghRepo));
    onClose();
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');

    if (authorizationCode) {
      // auth code와 token 교환 및 업데이트, 저장
      // api: code into token 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
      dispatch(setAuthToken('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'));
    } else {
      // token이 db에 존재하는지 확인
      // checkdbtokenapi
    }
  }, []);
  return (
    <>
      <Paragraph
        title="블로그 계정 초기 설정"
        description={
          <>
            깃허브 블로그 포스팅을 위해 계정 연동이 필요합니다.
            <br />
            GitHub에 로그인 하여 계정을 인증해주세요.
          </>
        }
      >
        <Button
          borderRadius="8px"
          px="40px"
          onClick={getAuthCode}
          disabled={authToken ? true : false}
        >
          <FaGithub fontSize="20px" /> &nbsp; {!authToken ? 'Github 계정 연동' : 'Github 연동 완료'}
        </Button>
      </Paragraph>

      {/* 저장소 선택 */}
      <Paragraph
        title="Repository 선택"
        description={
          <>
            계정에 올릴 문제를 선택해주세요.,
            <br /> 최근 풀이한 문제 5개 중 하나를 선택할 수 있습니다.
          </>
        }
      >
        <Button
          borderRadius="8px"
          px="40px"
          onClick={() => {
            onOpen();
            getGhRepos();
          }}
          disabled={!authToken ? true : false}
        >
          <FaDatabase fontSize="20px" /> &nbsp;{' '}
          {!authToken ? '계정 연동을 완료해주세요.' : '저장소 설정'}
        </Button>
      </Paragraph>

      {/* 선택한 저장소 */}
      <Box>
        저장소 설정됨:
        <Flex mb="16px" mt="16px">
          <Avatar src={repo.url} boxSize="48px" mx="16px" />
          <Box lineHeight="48px" mr="32px">
            {repo.name}
          </Box>
          <Box lineHeight="48px">{repo.dir}</Box>
        </Flex>
      </Box>

      {/* modal */}
      <Modal size="3xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(45deg)" />
        <ModalContent bg={useColorModeValue('neutral.0', 'neutral.500')}>
          <ModalCloseButton />
          <ModalBody textAlign="center" margin="32px" p={12}>
            <GradientScrollBox h="300px">
              {ghRepos.map((item, index) => (
                <Flex mb="16px" key={index} onClick={() => setGhRepo({ ...item, dir: '' })}>
                  <Avatar src={item.url} boxSize="48px" mx="16px" />
                  <Box lineHeight="48px">{item.name}</Box>
                </Flex>
              ))}
            </GradientScrollBox>
            <Input
              mt="16px"
              type="text"
              placeholder="Github 저장소 선택"
              value={ghRepo.name}
              isReadOnly
            />
            <Input
              my="16px"
              type="text"
              placeholder="업로드 경로 입력"
              value={ghRepo.dir}
              onChange={e =>
                setGhRepo(data => {
                  return { ...data, dir: e.target.value };
                })
              }
            />
            <Button size="cmd" onClick={setOnClose}>
              확인
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
