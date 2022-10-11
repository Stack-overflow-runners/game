import React, { useCallback } from 'react';
import { Alert, Button, Checkbox, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Rule } from 'antd/lib/form';
import createCn from '../../utils/create-cn';
import 'antd/dist/antd.css';
import './style.css';
import signIn from './services/signin-service';

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
  const navigate = useNavigate();
  const [formAlert, setFormAlert] = React.useState<string | null>(null);
  const handleFormFinish = useCallback(
    async (data: FormData): Promise<void> => {
      const res = await signIn({
        login: data.username,
        password: data.password,
        remember: data.remember,
      });
      if (res.error) {
        setFormAlert(res.error);
        return;
      }
      if (res.data?.id) {
        navigate('/');
      }
    },
    []
  );

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
          <>
            <br />
            <Alert message={formAlert} type="error" />
            <br />
          </>
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
