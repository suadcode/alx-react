// App.test.js
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import Notifications from './Notifications';
import Header from './Header';
import Login from './Login';
import Footer from './Footer';

test('renders Notifications component', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Notifications/i)).toBeInTheDocument();
});

test('renders Header component', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Header/i)).toBeInTheDocument();
});

test('renders Login component', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Login/i)).toBeInTheDocument();
});

test('renders Footer component', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Footer/i)).toBeInTheDocument();
});
