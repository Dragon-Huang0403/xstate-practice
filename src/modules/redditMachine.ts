import { createMachine, assign } from 'xstate';

type MachineContext = {
  subreddit: string | null;
};

type SelectEvent = {
  type: 'SELECT';
  name: string;
};

type MachineEvent = SelectEvent;

export const redditMachine = createMachine(
  {
    id: 'reddit',
    schema: {
      context: {} as MachineContext,
      events: {} as MachineEvent,
    },
    tsTypes: {} as import('./redditMachine.typegen').Typegen0,
    context: {
      subreddit: null,
    },
    initial: 'idle',
    states: {
      idle: {},
      selected: {},
    },
    on: {
      SELECT: {
        actions: ['select'],
        target: '.selected',
      },
    },
  },
  {
    actions: {
      select: assign({ subreddit: (_, event) => event.name }),
    },
  }
);
