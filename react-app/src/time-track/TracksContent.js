import React from 'react';
import TracksHead from './TracksHead';

function TracksContent({ children }) {
  return (
    <div className="time-track__content">
      <div className="time-track__content-inner">
        <TracksHead />
        <div className="time-track__timeline" id="js-timeline">
          {children}
        </div>
      </div>
    </div>
  );
}

export default TracksContent;
