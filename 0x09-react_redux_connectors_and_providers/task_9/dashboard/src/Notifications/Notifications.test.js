import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';

describe('Notifications Component', () => {
  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
  ];

  const props = {
    listNotifications: mockNotifications,
    isLoading: false,
    handleDisplayDrawer: jest.fn(),
    handleHideDrawer: jest.fn(),
    markAsRead: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<Notifications {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders loading message when isLoading is true', () => {
    const loadingProps = { ...props, isLoading: true };
    const wrapper = shallow(<Notifications {...loadingProps} />);
    expect(wrapper.text()).toContain('Loading...');
  });
});
