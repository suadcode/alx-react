import notificationReducer, { fetchNotificationsSuccess, markAsRead, setTypeFilter } from './notificationReducer';
import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_TYPE_FILTER } from '../actions/notificationActionTypes';

describe('notificationReducer', () => {
  const initialState = {
    notifications: [],
    filter: 'DEFAULT',
  };

  it('should return the initial state when no action is passed', () => {
    expect(notificationReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_NOTIFICATIONS_SUCCESS and return the data passed', () => {
    const data = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", value: "New data available" }
    ];
    const expectedState = {
      ...initialState,
      notifications: data.map(notification => ({ ...notification, isRead: false }))
    };

    expect(notificationReducer(initialState, fetchNotificationsSuccess(data))).toEqual(expectedState);
  });

  it('should handle MARK_AS_READ and update the right item', () => {
    const data = [
      { id: 1, isRead: false, type: "default", value: "New course available" },
      { id: 2, isRead: false, type: "urgent", value: "New resume available" },
      { id: 3, isRead: false, type: "urgent", value: "New data available" }
    ];
    const stateWithNotifications = {
      ...initialState,
      notifications: data
    };
    const expectedState = {
      ...stateWithNotifications,
      notifications: data.map(notification =>
        notification.id === 2 ? { ...notification, isRead: true } : notification
      )
    };

    expect(notificationReducer(stateWithNotifications, markAsRead(2))).toEqual(expectedState);
  });

  it('should handle SET_TYPE_FILTER and update the filter attribute', () => {
    const expectedState = {
      ...initialState,
      filter: 'URGENT'
    };

    expect(notificationReducer(initialState, setTypeFilter('URGENT'))).toEqual(expectedState);
  });
});
