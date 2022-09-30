import { v4 as uuidv4 } from 'uuid';
import { RivalBasicCard } from '../common/RivalBasicCard';
import { Box } from '@chakra-ui/react';
import Carousel from 'react-spring-3d-carousel';
import { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';

export const RivalRecList = (props: { middlePropFunction: (arg0: string) => void }) => {
  const testdata = [
    { id: 'id', className: 'Class 4', level: 18 },
    { id: 'dddddd', className: 'Class 3', level: 18 },
    { id: 'isfsfsd', className: 'Class 44', level: 18 },
    { id: 'isfddf', className: 'Class 4', level: 18 },
    { id: 'idsffd', className: 'Class 4', level: 18 },
    { id: 'id', className: 'Class 4', level: 18 },
    { id: 'id', className: 'Class 4', level: 18 },
  ];
  const [show, setShown] = useState(false);
  const props3 = useSpring({
    transform: show ? 'scale(1.03)' : 'scale(1)',
  });
  const middleFunction = (text: any) => {
    console.log(text);
    // eslint-disable-next-line react/destructuring-assignment
    props.middlePropFunction(text);
  };
  let cards = [
    {
      key: uuidv4(),
      content: (
        <animated.div
          style={props3}
          onMouseEnter={() => setShown(true)}
          onMouseLeave={() => setShown(false)}
        >
          <RivalBasicCard RivalInfo={testdata[0]} bottompropFunction={middleFunction} />
        </animated.div>
      ),
    },
    {
      key: uuidv4(),
      content: (
        <animated.div
          style={props3}
          onMouseEnter={() => setShown(true)}
          onMouseLeave={() => setShown(false)}
        >
          <RivalBasicCard RivalInfo={testdata[1]} bottompropFunction={middleFunction} />{' '}
        </animated.div>
      ),
    },
    {
      key: uuidv4(),
      content: (
        <animated.div
          style={props3}
          onMouseEnter={() => setShown(true)}
          onMouseLeave={() => setShown(false)}
        >
          {' '}
          <RivalBasicCard RivalInfo={testdata[0]} bottompropFunction={middleFunction} />{' '}
        </animated.div>
      ),
    },
    {
      key: uuidv4(),
      content: (
        <animated.div
          style={props3}
          onMouseEnter={() => setShown(true)}
          onMouseLeave={() => setShown(false)}
        >
          <RivalBasicCard RivalInfo={testdata[1]} bottompropFunction={middleFunction} />{' '}
        </animated.div>
      ),
    },
    {
      key: uuidv4(),
      content: (
        <animated.div
          style={props3}
          onMouseEnter={() => setShown(true)}
          onMouseLeave={() => setShown(false)}
        >
          {' '}
          <RivalBasicCard RivalInfo={testdata[0]} bottompropFunction={middleFunction} />{' '}
        </animated.div>
      ),
    },
    {
      key: uuidv4(),
      content: (
        <animated.div
          style={props3}
          onMouseEnter={() => setShown(true)}
          onMouseLeave={() => setShown(false)}
        >
          <RivalBasicCard RivalInfo={testdata[1]} bottompropFunction={middleFunction} />{' '}
        </animated.div>
      ),
    },
    {
      key: uuidv4(),
      content: (
        <animated.div
          style={props3}
          onMouseEnter={() => setShown(true)}
          onMouseLeave={() => setShown(false)}
        >
          <RivalBasicCard RivalInfo={testdata[0]} bottompropFunction={middleFunction} />{' '}
        </animated.div>
      ),
    },
  ];

  const table = cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [goToSlide, setGoToSlide] = useState(0);
  const [Rivalcards] = useState(table);

  return (
    <Box h="30vh">
      <Carousel
        slides={Rivalcards}
        showNavigation={false}
        goToSlide={goToSlide}
        offsetRadius={5}
        animationConfig={config.gentle}
      />
    </Box>
  );
};

export default RivalRecList;
