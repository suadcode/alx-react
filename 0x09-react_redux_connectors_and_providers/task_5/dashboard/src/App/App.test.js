import React from 'react';
import { render, screen } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App, { mapStateToProps } from './App';

const mockStore = configureStore([]);

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('App Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      isUserLoggedIn: false,
      isNotificationDrawerVisible: false
    });
  });

  test('renders App component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const linkElement = screen.getByText(/Your notifications/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('default state for displayDrawer is false', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    ).dive().dive();
    expect(wrapper.props().displayDrawer).toBe(false);
  });

  test('logIn function updates the state correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    ).dive().dive();
    wrapper.instance().logIn('test@example.com', 'password');
    expect(wrapper.state('user')).toEqual({ email: 'test@example.com', password: 'password', isLoggedIn: true });
  });

  test('logOut function updates the state correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    ).dive().dive();
    wrapper.setState({ user: { email: 'test@example.com', password: 'password', isLoggedIn: true } });
    wrapper.instance().logOut();
    expect(wrapper.state('user')).toEqual({ email: '', password: '', isLoggedIn: false });
  });

  test('markNotificationAsRead function updates the state correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    ).dive().dive();
    const mockNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
    ];
    wrapper.setState({ listNotifications: mockNotifications });

    wrapper.instance().markNotificationAsRead(2);

    expect(wrapper.state('listNotifications').length).toBe(2);
    expect(wrapper.state('listNotifications')).not.toContainEqual({ id: 2, type: 'urgent', value: 'New resume available' });
  });

  describe('mapStateToProps', () => {
    test('returns the correct object from state', () => {
      const state = fromJS({
        isUserLoggedIn: true,
        isNotificationDrawerVisible: false
      });
      const expectedProps = {
        isLoggedIn: true,
        displayDrawer: false
      };
      expect(mapStateToProps(state)).toEqual(expectedProps);
    });
  });
  describe('App Component', () => {
    test('renders App component', () => {
      const wrapper = shallow(<App isLoggedIn={true} displayDrawer={false} />);
      const linkElement = wrapper.find('Notifications');
      expect(linkElement.exists()).toBeTruthy();
    });
  });
});
