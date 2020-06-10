import React from 'react';
import Container from './Container';
import Aside from './Aside';
import TracksContent from './TracksContent';
import Track from './Track';

const App = ({ bus }) => {
  const content = bus.getContent();
  const { customTracks, schedule, scheduleExtends } = content;
  return (
    <Container>
      <Aside schedule={schedule} customTracks={customTracks} />
      <TracksContent>
        {schedule.map((sch) => (
          <Track track={sch} />
        ))}
        {customTracks.map((tr) => (
          <Track track={tr} />
        ))}
      </TracksContent>
    </Container>
  );
};

export default App;
