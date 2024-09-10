export const EventsMessage = {
  FAIL: 'Failed to load latest route information',
  LOADING: 'Loading...',
  EMPTY: {
    EVERYTHING: 'Click New Event to create your first point',
    PAST: 'There are no past events now',
    PRESENT: 'There are no present events now',
    FUTURE: 'There are no future events now',
  }
};

const currentEventsMessage = EventsMessage.EMPTY.EVERYTHING;

export const createEventsMessageTemplate = (message = currentEventsMessage) => `
  <p class="trip-events__msg">${message}</p>`;
