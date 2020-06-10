import React from 'react';
import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';
import styled, { createGlobalStyle } from 'styled-components';

import DialogPopup from './DialogPopup';

const eventNames = ['video-room'];

const GlobalStyle = createGlobalStyle`
  [data-reach-dialog-overlay] {
    background-color: hsla(0, 0%, 0%, 0.85);
  }

  [data-reach-dialog-content] {
    padding: 0;
  }

`;

const useBusEvents = (bus) => {
  const [isOpen, setOpen] = React.useState(false);
  const [type, setType] = React.useState(null);

  const close = () => setOpen(false);

  const onEvent = ({ type, payload }) => {
    console.log('onEvent -> payload', payload);
    if (type === 'click' && eventNames.includes(payload.name)) {
      setOpen(true);
      setType(payload.name);
    }
  };

  React.useEffect(() => {
    bus.subscribe(onEvent);
    const unsubscribe = () => {
      /* do nothing as this app is not going to by unmounted */
    };
    return unsubscribe;
  }, []);

  return {
    isOpen,
    type,
    close,
  };
};

const App = ({ bus }) => {
  const { isOpen, close, type } = useBusEvents(bus);

  // if (!open) {
  //   return null;
  // }

  return (
    <DialogOverlay isOpen={isOpen} onDismiss={close}>
      <GlobalStyle />
      <DialogContent>
        <DialogPopup />
      </DialogContent>
    </DialogOverlay>
  );
};

export default App;
