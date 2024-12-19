const ERROR_CODES = {
  EMAIL_NOT_FOUND: "Пользователь с таким email не был найден",
  INVALID_PASSWORD: "Пароль неверный",
  INVALID_LOGIN_CREDENTIALS: "Неправильный email или пароль",
  auth: "Пожалуйста войдите в систему",
};

export function error(code) {
  return ERROR_CODES[code] ? ERROR_CODES[code] : "Неизвестная ошибка";
}
