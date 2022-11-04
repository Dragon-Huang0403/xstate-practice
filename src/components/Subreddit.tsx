import React from 'react';
import { useMachine } from '@xstate/react';

import { createSubredditMachine } from '../modules/subredditMachine';

interface SubredditProps {
  subreddit: string;
}

function Subreddit({ subreddit }: SubredditProps) {
  const subredditMachine = createSubredditMachine(subreddit);
  const [current, send] = useMachine(subredditMachine);

  if (current.matches('failed')) {
    return (
      <div>
        <span>Failed to load posts</span>
        <button onClick={() => send('RETRY')}>Retry</button>
      </div>
    );
  }

  const { posts } = current.context;

  return (
    <div>
      {current.matches('loading') && <div>It's loading</div>}

      <header>
        <h2>{subreddit}</h2>
        <small>
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
