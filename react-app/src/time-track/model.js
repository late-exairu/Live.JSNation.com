import { convertEventTimeToISO, createTimeRange } from '../time-provider';

export const createTimeTicks = (startEvent, endEvent) => {
  const isoStart = convertEventTimeToISO(startEvent.date, startEvent.time);
  const isoEnd = convertEventTimeToISO(endEvent.date, endEvent.time);
  const ticks = createTimeRange(isoStart, isoEnd);

  return ticks;
};
