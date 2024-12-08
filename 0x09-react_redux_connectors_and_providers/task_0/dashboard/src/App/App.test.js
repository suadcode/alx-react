// src/App/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import App, { mapStateToProps } from './App';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('renders App component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Your notifications/i);
  expect(linkElement).toBeInTheDocument();
});

test('default state for displayDrawer is false', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.state('displayDrawer')).toBe(false);
});

test('after calling handleDisplayDrawer, the state is true', () => {
  const wrapper = shallow(<App />);
  wrapper.instance().handleDisplayDrawer();
  expect(wrapper.state('displayDrawer')).toBe(true);
});

test('after calling handleHideDrawer, the state is updated to false', () => {
  const wrapper = shallow(<App />);
  wrapper.instance().handleDisplayDrawer();
  expect(wrapper.state('displayDrawer')).toBe(true);
  wrapper.instance().handleHideDrawer();
  expect(wrapper.state('displayDrawer')).toBe(false);
});

test('logIn function updates the state correctly', () => {
  const wrapper = shallow(<App />);
  wrapper.instance().logIn('test@example.com', 'password');
  expect(wrapper.state('user')).toEqual({ email: 'test@example.com', password: 'password', isLoggedIn: true });
});

test('logOut function updates the state correctly', () => {
  const wrapper = shallow(<App />);
  wrapper.setState({ user: { email: 'test@example.com', password: 'password', isLoggedIn: true } });
  wrapper.instance().logOut();
  expect(wrapper.state('user')).toEqual({ email: '', password: '', isLoggedIn: false });
});

test('markNotificationAsRead function updates the state correctly', () => {
  const wrapper = shallow(<App />);
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

// New suite to test mapStateToProps
describe('mapStateToProps', () => {
  it('should return the correct object when passing the state', () => {
    const state = fromJS({
      isUserLoggedIn: true,
    });
    const expectedProps = { isLoggedIn: true };
    expect(mapStateToProps(state)).toEqual(expectedProps);
  });
});
