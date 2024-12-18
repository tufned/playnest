export const authErrors = {
  requiredField: (field?: string) => `Поле ${field || ''} обовʼязкове до заповнення`,
  minLength: (num: number) => `Довжина має бути більшою за ${num}`,
  maxLength: (num: number) => `Довжина не може бути більшою за ${num}`,
  invalidEmail: 'Email не валідний',
  passwordUpperCase: 'Пароль має містити велику літеру',
  passwordMismatch: 'Паролі не співпадають'
} as const;
