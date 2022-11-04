import { useMachine } from '@xstate/react';

import { redditMachine } from './modules/redditMachine';

const subreddits = ['reactjs', 'frontend', 'vuejs'];

function App() {
  const [current, send] = useMachine(redditMachine);
  const { subreddit, posts } = current.context;

  return (
    <div>
      <header>
        <select
          onChange={(e) => {
            send({ type: 'SELECT', name: e.target.value });
          }}
        >
          {subreddits.map((subreddit) => (
            <option key={subreddit}>{subreddit}</option>
          ))}
        </select>
      </header>
      <div>
        <div>{current.matches('idle') ? 'Select a subreddit' : subreddit}</div>
        {current.matches('selected.loading') && <div>Loading...</div>}
        {current.matches('selected.loaded') && (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
