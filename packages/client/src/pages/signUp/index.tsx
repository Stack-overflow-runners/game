import React, { useCallback } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { useNavigate } from 'react-router';
import { Rule } from 'antd/lib/form';
import 'antd/dist/antd.css';
import './style.css';
import signUpRules from './validator';
import signUp from './services/signup-service';
import createCn from '../../utils/create-cn';

type FormData = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  passwordRepeat: string;
};

const cn = createCn('sign-up');

function SignUpPage(): JSX.Element {
  const navigate = useNavigate();
  const [formAlert, setFormAlert] = React.useState<string | null>(null);
  const onLoginClick = useCallback((): void => {
    navigate('/sign-in');
  }, []);
  const handleSubmit = useCallback(async (data: FormData) => {
    const res = await signUp(data);
    if (res.error) {
      setFormAlert(res.error);
      return;
    }
    if (res.data?.id) {
      navigate('/');
    }
  }, []);

  return (
    <div className={cn()}>
      <Form
        className={cn('form')}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}>
        <h1 className={cn('form-title')}>Регистрация</h1>
        <Form.Item
          className={cn('form-item')}
          label="Почта"
          name="email"
          rules={signUpRules.email as Rule[]}>
          <Input />
        </Form.Item>
        <Form.Item
          className={cn('form-item')}
          label="Логин"
          name="login"
          rules={signUpRules.login}>
          <Input />
        </Form.Item>
        <Form.Item
          className={cn('form-item')}
          label="Имя"
          name="first_name"
          rules={signUpRules.firstName}>
          <Input />
        </Form.Item>
        <Form.Item
          className={cn('form-item')}
          label="Фамилия"
          name="second_name"
          rules={signUpRules.secondName}>
          <Input />
        </Form.Item>
        <Form.Item
          className={cn('form-item')}
          label="Телефон"
          name="phone"
          rules={signUpRules.phone}>
          <Input />
        </Form.Item>
        <Form.Item
          className={cn('form-item')}
          name="password"
          label="Пароль"
          rules={signUpRules.password}
          hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item
          className={cn('form-item')}
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
        {formAlert && (
          <Alert
            message={formAlert}
            type="error"
            className={cn('form-alert')}
          />
        )}
        <Form.Item className={cn('form-item')}>
          <Button type="primary" htmlType="submit" block>
            Зарегистрироваться
          </Button>
        </Form.Item>

        <Form.Item className={cn('form-item')}>
          <Button type="link" htmlType="button" block onClick={onLoginClick}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignUpPage;
