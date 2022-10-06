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
      pattern: /^[a-zA-Z][a-zA-Z0-9-_]*$/g,
      message: 'Введите корректный логин',
    },
    { min: 3, message: 'Не менее 3 символов' },
  ],
  firsName: [
    {
      pattern: /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ-]*$/g,
      message: 'латиница или кириллица',
    },
  ],
  phone: [
    {
      required: true,
      message: 'Введите телефон',
    },
    {
      pattern: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/,
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
      pattern: /(?=.*[A-Z])/,
      message: 'Не менее 1 заглавной буквы',
    },
    {
      pattern: /(?=.*\d)/,
      message: 'Должен содержать хотя бы одну цифру',
    },
  ],
};

export default signUpRules;
