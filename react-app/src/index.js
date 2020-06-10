import { initExpoApp } from './expo-app';
import { initDialogs } from './dialogs';

const eventsBus = window.eventsBus;

const initApp = () => {
  initExpoApp(eventsBus);
  initDialogs(eventsBus);
};

export default initApp;
