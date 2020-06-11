import React from 'react';
import { createTimeTicks } from './model';

const TimeTick = ({ time }) => (
  <div className="time-track__head-item">{time}</div>
);

function TracksHead() {
  const timeTicks = createTimeTicks(
    { date: 'June 18', time: '15:00' },
    { date: 'June 19', time: '21:00' }
  );
  console.log('TracksHead -> timeTicks', timeTicks);
  const timeline = timeTicks.map((t) => t.time);
  return (
    <>
      <div
        className="time-track__current-time-track"
        id="js-current-time-track"
      >
        <div id="js-current-time"></div>
      </div>
      <div className="time-track__head" id="js-track-head">
        {timeline.map((tm) => (
          <TimeTick time={tm} />
        ))}
      </div>
    </>
  );
}

export default TracksHead;
