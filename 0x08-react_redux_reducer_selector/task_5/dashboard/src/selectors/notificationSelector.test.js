import { fromJS } from 'immutable';
import { filterTypeSelected, getNotifications, getUnreadNotifications } from './notificationSelector';

describe('Notification Selectors', () => {
  let state;

  beforeEach(() => {
    state = {
      notifications: fromJS({
        filter: 'DEFAULT',
        notifications: {
          1: { id: 1, isRead: false, type: "default", value: "New course available" },
          2: { id: 2, isRead: true, type: "urgent", value: "New resume available" },
          3: { id: 3, isRead: false, type: "urgent", value: "New data available" }
        }
      })
    };
  });

  it('filterTypeSelected should return the filter type', () => {
    const result = filterTypeSelected(state);
    expect(result).toEqual('DEFAULT');
  });

  it('getNotifications should return the list of notifications', () => {
    const result = getNotifications(state).toJS();
    const expected = {
      1: { id: 1, isRead: false, type: "default", value: "New course available" },
      2: { id: 2, isRead: true, type: "urgent", value: "New resume available" },
      3: { id: 3, isRead: false, type: "urgent", value: "New data available" }
    };
    expect(result).toEqual(expected);
  });

  it('getUnreadNotifications should return the list of unread notifications', () => {
    const result = getUnreadNotifications(state).toJS();
    const expected = {
      1: { id: 1, isRead: false, type: "default", value: "New course available" },
      3: { id: 3, isRead: false, type: "urgent", value: "New data available" }
    };
    expect(result).toEqual(expected);
  });
});
