import { Query } from '../types/query';

export const clearEmptyKeys = (query: Query): { [key: string]: string | number } => {
  const modifiedQuery: { [key: string]: string | number } = {};
  Object.entries(query).forEach(([param, value]) => {
    if (value !== '') modifiedQuery[param] = value;
  });

  return modifiedQuery;
};
