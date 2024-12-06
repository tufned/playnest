export const errors = {
  fieldsAreRequired: (fields: string[]) => `Fields ${fields.join(', ')} are required`,
  alreadyRegistered: 'This email is already registered',
  userDoesNotExist: 'User does not exist',
  incorrectEmailOrPasw: 'Incorrect email or password',
  badRefreshToken: 'Bad refresh token',
  refreshTokenNotRetrieved: 'Refresh token not retrieved',
  accessDenied: 'Access denied'
} as const;
