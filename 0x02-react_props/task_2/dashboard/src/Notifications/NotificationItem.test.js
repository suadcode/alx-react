// NotificationItem.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotificationItem from './NotificationItem';

test('basic rendering of the component works without crashing', () => {
  render(<NotificationItem type="default" />);
});

test('renders the correct html with type and value props', () => {
  const { container } = render(<NotificationItem type="default" value="test" />);
  const li = container.querySelector('li');
  expect(li).toBeInTheDocument();
  expect(li).toHaveAttribute('data-notification-type', 'default');
  expect(li).toHaveTextContent('test');
});

test('renders the correct html with html prop', () => {
  const htmlContent = '<u>test</u>';
  const { container } = render(<NotificationItem type="default" html={htmlContent} />);
  const li = container.querySelector('li');
  expect(li).toBeInTheDocument();
  expect(li).toHaveAttribute('data-notification-type', 'default');
  expect(li).toContainHTML(htmlContent);
});
