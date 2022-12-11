const CIRILLIC_OR_LATIN_REGEXP = /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ-]*$/g;
const PHONE_REGEXP = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;
const LOGIN_REGEXP = /^[a-zA-Z][a-zA-Z0-9-_]*$/g;
const CHECK_UPPER_SYMBOL_REGEXP = /(?=.*[A-Z])/;
const CHECK_NUMBER_REGEXP = /(?=.*\d)/;

const signUpRules = {
  email: [
    {
      type: 'email',
      message: 'Введите корректный адрес почты',
    },
    {
      required: true,
      message: 'Введите почту',
    },
  ],
  login: [
    { required: true, message: 'Введите логин' },
    {
      pattern: LOGIN_REGEXP,
      message: 'Введите корректный логин',
    },
    { min: 3, message: 'Не менее 3 символов' },
  ],
  firstName: [
    { required: true, message: 'Введите имя' },
    {
      pattern: CIRILLIC_OR_LATIN_REGEXP,
      message: 'латиница или кириллица',
    },
  ],
  secondName: [
    { required: true, message: 'Введите фамилию' },
    {
      pattern: CIRILLIC_OR_LATIN_REGEXP,
      message: 'латиница или кириллица',
    },
  ],
  displayName: [
    { required: true, message: 'Введите имя в игре' },
    {
      pattern: CIRILLIC_OR_LATIN_REGEXP,
      message: 'латиница или кириллица',
    },
  ],
  phone: [
    {
      required: true,
      message: 'Введите телефон',
    },
    {
      pattern: PHONE_REGEXP,
      message: 'Введите корректный телефон',
    },
  ],
  password: [
    {
      required: true,
      message: 'Введите пароль',
    },
    { min: 8, message: 'Не менее 8 символов' },
    {
      pattern: CHECK_UPPER_SYMBOL_REGEXP,
      message: 'Не менее 1 заглавной буквы',
    },
    {
      pattern: CHECK_NUMBER_REGEXP,
      message: 'Должен содержать хотя бы одну цифру',
    },
  ],
};

export default signUpRules;
