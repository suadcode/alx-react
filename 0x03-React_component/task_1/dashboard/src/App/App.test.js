import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

describe('App component', () => {
  let logOutMock;
  let alertMock;

  beforeEach(() => {
    logOutMock = jest.fn();
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('calls logOut and shows alert when ctrl+h is pressed', () => {
    const wrapper = mount(<App isLoggedIn={true} logOut={logOutMock} />);

    // Simulate ctrl+h key press
    const event = new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' });
    document.dispatchEvent(event);

    expect(alertMock).toHaveBeenCalledWith('Logging you out');
    expect(logOutMock).toHaveBeenCalled();

    wrapper.unmount();
  });
});
