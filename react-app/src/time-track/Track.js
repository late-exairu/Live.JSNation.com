import React from 'react';
import cn from 'classnames';

const Talk = ({ talk }) => {
  return (
    <div
      className="time-track__item js-time"
      data-time={talk.time}
      data-duration={talk.duration}
      style={{
        '--bgColor': talk.bgColor,
        display_: 'none',
        width: 100,
        marginleft: 10,
        position: 'relative'
      }}
    ></div>
  );
};

const TrackEvent = ({ event }) => {
  return <Talk talk={event} />;
};

function Track({ track }) {
  const { list } = track;
  return (
    <div className={cn('time-track__track', { odd: track.odd })}>
      {list.map((evt) => (
        <TrackEvent event={evt} />
      ))}
    </div>
  );
}

export default Track;
