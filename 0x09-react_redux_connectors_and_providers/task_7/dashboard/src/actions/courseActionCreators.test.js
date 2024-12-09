import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchCourses, setCourses } from './courseActionCreators';
import { FETCH_COURSE_SUCCESS } from './courseActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('course action creators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('fetchCourses should dispatch setCourses action on successful fetch', () => {
    const mockCourses = [
      { id: 1, name: 'Course 1' },
      { id: 2, name: 'Course 2' }
    ];

    fetchMock.getOnce('/dist/courses.json', {
      body: mockCourses,
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: FETCH_COURSE_SUCCESS, courses: mockCourses }
    ];

    const store = mockStore({});

    return store.dispatch(fetchCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
