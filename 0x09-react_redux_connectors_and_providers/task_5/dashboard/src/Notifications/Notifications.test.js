import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';

describe('Notifications Component', () => {
  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
  ];

  const mockFetchNotifications = jest.fn();
  const mockMarkNotificationAsRead = jest.fn();
  const mockHandleDisplayDrawer = jest.fn();
  const mockHandleHideDrawer = jest.fn();

  const props = {
    displayDrawer: true,
    listNotifications: mockNotifications,
    fetchNotifications: mockFetchNotifications,
    markNotificationAsRead: mockMarkNotificationAsRead,
    handleDisplayDrawer: mockHandleDisplayDrawer,
    handleHideDrawer: mockHandleHideDrawer,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<Notifications {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('fetchNotifications is called on mount', () => {
    shallow(<Notifications {...props} />);
    expect(mockFetchNotifications).toHaveBeenCalled();
  });


  it('calls setLoadingState action correctly', () => {
    const wrapper = shallow(<Notifications {...props} />);
    wrapper.instance().props.setLoadingState(true);
    expect(wrapper.instance().props.setLoadingState).toHaveBeenCalledWith(true);
  });

  it('calls setNotifications action correctly', () => {
    const wrapper = shallow(<Notifications {...props} />);
    wrapper.instance().props.setNotifications(mockNotifications);
    expect(wrapper.instance().props.setNotifications).toHaveBeenCalledWith(mockNotifications);
  });

  it('calls fetchNotifications action correctly', () => {
    const wrapper = shallow(<Notifications {...props} />);
    wrapper.instance().props.fetchNotifications();
    expect(wrapper.instance().props.fetchNotifications).toHaveBeenCalled();
  });
});
