import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes';


const initialState = [];

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      return action.data.map(course => ({
        ...course,
        isSelected: false
      }));
    case SELECT_COURSE:
      return state.map(course =>
        course.id === action.index ? { ...course, isSelected: true } : course
      );
    case UNSELECT_COURSE:
      return state.map(course =>
        course.id === action.index ? { ...course, isSelected: false } : course
      );
    default:
      return state;
  }
};

export const fetchCourseSuccess = (data) => {
  const coursesWithSelection = data.map(course => ({
    ...course,
    isSelected: false
  }));
  return {
    type: FETCH_COURSE_SUCCESS,
    data: coursesWithSelection
  };
};

export const selectCourse = (index) => {
  return {
    type: SELECT_COURSE,
    index
  };
};

export const unselectCourse = (index) => {
  return {
    type: UNSELECT_COURSE,
    index
  };
};

export default courseReducer;
