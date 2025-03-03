import { zodValidationError } from "./errorHelpers.js";

export function validationDecorator<T>(func: (data: unknown) => T) {
  return (data: unknown) => {
    try {
      return func(data);
    } catch (error) {
      throw zodValidationError(error);
    }
  };
}
