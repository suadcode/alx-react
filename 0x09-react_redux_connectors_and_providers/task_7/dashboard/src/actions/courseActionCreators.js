import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from './courseActionTypes';

export const selectCourse = (index) => ({
  type: SELECT_COURSE,
  index
});

export const unSelectCourse = (index) => ({
  type: UNSELECT_COURSE,
  index
});

export const fetchCourses = () => {
  return dispatch => {
    fetch('/dist/courses.json')
      .then(response => response.json())
      .then(data => dispatch(setCourses(data)))
      .catch(error => console.error('Error fetching courses:', error));
  };
};

export const setCourses = (courses) => ({
  type: FETCH_COURSE_SUCCESS,
  courses
});
