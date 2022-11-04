import { interpret } from 'xstate';
import { assert } from 'chai';

import { redditMachine } from './redditMachine';

describe('redditMachine', () => {
  it('should load posts of a selected subreddit', (done) => {
    const redditService = interpret(redditMachine)
      .onTransition((state) => {
        if (state.matches('selected.loaded')) {
          assert.isNotEmpty(state.context.posts);
          done();
        }
      })
      .start();

    redditService.send({ type: 'SELECT', name: 'reactjs' });
  });
});
