import { assign, createMachine } from 'xstate';
import { fetchSubreddit } from './api';

type MachineContext = {
  subreddit: string;
  posts: any[];
};

type DoneLoadingEvent = {
  type: 'done.invoke.invokeFetchSubreddit';
  data: any[];
};

type ReTryEvent = {
  type: 'RETRY';
};

type RefreshEvent = {
  type: 'REFRESH';
};

type MachineEvent = DoneLoadingEvent | ReTryEvent | RefreshEvent;

export const createSubredditMachine = (subreddit: string) =>
  createMachine(
    {
      id: 'subreddit',
      schema: {
        context: {} as MachineContext,
        events: {} as MachineEvent,
      },
      context: {
        subreddit,
        posts: [],
      },
      tsTypes: {} as import('./subredditMachine.typegen').Typegen0,
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
        loaded: {
          on: {
            REFRESH: 'loading',
          },
        },
        failed: {
          on: {
            RETRY: 'loading',
          },
        },
      },
    },
    {
      services: {
        invokeFetchSubreddit: (context) => fetchSubreddit(context.subreddit),
      },
      actions: {
        doneLoading: assign({ posts: (_, event) => event.data }),
      },
    }
  );
