export const errors = {
  badRequest: "Виникла помилка при запиті",
  fieldsAreRequired: (fields: string[]) => `Поля ${fields.join(", ")} є обов'язковими`,
  alreadyRegistered: "Ця електронна пошта вже зареєстрована",
  nicknameIsTaken: "Цей псевдонім вже зайнятий",
  userDoesNotExist: "Користувача з цієї поштою не існує",
  incorrectEmailOrPasw: "Неправильна пошта або пароль",
  badRefreshToken: "Недійсний refresh token",
  refreshTokenNotRetrieved: "Refresh token не отримано",
  accessDenied: "Доступ заборонено"
} as const;

export const schemaErrors = {
  minLength: (length: number) => `Довжина має бути більшою за ${length}`,
  maxLength: (length: number) => `Довжина має бути меншою за ${length}`,
  required: (field: string) => `Поле ${field} є обовʼязковим`,
  enum: (field: string, arr: string[]) =>
    `Значення поля ${field} може бути одне з наведених: ${arr.join(", ")}`,
  emailSymbol: "Email має містити '@' символ"
} as const;
