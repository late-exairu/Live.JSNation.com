import { initExpoApp } from './expo-app';
import { initDialogs } from './dialogs';
import { initTimeTrack } from './time-track';

const eventsBus = window.eventsBus;

const initApp = () => {
  initExpoApp(eventsBus);
  initDialogs(eventsBus);
  initTimeTrack(eventsBus);
};

export default initApp;
