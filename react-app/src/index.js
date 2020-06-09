import { initExpoApp } from './expo-app';

const eventsBus = window.eventsBus;

const initApp = () => {
  initExpoApp(eventsBus);
};

export default initApp;
