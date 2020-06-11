import React from 'react';
import Container from './Container';
import Aside from './Aside';
import TracksContent from './TracksContent';
import Track from './Track';
import { createTimeTicks, calcPositionFromTime } from './model';

const App = ({ bus }) => {
  const content = bus.getContent();
  const { customTracks, schedule, scheduleExtends } = content;
  const startTime = { date: 'June 18', time: '15:00' };
  const endTime = { date: 'June 19', time: '24:00' };
  const timeTicks = createTimeTicks(startTime, endTime);
  const calcPosition = calcPositionFromTime(startTime);
  const trackWidth = calcPosition(endTime);

  const handleClick = (eventContent) => {
    console.log('handleClick -> eventContent', eventContent);
    const payload1 = {
      title: 'Q&A with MC and Gleb Bahmutov',
      track: 'June 18',
      time: '16:35',
      duration: '15',
      qaLink: 'https://discord.gg/k7WtQcu',
      bgColor: '#ccff00',
      id: 'ck9ehd26r3dtf0b84tqsc4f0s',
      contentType: '2e92d35e0ac0421baf779aef56eec40d',
    };
    const payload = {
      data: {
        ...eventContent,
        /* TODO: switch to real date */
        date: eventContent.track,
      },
      isAuth: true,
      name: 'qa-room',
    };
    bus.clickEvent(payload);
  };

  return (
    <Container>
      <Aside schedule={schedule} customTracks={customTracks} />
      <TracksContent timeTicks={timeTicks} trackWidth={trackWidth}>
        {schedule.map((sch) => (
          <Track
            track={sch}
            calcPosition={calcPosition}
            onClick={handleClick}
          />
        ))}
        {customTracks.map((tr) => (
          <Track track={tr} calcPosition={calcPosition} onClick={handleClick} />
        ))}
      </TracksContent>
    </Container>
  );
};

export default App;
