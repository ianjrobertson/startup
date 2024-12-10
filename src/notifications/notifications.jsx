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
        message = `${event.value.user} liked ${event.value.creator}'s spot: ${event.value.name}`;
      } else if (event.type === HangspotEvent.Save) {
        message = `${event.value.user} saved ${event.value.creator}'s spot: ${event.value.name}`;
      } else if (event.type === HangspotEvent.Spot) {
        message = `${event.value.user} made new spot: ${event.value.name}`;
      } else if (event.type === HangspotEvent.System) {
        message = event.value.msg;
      }
      messageArray.push(
        <div key={i}>
          {message}
        </div>
      )
    }
    return messageArray;
  }
  return (
    <div>
      <h2>Notifications</h2>
      <div>This page contains a live feed of users making and interacting with spots</div>
      <span>{userName}</span> 
      <div>{createMessageArray()}</div>
    </div>
  );
}