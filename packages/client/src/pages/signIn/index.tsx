import React, { useCallback } from 'react';
import { Alert, Button, Checkbox, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Rule } from 'antd/lib/form';
import createCn from '../../utils/create-cn';
import 'antd/dist/antd.css';
import './style.css';
import { useAppDispatch } from '../../hooks/store';
import { useAuth } from '../../hooks/auth';

type FormData = {
  username: string;
  password: string;
  remember: boolean;
};

const cn = createCn('sign-in');

const initialValues: Partial<FormData> = { remember: true };
const usernameRules: Rule[] = [{ required: true, message: 'Введите логин!' }];
const passwordRules: Rule[] = [{ required: true, message: 'Введите пароль!' }];

function SignInPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, signIn, error: formAlert } = useAuth();
  const handleFormFinish = useCallback((data: FormData): void => {
    dispatch(
      signIn({
        login: data.username,
        password: data.password,
        remember: data.remember,
      })
    );
  }, []);
  if (user) {
    navigate('/');
  }

  return (
    <div className={cn()}>
      <Form
        className={cn('form')}
        name="basic"
        initialValues={initialValues}
        onFinish={handleFormFinish}
        layout="vertical"
        autoComplete="off">
        <Typography.Title className={cn('form-title')}>Вход</Typography.Title>
        <Form.Item
          className={cn('form-item')}
          label="Username"
          name="username"
          rules={usernameRules}>
          <Input />
        </Form.Item>

        <Form.Item
          className={cn('form-item')}
          label="Password"
          name="password"
          rules={passwordRules}>
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
            Войти
          </Button>
        </Form.Item>

        <Form.Item
          className={cn('form-item')}
          name="remember"
          valuePropName="checked">
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>
      </Form>
    </div>
  );
}
export default SignInPage;
