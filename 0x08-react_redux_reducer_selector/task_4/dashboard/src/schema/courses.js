import { schema, normalize } from 'normalizr';

const course = new schema.Entity('courses');

export const coursesNormalizer = (data) => {
  return normalize(data, [course]);
};
