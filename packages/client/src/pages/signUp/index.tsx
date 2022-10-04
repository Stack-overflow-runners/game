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

// todo заменить на from utils
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
          rules={[
            {
              type: 'email',
              message: 'Введите корректный адрес почты',
            },
            {
              required: true,
              message: 'Введите почту',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          className={cn('sign-up', 'form-item')}
          label="Логин"
          name="login"
          rules={[
            { required: true, message: 'Введите логин' },
            {
              pattern: /^[a-zA-Z][a-zA-Z0-9-_]*$/g,
              message: 'Введите корректный логин',
            },
            { min: 3, message: 'Не менее 3 символов' },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          className={cn('sign-up', 'form-item')}
          label="Имя"
          name="first_name"
          rules={[
            {
              pattern: /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ-]*$/g,
              message: 'латиница или кириллица',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          className={cn('sign-up', 'form-item')}
          label="Фамилия"
          name="second_name"
          rules={[
            {
              pattern: /^[a-zA-Zа-яА-ЯёЁ][a-zA-Zа-яА-ЯёЁ-]*$/g,
              message: 'латиница или кириллица',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          className={cn('sign-up', 'form-item')}
          label="Телефон"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Введите телефон',
            },
            {
              pattern: /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/,
              message: 'Введите корректный телефон',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          className={cn('sign-up', 'form-item')}
          name="password"
          label="Пароль"
          rules={[
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
          ]}
          hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item
          className={cn('sign-up', 'form-item')}
          name="confirm"
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
