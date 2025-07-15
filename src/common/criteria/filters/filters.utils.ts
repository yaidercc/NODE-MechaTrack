import { Filters } from './filters.interface';
import { COMPARISION_OPERATORS, FILTER_TYPE } from './filters.constant';

export function validateFilter(filter: Filters) {
  if (!filter.field || filter.field.trim() === '') {
    throw new Error('Filter must have a field');
  }

  if (!filter.operator || !Object.values(COMPARISION_OPERATORS).includes(filter.operator as COMPARISION_OPERATORS)) {
    throw new Error(`Invalid operator: ${filter.operator}`);
  }

  if (filter.value === undefined || filter.value === null) {
    throw new Error('Filter must have a value');
  }

  if (!filter.type || !Object.values(FILTER_TYPE).includes(filter.type as FILTER_TYPE)) {
    throw new Error(`Invalid type: ${filter.type}`);
  }

  return filter;
}
