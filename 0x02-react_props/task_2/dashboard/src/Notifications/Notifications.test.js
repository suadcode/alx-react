// Notifications.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';

test('renders NotificationItem elements', () => {
  const { container } = render(<Notifications />);
  const notificationItems = container.querySelectorAll('li[data-notification-type]');
  expect(notificationItems.length).toBeGreaterThan(0);
  notificationItems.forEach(item => {
    expect(item).toBeInstanceOf(HTMLLIElement);
  });
});

test('first NotificationItem element renders the right html', () => {
  const { container } = render(<Notifications />);
  const firstNotificationItem = container.querySelector('li[data-notification-type]');
  expect(firstNotificationItem).toBeInTheDocument();
  expect(firstNotificationItem).toHaveAttribute('data-notification-type', 'default');
  expect(firstNotificationItem).toHaveTextContent('New course available');
});
