import { createSelector } from 'reselect';
import { List } from 'immutable';

const getAllCourses = state => state.get('courses');

export const selectAllCourses = createSelector(
  getAllCourses,
  courses => List(courses.valueSeq())
);
