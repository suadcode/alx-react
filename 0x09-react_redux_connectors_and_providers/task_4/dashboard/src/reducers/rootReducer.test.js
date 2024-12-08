import { Map } from 'immutable';
import rootReducer from './rootReducer';

describe('Root Reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      courses: Map({}),
      notifications: Map({}),
      ui: Map({}),
    };
    const state = rootReducer(undefined, {});
    expect(state).toEqual(initialState);
  });
});
