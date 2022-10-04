import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router';
import 'antd/dist/antd.css';
import './style.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withNaming } from '@bem-react/classname';

interface FormData {
  email: string;
  login: string;
  name?: boolean;
  surname?: string;
  phone: string;
  password: string;
  passwordRepeat: string;
}

const inputRules = {
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

// todo заменить на from utils когда будет готов
const cn = (block: string, element?: string, modifier?: any) => {
  const preset = { e: '__', m: '_', v: '_' };
  const baseCn = withNaming(preset);

  return baseCn(block, element)(modifier);
};

function SignUpPage(): JSX.Element {
  const navigate = useNavigate();

  const handleSubmit = (values: FormData) => {
    console.log('Submit:', values);
  };

  return (
    <div className={cn('sign-up')}>
      <Form
        className={cn('sign-up', 'form')}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}>
        <Typography.Title className={cn('sign-up', 'form-title')}>
          Регистрация
        </Typography.Title>
        <Form.Item
          className={cn('sign-up', 'form-item')}
          label="Почта"
          name="email"
          rules={inputRules.email}>
          <Input />
        </Form.Item>
        <Form.Item
          className={cn('sign-up', 'form-item')}
          label="Логин"
          name="login"
          rules={inputRules.login}>
          <Input />
        </Form.Item>
        <Form.Item
          className={cn('sign-up', 'form-item')}
          label="Имя"
          name="first_name"
          rules={inputRules.firsName}>
          <Input />
        </Form.Item>
        <Form.Item
          className={cn('sign-up', 'form-item')}
          label="Фамилия"
          name="second_name"
          rules={inputRules.firsName}>
          <Input />
        </Form.Item>
        <Form.Item
          className={cn('sign-up', 'form-item')}
          label="Телефон"
          name="phone"
          rules={inputRules.phone}>
          <Input />
        </Form.Item>
        <Form.Item
          className={cn('sign-up', 'form-item')}
          name="password"
          label="Пароль"
          rules={inputRules.password}
          hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item
          className={cn('sign-up', 'form-item')}
          name="passwordRepeat"
          label="Пароль (еще раз)"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Введите пароль еще раз',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item className={cn('sign-up', 'form-item')}>
          <Button type="primary" htmlType="submit" block>
            Зарегистрироваться
          </Button>
        </Form.Item>

        <Form.Item className={cn('sign-up', 'form-item')}>
          <Button
            type="link"
            htmlType="button"
            block
            onClick={() => navigate('/sign-in')}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignUpPage;
