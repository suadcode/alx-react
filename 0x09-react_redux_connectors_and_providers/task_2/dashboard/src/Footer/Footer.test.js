import React from 'react';
import { render } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import Footer from './Footer';
import { AppProvider } from '../App/AppContext';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('renders Footer component', () => {
  const { getByText } = render(
    <AppProvider>
      <Footer />
    </AppProvider>
  );
  const linkElement = getByText(/Copyright/i);
  expect(linkElement).toBeInTheDocument();
});

test('link is not displayed when the user is logged out', () => {
  const { queryByText } = render(
    <AppProvider value={{ user: { isLoggedIn: false } }}>
      <Footer />
    </AppProvider>
  );
  const linkElement = queryByText(/Contact us/i);
  expect(linkElement).not.toBeInTheDocument();
});

test('link is displayed when the user is logged in', () => {
  const { getByText } = render(
    <AppProvider value={{ user: { isLoggedIn: true } }}>
      <Footer />
    </AppProvider>
  );
  const linkElement = getByText(/Contact us/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Footer Component', () => {
  test('renders Footer component', () => {
    const wrapper = shallow(<Footer user={{ isLoggedIn: true }} />);
    const linkElement = wrapper.find('p').at(1).find('a');
    expect(linkElement.text()).toBe('Contact us');
  });
});
