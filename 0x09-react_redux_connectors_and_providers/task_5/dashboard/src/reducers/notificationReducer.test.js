import notificationReducer from './notificationReducer';
import { Map } from 'immutable';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  SET_TYPE_FILTER,
  MARK_AS_READ,
  SET_LOADING_STATE,
} from '../actions/notificationActionTypes';

describe('notificationReducer', () => {
  it('should return the initial state', () => {
    const initialState = notificationReducer(undefined, {});
    expect(initialState).toEqual(Map({
      notifications: Map(),
      filter: 'DEFAULT',
      loading: false,
    }));
  });

  it('should handle FETCH_NOTIFICATIONS_SUCCESS', () => {
    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: [{ id: 1, type: 'default', value: 'New notification' }],
    };
    const newState = notificationReducer(undefined, action);
    expect(newState.get('notifications').size).toBe(1);
    expect(newState.get('notifications').first().get('id')).toBe(1);
  });

  it('should handle SET_TYPE_FILTER', () => {
    const action = {
      type: SET_TYPE_FILTER,
      filter: 'URGENT',
    };
    const newState = notificationReducer(undefined, action);
    expect(newState.get('filter')).toBe('URGENT');
  });

  it('should handle MARK_AS_READ', () => {
    const initialState = Map({
      notifications: Map({
        '1': Map({ id: 1, isRead: false }),
      }),
    });
    const action = {
      type: MARK_AS_READ,
      index: 1,
    };
    const newState = notificationReducer(initialState, action);
    expect(newState.getIn(['notifications', '1', 'isRead'])).toBe(true);
  });

  it('should handle SET_LOADING_STATE', () => {
    const action = {
      type: SET_LOADING_STATE,
      loading: true,
    };
    const newState = notificationReducer(undefined, action);
    expect(newState.get('loading')).toBe(true);
  });
});
