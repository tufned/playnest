export const errors = {
  fieldsAreRequired: (fields: string[]) => `Fields ${fields.join(', ')} are required`,
  alreadyRegistered: 'This email is already registered'
} as const;
