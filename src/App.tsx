import { useMachine } from '@xstate/react';

import { redditMachine } from './modules/redditMachine';
import Subreddit from './components/Subreddit';

const subreddits = ['reactjs', 'frontend', 'vuejs'];

function App() {
  const [current, send] = useMachine(redditMachine);
  const { subreddit } = current.context;

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
      {subreddit && <Subreddit subreddit={subreddit} key={subreddit} />}
    </div>
  );
}

export default App;
