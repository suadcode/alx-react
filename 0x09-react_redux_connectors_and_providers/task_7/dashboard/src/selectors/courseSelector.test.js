import { fromJS } from 'immutable';
import { selectAllCourses } from './courseSelector';

describe('selectAllCourses selector', () => {
  it('should return all courses as a List', () => {
    const state = fromJS({
      courses: {
        1: { id: 1, name: 'ES6', credit: 60 },
        2: { id: 2, name: 'Webpack', credit: 20 },
        3: { id: 3, name: 'React', credit: 40 },
      },
    });

    const selectedCourses = selectAllCourses(state);
    expect(selectedCourses.size).toBe(3);
    expect(selectedCourses.get(0).get('name')).toBe('ES6');
    expect(selectedCourses.get(1).get('name')).toBe('Webpack');
    expect(selectedCourses.get(2).get('name')).toBe('React');
  });
});
