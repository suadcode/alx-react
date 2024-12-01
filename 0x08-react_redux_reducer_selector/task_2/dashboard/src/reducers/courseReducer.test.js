import courseReducer, { fetchCourseSuccess, selectCourse, unselectCourse } from './courseReducer';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes';

const initialState = [];

describe('courseReducer', () => {
  it('should return the initial state when no action is passed', () => {
    const state = courseReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should return the initial state when an unknown action is passed', () => {
    const state = courseReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('should handle FETCH_COURSE_SUCCESS action correctly', () => {
    const data = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
      { id: 3, name: "React", credit: 40 }
    ];
    const action = fetchCourseSuccess(data);
    const state = courseReducer(undefined, action);
    const expectedState = data.map(course => ({ ...course, isSelected: false }));
    expect(state).toEqual(expectedState);
  });

  it('should handle SELECT_COURSE action correctly', () => {
    const initialState = [
      { id: 1, name: "ES6", isSelected: false, credit: 60 },
      { id: 2, name: "Webpack", isSelected: false, credit: 20 },
      { id: 3, name: "React", isSelected: false, credit: 40 }
    ];
    const action = selectCourse(2);
    const state = courseReducer(initialState, action);
    const expectedState = initialState.map(course =>
      course.id === 2 ? { ...course, isSelected: true } : course
    );
    expect(state).toEqual(expectedState);
  });

  it('should handle UNSELECT_COURSE action correctly', () => {
    const initialState = [
      { id: 1, name: "ES6", isSelected: false, credit: 60 },
      { id: 2, name: "Webpack", isSelected: true, credit: 20 },
      { id: 3, name: "React", isSelected: false, credit: 40 }
    ];
    const action = unselectCourse(2);
    const state = courseReducer(initialState, action);
    const expectedState = initialState.map(course =>
      course.id === 2 ? { ...course, isSelected: false } : course
    );
    expect(state).toEqual(expectedState);
  });
});
