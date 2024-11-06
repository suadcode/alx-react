import React from 'react';
import { mount } from 'enzyme';
import NotificationItem from './NotificationItem';

describe('NotificationItem Component', () => {
  it('calls markAsRead function with correct ID', () => {
    const markAsRead = jest.fn();
    const wrapper = mount(
      <NotificationItem
        id={1}
        type="default"
        value="New course available"
        markAsRead={markAsRead}
      />
    );

    wrapper.find('li').simulate('click');

    expect(markAsRead).toHaveBeenCalledWith(1);
  });
});
