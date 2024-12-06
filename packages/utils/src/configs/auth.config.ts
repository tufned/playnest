export const authConfig = {
  nickname: {
    minLength: 2,
    maxLength: 20
  },
  email: {
    minLength: 6
  },
  password: {
    minLength: 8,
    maxLength: 35
  }
} as const;
