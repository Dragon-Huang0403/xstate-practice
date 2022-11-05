import React from 'react';
import { ActorRefFrom } from 'xstate';
import { useMachine, useActor } from '@xstate/react';

import { SubredditMachine } from '../modules/subredditMachine';

interface SubredditProps {
  service: ActorRefFrom<SubredditMachine>;
}

function Subreddit({ service }: SubredditProps) {
  const [current, send] = useActor(service);

  const { subreddit } = current.context;

  if (current.matches('failed')) {
    return (
      <div>
        <span>Failed to load posts</span>
        <button onClick={() => send('RETRY')}>Retry</button>
      </div>
    );
  }

  const { posts, lastUpdatedAt } = current.context;

  return (
    <div>
      {current.matches('loading') && <div>It's loading</div>}

      <header>
        <h2>{subreddit}</h2>
        <small>
          Last updated at: {lastUpdatedAt && lastUpdatedAt.toLocaleTimeString()}
          <button onClick={() => send('REFRESH')}>Refresh</button>
        </small>
      </header>

      <ul>
        {posts.map((post) => (
          <li key={post.title}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Subreddit;
