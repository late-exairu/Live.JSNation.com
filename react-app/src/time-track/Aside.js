import React from 'react';
import cn from 'classnames';

const Aside = ({ schedule, customTracks }) => {
  return (
    <div className="time-track__aside">
      {schedule.map((sch) => (
        <div className="time-track__track">
          <div className="time-track__track-title">{sch.title}</div>
        </div>
      ))}

      {customTracks.map((tr) => (
        <div className={cn('time-track__track', { odd: tr.odd })}>
          {tr.notitle ? null : (
            <div className="time-track__track-title">{tr.title}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Aside;
