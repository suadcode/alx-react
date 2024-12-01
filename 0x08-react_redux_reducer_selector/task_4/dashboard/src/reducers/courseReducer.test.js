import { fromJS } from 'immutable';
import courseReducer from './courseReducer';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes';
import { coursesNormalizer } from '../schema/courses';

describe('courseReducer', () => {
  const initialState = fromJS({
    courses: {}
  });

  it('should return the initial state when no action is passed', () => {
    expect(courseReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_COURSE_SUCCESS and return the data passed', () => {
    const data = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
      { id: 3, name: "React", credit: 40 }
    ];
    const normalizedData = coursesNormalizer(data);
    const expectedState = initialState.set('courses', fromJS(normalizedData.entities.courses));

    expect(courseReducer(initialState, { type: FETCH_COURSE_SUCCESS, data })).toEqual(expectedState);
  });

  it('should handle SELECT_COURSE and update the right item', () => {
    const data = [
      { id: 1, isSelected: false, name: "ES6", credit: 60 },
      { id: 2, isSelected: false, name: "Webpack", credit: 20 },
      { id: 3, isSelected: false, name: "React", credit: 40 }
    ];
    const normalizedData = coursesNormalizer(data);
    const stateWithCourses = initialState.set('courses', fromJS(normalizedData.entities.courses));
    const expectedState = stateWithCourses.setIn(['courses', '2', 'isSelected'], true);

    expect(courseReducer(stateWithCourses, { type: SELECT_COURSE, index: 2 })).toEqual(expectedState);
  });

  it('should handle UNSELECT_COURSE and update the right item', () => {
    const data = [
      { id: 1, isSelected: false, name: "ES6", credit: 60 },
      { id: 2, isSelected: true, name: "Webpack", credit: 20 },
      { id: 3, isSelected: false, name: "React", credit: 40 }
    ];
    const normalizedData = coursesNormalizer(data);
    const stateWithCourses = initialState.set('courses', fromJS(normalizedData.entities.courses));
    const expectedState = stateWithCourses.setIn(['courses', '2', 'isSelected'], false);

    expect(courseReducer(stateWithCourses, { type: UNSELECT_COURSE, index: 2 })).toEqual(expectedState);
  });
});
