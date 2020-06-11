import React from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import { calcWidth } from './model';

const slackIcon = (
  <svg
    className="icon icon-sl"
    dangerouslySetInnerHTML={{
      __html: '<use xlink:href="img/sprite.svg#icon-sl"></use>',
    }}
  ></svg>
);

const EventContainer = styled.div`
  position: absolute;
  left: ${({ position }) => position}px;
  width: ${({ width }) => width}px;
  top: -10px;
  cursor: default;
`;

const TrackContent = styled.div`
  position: relative;
  left: ${({ adjust }) => adjust}px;
  top: -50%;
  width: 100%;
`;

const ePic = (pic) =>
  pic ? (
    <div className="time-track__pic">
      <img
        src={`https://media.graphcms.com/output=format:jpg/resize=fit:crop,height:72,width:72/${pic}`}
      />
    </div>
  ) : null;

const eTitle = (speaker, title) => (
  <div className="time-track__speaker">
    {speaker ? `${speaker} «‎${title}»` : title}
  </div>
);

const iSpeaker = (name, place, title, text) => (
  <React.Fragment>
    <p className="track-tooltip__speaker">
      {name}, {place}
    </p>
    <p className="track-tooltip__title">«‎{title}»</p>
    <div
      className="track-tooltip__desc"
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    ></div>
  </React.Fragment>
);

const iLt = (title, lightningTalks = []) => (
  <React.Fragment>
    <p className="track-tooltip__speaker">{title}</p>
    {lightningTalks.map((lt) => (
      <div className="track-tooltip__sec">
        <p className="track-tooltip__title">
          {lt.title} - {lt.name}
        </p>

        <div
          className="track-tooltip__desc"
          dangerouslySetInnerHTML={{
            __html: lt.text,
          }}
        ></div>
      </div>
    ))}
  </React.Fragment>
);

const Tooltip = ({ children, on }) =>
  on ? <div className="track-tooltip">{children}</div> : null;

const Talk = ({ talk }) => {
  const {
    pic,
    speaker,
    title,
    lightningTalks,
    qaLink,
    speakerRoomLink,
    discussionRoomLink,
    text,
    name,
    place,
  } = talk;
  return (
    <div
      className="time-track__item js-time"
      style={{
        '--bgColor': talk.bgColor,
        width: '100%',
      }}
    >
      {ePic(pic)}
      {eTitle(speaker, title)}
      <Tooltip on={!!name}>{iSpeaker(name, place, title, text)}</Tooltip>
      <Tooltip on={!!lightningTalks}>{iLt(title, lightningTalks)}</Tooltip>
    </div>
  );
};

const QARoom = ({ talk, onClick }) => {
  const { qaLink } = talk;
  return (
    <a
      // href={qaLink}
      onClick={onClick}
      className="time-track__link js-time"
      style={{ '--bgColor': talk.bgColor, width: '100%' }}
    >
      Q&A {slackIcon}
    </a>
  );
};

const TrackEvent = ({ event, calcPosition, onClick }) => {
  const position = calcPosition(event);
  const width = calcWidth(event.duration);

  const handleClick = () => {
    onClick(event);
  };

  if (event.qaLink) {
    return (
      <EventContainer position={position} width={width}>
        <QARoom talk={event} onClick={handleClick} />
      </EventContainer>
    );
  }

  return (
    <EventContainer position={position} width={width}>
      <Talk talk={event} />
    </EventContainer>
  );
};

function Track({ track, calcPosition, onClick }) {
  const { list } = track;
  return (
    <div
      className={cn('time-track__track', { odd: track.odd })}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <TrackContent adjust={26}>
        {list.map((evt) => (
          <TrackEvent
            event={evt}
            calcPosition={calcPosition}
            onClick={onClick}
          />
        ))}
      </TrackContent>
    </div>
  );
}

export default Track;
