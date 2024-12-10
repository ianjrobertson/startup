import React from 'react';

import { HangspotEvent, notifier } from './notifier';


export function Notifications() {
  const userName = localStorage.getItem('userName');
  const [events, setEvent] = React.useState([]);
  React.useEffect(() => {
    notifier.addHandler(handleHangspotEvent);

    return () => {
      notifier.removeHandler(handleHangspotEvent)
    }
  })

  function handleHangspotEvent(event) {
    setEvent([...events, event])
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      let message = 'unknown';
      if (event.type === HangspotEvent.Like) {
        message = `liked ${event.value.user}`;
      } else if (event.type === HangspotEvent.Save) {
        message = `saved ${event.value.title}`;
      } else if (event.type === HangspotEvent.Spot) {
        message = `made new spot`;
      } else if (event.type === HangspotEvent.System) {
        message = event.value.msg;
      }
      messageArray.push(
        <div key={i}>
          <span>{event.from.split('@')[0]}</span>
          {message}
        </div>
      )
    }
    return messageArray;
  }
  return (
    <div>
      <span>{userName}</span> 
      <div>{createMessageArray}</div>
    </div>
  );
}