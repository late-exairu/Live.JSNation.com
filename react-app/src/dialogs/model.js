import {
  convertEventTimeToISO,
  createScheduleEvent,
  getCurrentLocalISO,
} from '../time-provider';

export const getEventStatus = (payload) => {
  const eventData = payload.data;
  if (!eventData) {
    return null;
  }
  const { date, time, duration } = eventData;
  const isoStart = convertEventTimeToISO(date, time);
  const durationMM = parseInt(duration, 10);
  const checkStatus = createScheduleEvent(isoStart, durationMM);
  const now = getCurrentLocalISO();
  const status = checkStatus(now);
  return status;
};
