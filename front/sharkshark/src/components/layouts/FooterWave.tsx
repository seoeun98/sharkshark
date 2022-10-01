import Wave from 'react-wavify';
import styled from '@emotion/styled';
import { Center, Box } from '@chakra-ui/react';

const WaveContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const FooterWave = () => {
  return (
    <Center>
      <WaveContainer>
        <Wave
          fill="url(#gradient)"
          paused={false}
          opacity="0.30"
          options={{
            height: 15,
            amplitude: 40,
            speed: 0.3,
            points: 5,
          }}
        >
          <defs>
            <linearGradient id="gradient">
              <stop offset="10%" stopColor="rgba(153, 123, 237, 0.8)" />
              <stop offset="90%" stopColor="rgba(157, 236, 249, 0.8)" />
            </linearGradient>
          </defs>
        </Wave>
      </WaveContainer>
      <WaveContainer>
        <Wave
          fill="url(#gradient)"
          opacity="0.80"
          paused={false}
          options={{
            height: 20,
            amplitude: 40,
            speed: 0.2,
            points: 7,
          }}
        >
          <defs>
            <linearGradient id="gradient">
              <stop offset="10%" stopColor="rgba(157, 236, 249, 0.8)" />
              <stop offset="90%" stopColor="rgba(153, 123, 237, 0.8)" />
            </linearGradient>
          </defs>
        </Wave>
      </WaveContainer>
      <WaveContainer>
        <Wave
          fill="url(#gradient)"
          paused={false}
          opacity="0.5"
          options={{
            height: 30,
            amplitude: 60,
            speed: 0.2,
            points: 6,
          }}
        >
          <defs>
            <linearGradient id="gradient">
              <stop offset="10%" stopColor="CDEAFF" />
              <stop offset="90%" stopColor="#CDEAFF" />
            </linearGradient>
          </defs>
        </Wave>
      </WaveContainer>
    </Center>
  );
};

export default FooterWave;
