import { createMachine, assign, spawn, ActorRefFrom } from 'xstate';

import { createSubredditMachine, SubredditMachine } from './subredditMachine';

type MachineContext = {
  subreddit: ActorRefFrom<SubredditMachine> | null;
  subreddits: Record<string, ActorRefFrom<SubredditMachine>>;
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
      subreddits: {},
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
      select: assign((context, event) => {
        if (event.name in context.subreddits) {
          return {
            ...context,
            subreddit: context.subreddits[event.name],
          };
        }
        const subreddit = spawn(createSubredditMachine(event.name));
        return {
          ...context,
          subreddits: { ...context.subreddits, [event.name]: subreddit },
          subreddit,
        };
      }),
    },
  }
);
