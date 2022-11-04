import { createMachine, assign } from 'xstate';

import { fetchSubreddit } from './api';

type MachineContext = {
  subreddit: string | null;
  posts: any[];
};

type SelectEvent = {
  type: 'SELECT';
  name: string;
};

type DoneLoadingEvent = {
  type: 'done.invoke.invokeFetchSubreddit';
  data: any[];
};

type MachineEvent = SelectEvent | DoneLoadingEvent;

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
      posts: [],
    },
    initial: 'idle',
    states: {
      idle: {},
      selected: {
        initial: 'loading',
        states: {
          loading: {
            invoke: {
              id: 'invokeFetchSubreddit',
              src: 'invokeFetchSubreddit',
              onDone: { target: 'loaded', actions: 'doneLoading' },
              onError: 'failed',
            },
          },
          loaded: {},
          failed: {},
        },
      },
    },
    on: {
      SELECT: {
        actions: ['select'],
        target: '.selected',
      },
    },
  },
  {
    services: {
      invokeFetchSubreddit: (context) =>
        fetchSubreddit(context.subreddit as string),
    },
    actions: {
      select: assign({ subreddit: (_, event) => event.name }),
      doneLoading: assign({
        posts: (_, event) => event.data,
      }),
    },
  }
);
