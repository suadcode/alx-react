import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

describe('Notifications Component', () => {
  let wrapper;

  describe('With empty listNotifications or no listNotifications prop', () => {
    beforeEach(() => {
      wrapper = shallow(<Notifications displayDrawer={true} />);
    });

    it('renders correctly without crashing', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('renders "No new notification for now" when listNotifications is empty', () => {
      wrapper.setProps({ listNotifications: [] });
      expect(wrapper.find(NotificationItem).length).toBe(1);
      expect(wrapper.find(NotificationItem).prop('value')).toBe('No new notification for now');
    });

    it('does not render "Here is the list of notifications"', () => {
      wrapper.setProps({ listNotifications: [] });
      expect(wrapper.find('p').text()).not.toBe('Here is the list of notifications');
    });
  });

  describe('With listNotifications containing elements', () => {
    const listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
    ];

    beforeEach(() => {
      wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
    });

    it('renders the correct number of NotificationItem components', () => {
      expect(wrapper.find(NotificationItem).length).toBe(3);
    });

    it('renders the NotificationItems with the correct values', () => {
      expect(wrapper.find(NotificationItem).at(0).prop('value')).toBe('New course available');
      expect(wrapper.find(NotificationItem).at(1).prop('value')).toBe('New resume available');
      expect(wrapper.find(NotificationItem).at(2).prop('html')).toEqual({ __html: '<strong>Urgent requirement</strong> - complete by EOD' });
    });
  });
});
