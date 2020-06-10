import { DateTime } from 'luxon';

const timeSettings = {
  currentUTCDiffMI: 0,
  currentUTCDiffDate: 0,
  currentDiffHH: 0,
  currentDiffMM: 0,
  currentTimezone: getClientTimezoneOffset(),
};

let lockedCurrentTime = null;

// const clientTimezone = getClientTimezoneOffset();
const initClientTime = getClientTime();

function getClientTimezoneOffset() {
  const minutes = -new Date().getTimezoneOffset();
  const hours = Math.floor(minutes / 60);
  const mm = minutes - hours * 60;
  const hhs = `${hours}`.padStart(2, '0');
  const mms = `${mm}`.padStart(2, '0');
  const str = `${hhs}${mms}`;
  if (str.length !== 4) {
    return null;
  }

  return {
    str,
    hh: mm === 0 ? hours : null,
  };
}

function getClientTime() {
  const clientYY = new Date().getFullYear();
  const clientMI = new Date().getMonth();
  const clientDD = new Date().getDate();
  const clientHH = new Date().getHours();
  const clientMM = new Date().getMinutes();
  const clientSS = new Date().getSeconds();

  const utcYY = new Date().getUTCFullYear();
  const utcMI = new Date().getUTCMonth();
  const utcDD = new Date().getUTCDate();
  const utcHH = new Date().getUTCHours();
  const utcMM = new Date().getUTCMinutes();
  const utcSS = new Date().getUTCSeconds();

  const clientLocalTime = new Date(
    clientYY,
    clientMI,
    clientDD,
    clientHH,
    clientMM,
    clientSS
  );

  const clientUTCTime = new Date(utcYY, utcMI, utcDD, utcHH, utcMM, utcSS);

  return {
    clientLocalTime,
    clientUTCTime,
    utcYY,
    utcMI,
    utcDD,
    utcHH,
    utcMM,
    utcSS,
  };
}

export const setCurrentUTCTimeAndZone = ({ mi, date, hh, mm, offset }) => {
  const clientTime = getClientTime();
  const dmi = mi - clientTime.utcMI;
  const ddate = date - clientTime.utcDD;
  const dhh = hh - clientTime.utcHH;
  const dmm = mm - clientTime.utcMM;
  timeSettings = {
    currentUTCDiffMI: dmi,
    currentUTCDiffDate: ddate,
    currentDiffHH: dhh,
    currentDiffMM: dmm,
    currentTimezone: offset,
  };
};

export const getCurrentTime = () => {
  const clientTime = getClientTime();
  const currentTime = {
    utcYY: clientTime.utcYY,
    utcMI: clientTime.utcMI + timeSettings.currentUTCDiffMI,
    utcDD: clientTime.utcDD + timeSettings.currentUTCDiffDate,
    utcHH: clientTime.utcHH + timeSettings.currentDiffHH,
    utcMM: clientTime.utcMM + timeSettings.currentDiffMM,
    utcSS: clientTime.utcSS,
  };
  currentTime.UTCTime = new Date(
    clientTime.utcYY,
    clientTime.utcMI,
    clientTime.utcDD,
    clientTime.utcHH,
    clientTime.utcMM,
    clientTime.utcSS
  );
  return currentTime;
};

export const getCestTime = () => {};

export const getLocalTime = () => {
  return new Date();
};

export const convertEventTimeToISO = (date, time, z = 2) => {
  const iso = DateTime.fromFormat(
    `${date} ${time} +${z}`,
    'MMMM dd HH:mm Z'
  ).toISO();
  return iso;
};

export const convertEventTimeToLocal = (date, time, z = 2) => {
  const iso = convertEventTimeToISO(date, time, z);
  const local = DateTime.fromISO(iso);
  return {
    date: local.toFormat('dd MMM'),
    time: local.toFormat('HH:mm'),
  };
};

const iso2sec = (iso) => Math.floor(DateTime.fromISO(iso).toMillis() / 1000);

export const createTimeRange = (isoStart, isoEnd, difMM = 5) => {
  const range = [];
  const difSS = difMM * 60;
  const secStart = iso2sec(isoStart);
  const secEnd = iso2sec(isoEnd);
  let i = secStart;
  while (i <= secEnd) {
    const tm = DateTime.fromSeconds(i);
    const time = {
      date: tm.toFormat('dd MMM'),
      time: tm.toFormat('HH:mm'),
    };
    range.push(time);
    i = i + difSS;
  }

  return range;
};

export const createTrack = (isoTimeStart, k = 1) => {
  const secStart = iso2sec(isoTimeStart);
  return (isoTime) => {
    const sec = iso2sec(isoTime);
    const delta = Math.floor((k * (sec - secStart)) / 60);
    return delta;
  };
};

const SchdStatus = {
  before: 'before',
  now: 'now',
  after: 'after',
};

export const createScheduleEvent = (isoStart, durationMM) => {
  const secStart = iso2sec(isoStart);
  const secEnd = secStart + durationMM * 60;
  return (isoTime) => {
    const sec = iso2sec(isoTime);
    let status = SchdStatus.now;
    let delta = sec - secStart;
    if (sec < secStart) {
      status = SchdStatus.before;
      delta = secStart - sec;
    }
    if (sec > secEnd) {
      status = SchdStatus.after;
      delta = sec - secEnd;
    }
    return {
      status,
      deltaMM: Math.floor(delta / 60),
    };
  };
};

export const lockCurrentTime = (time) => {
  lockedCurrentTime = time;
  console.warn('CurrentTime is set to', lockedCurrentTime);
};

export const getCurrentLocalISO = () => {
  if (lockedCurrentTime) {
    return DateTime.fromISO(lockedCurrentTime).toISO();
  }
  return DateTime.local().toISO();
};

const tmp = {
  getCurrentTime,
  setCurrentUTCTimeAndZone,
  convertEventTimeToISO,
  lockCurrentTime,
  getCurrentLocalISO,
  lock1: () => lockCurrentTime('2020-06-18T17:30:00.000+02:00'),
  lock2: () => lockCurrentTime('2020-06-19T17:30:00.000+02:00'),
};

window.tmp = tmp;
