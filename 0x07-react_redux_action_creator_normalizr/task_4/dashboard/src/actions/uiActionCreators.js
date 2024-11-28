import {SELELCT_COURSE, UNSELECT_COURSE } from './courseActionTypes';

export const selectCourse = (index) => ({
  type: SELELCT_COURSE,
  index
});

export const unSelectCourse = (index) => ({
  type: UNSELECT_COURSE,
  index
});
