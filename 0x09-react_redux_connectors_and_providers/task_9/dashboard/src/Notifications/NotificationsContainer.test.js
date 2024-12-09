import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NotificationsContainer from './NotificationsContainer';

const mockStore = configureStore([]);

describe('NotificationsContainer', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      notifications: {
        notifications: {
          1: { id: 1, isRead: false, type: "default", value: "New course available" },
          2: { id: 2, isRead: true, type: "urgent", value: "New resume available" },
        }
      },
      ui: {
        isLoading: false,
      }
    });
  });

  it('fetches notifications on mount', () => {
    render(
      <Provider store={store}>
        <NotificationsContainer />
      </Provider>
    );

    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'FETCH_NOTIFICATIONS' }]);
  });
});
