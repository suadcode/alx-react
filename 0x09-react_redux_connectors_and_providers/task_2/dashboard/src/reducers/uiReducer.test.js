import { Map } from 'immutable';
import uiReducer from './uiReducer';
import { DISPLAY_NOTIFICATION_DRAWER, SELECT_COURSE } from '../actions/uiActionTypes';
import {
  LOGIN_SUCCESS,
  LOGOUT
} from '../actions/uiActionTypes';
import { Map } from 'immutable';

const initialState = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {}
});

describe('uiReducer', () => {
  it('should return the initial state when no action is passed', () => {
    const state = uiReducer(undefined, {});
    expect(state.toJS()).toEqual(initialState.toJS());
  });

  it('should return the initial state when the action SELECT_COURSE is passed', () => {
    const state = uiReducer(undefined, { type: SELECT_COURSE });
    expect(state.toJS()).toEqual(initialState.toJS());
  });

  it('should change isNotificationDrawerVisible property when the action DISPLAY_NOTIFICATION_DRAWER is passed', () => {
    const state = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(state.toJS()).toEqual({
      ...initialState.toJS(),
      isNotificationDrawerVisible: true
    });
  });
});

describe('uiReducer', () => {
  it('should handle LOGIN_SUCCESS', () => {
    const initialState = Map({
      isUserLoggedIn: false,
      user: {}
    });
    const action = {
      type: LOGIN_SUCCESS,
      user: { email: 'test@example.com', isLoggedIn: true }
    };
    const nextState = uiReducer(initialState, action);
    expect(nextState.get('isUserLoggedIn')).toBe(true);
    expect(nextState.get('user')).toEqual(action.user);
  });

  it('should handle LOGOUT', () => {
    const initialState = Map({
      isUserLoggedIn: true,
      user: { email: 'test@example.com', isLoggedIn: true }
    });
    const action = { type: LOGOUT };
    const nextState = uiReducer(initialState, action);
    expect(nextState.get('isUserLoggedIn')).toBe(false);
    expect(nextState.get('user')).toEqual({});
  });
});
