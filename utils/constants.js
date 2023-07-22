const urlRegx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const ERROR_MSG = {
  NOT_FOUND_MOVIE: 'Фильм не найден',
  NOT_FOUND_USER: 'Пользователь не найден',
  FORBIDDEN: 'Удалять фильмы, которые добавили другие пользователи, нельзя',
  BADREQUEST: 'Переданы некорректные данные',
  CONFLICT: 'Такой пользователь уже существует',
  AUTH_ERROR: 'Неверные почта или пароль',
};
module.exports = {
  ERROR_MSG,
  urlRegx,
};
