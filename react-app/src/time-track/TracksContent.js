import React from 'react';
import TracksHead from './TracksHead';

function TracksContent({ children, timeTicks, trackWidth }) {
  return (
    <div className="time-track__content">
      <div className="time-track__content-inner">
        <TracksHead timeTicks={timeTicks} style={{ width: trackWidth }} />
        <div
          className="time-track__timeline"
          id="js-timeline"
          style={{ width: trackWidth }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default TracksContent;
