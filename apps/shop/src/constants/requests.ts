const URLs = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout"
  },
  users: {
    get: (id: number) => `/users/${id}`,
    update: (id: number) => `/users/${id}`,
    updatePassword: (id: number) => `/users/${id}/password`
  }
} as const;

export default URLs;
