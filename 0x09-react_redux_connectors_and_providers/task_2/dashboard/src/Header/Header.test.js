import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import Header from './Header';
import CustomAppProvider from './CustomAppProvider';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('renders Header component', () => {
  const { getByText } = render(<Header />);
  const linkElement = getByText(/School dashboard/i);
  expect(linkElement).toBeInTheDocument();
});

test('does not render logoutSection when user is not logged in', () => {
  const { queryByText } = render(
    <CustomAppProvider value={{ user: { isLoggedIn: false } }}>
      <Header />
    </CustomAppProvider>
  );
  const logoutSection = queryByText(/logout/i);
  expect(logoutSection).not.toBeInTheDocument();
});

test('renders logoutSection when user is logged in', () => {
  const { getByText } = render(
    <CustomAppProvider value={{ user: { isLoggedIn: true, email: 'test@example.com' } }}>
      <Header />
    </CustomAppProvider>
  );
  const logoutSection = getByText(/Welcome test@example.com \(logout\)/i);
  expect(logoutSection).toBeInTheDocument();
});

test('calls logOut function when logout link is clicked', () => {
  const logOutSpy = jest.fn();
  const { getByText } = render(
    <CustomAppProvider value={{ user: { isLoggedIn: true, email: 'test@example.com' }, logOut: logOutSpy }}>
      <Header />
    </CustomAppProvider>
  );
  const logoutLink = getByText(/logout/i);
  fireEvent.click(logoutLink);
  expect(logOutSpy).toHaveBeenCalled();
});

describe('Header Component', () => {
  test('renders Header component', () => {
    const wrapper = shallow(<Header user={{ isLoggedIn: true }} />);
    const welcomeText = wrapper.find('.logoutSection').text();
    expect(welcomeText).toContain('Welcome');
  });
});
