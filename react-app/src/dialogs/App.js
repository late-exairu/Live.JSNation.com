import React from 'react';
import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';
import styled, { createGlobalStyle } from 'styled-components';

import DialogPopup from './DialogPopup';
import { getEventStatus } from './model';
import NewTab from './NewTab';

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
  const [content, setContent] = React.useState(null);

  const close = () => setOpen(false);

  const onEvent = ({ type, payload }) => {
    if (type === 'click' && eventNames.includes(payload.name)) {
      setOpen(true);
      setType(payload.name);
      setContent(payload);
    }
  };

  React.useEffect(() => {
    bus.subscribe(onEvent);
    const unsubscribe = () => {
      /* do nothing as this app is not going to by unmounted */
    };
    return unsubscribe;
  }, []);

  const status = content ? getEventStatus(content) : null;
  const isNow = status && status.status === 'now';

  return {
    isOpen,
    type,
    close,
    content,
    status,
    isNow,
  };
};

const App = ({ bus }) => {
  const { isOpen, close, type, content, status, isNow } = useBusEvents(bus);
  console.log('App -> content', content);

  if (isNow) {
    return <NewTab to={content.link} />;
  }

  return (
    <DialogOverlay isOpen={isOpen} onDismiss={close}>
      <GlobalStyle />
      <DialogContent>
        <DialogPopup type={type} content={content} status={status} />
      </DialogContent>
    </DialogOverlay>
  );
};

export default App;
