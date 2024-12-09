import React from 'react';
import { render } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CourseList from './CourseList';
import { fetchCourses, selectCourse, unSelectCourse } from './courseActionCreators';

// Mock Redux store
const mockStore = configureStore([]);

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

test('renders CourseList component', () => {
  const listCourses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];
  const store = mockStore({ courses: { listCourses } });

  const { getByText } = render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  const courseElement = getByText(/Available courses/i);
  expect(courseElement).toBeInTheDocument();
});

test('dispatches fetchCourses action on mount', () => {
  const store = mockStore({ courses: { listCourses: [] } });

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  const actions = store.getActions();
  expect(actions).toContainEqual(fetchCourses());
});

test('dispatches selectCourse and unSelectCourse actions correctly on row change', () => {
  const listCourses = [
    { id: 1, name: 'ES6', credit: 60, isSelected: false },
    { id: 2, name: 'Webpack', credit: 20, isSelected: false },
    { id: 3, name: 'React', credit: 40, isSelected: false },
  ];
  const store = mockStore({ courses: { listCourses } });

  const { getByTestId } = render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  const checkbox = getByTestId('checkbox-1');
  checkbox.click();

  let actions = store.getActions();
  expect(actions).toContainEqual(selectCourse(1));
  
  checkbox.click();

  actions = store.getActions();
  expect(actions).toContainEqual(unSelectCourse(1));
});
