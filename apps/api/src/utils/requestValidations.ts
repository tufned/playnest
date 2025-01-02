import { createError } from './errorHelpers.js';
import { errors } from '../constants/errors.js';

export const checkFieldsExistence = (reqBody: any, requiredFields: string[]) => {
  const bodyIsObject = typeof reqBody === 'object';
  const requiredFieldsExist = requiredFields.every(
    (field) => reqBody[field] !== undefined
  );

  if (!(bodyIsObject && requiredFieldsExist))
    throw createError(406, errors.fieldsAreRequired(requiredFields));
};
