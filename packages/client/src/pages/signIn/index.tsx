import { useCallback } from 'react';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import './style.css';
import cn from '../../utils/cn';

interface FormData {
  username: string;
  password: string;
  remember: boolean;
}

const fakeUserFetch = (data: FormData) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(data ? { username: 'Ivan' } : null);
    }, 1000);
  });

const signIn = cn('sign-in');

const initialValues: Partial<FormData> = { remember: true };

function SignInPage(): JSX.Element {
  const navigate = useNavigate();

  const handleFormFinish = useCallback((data: FormData): void => {
    fakeUserFetch(data).then(user => {
      if (user) {
        navigate('/profile');
      }
    });
  }, []);

  return (
    <div className={signIn()}>
      <Form
        className={signIn('form')}
        name="basic"
        initialValues={initialValues}
        onFinish={handleFormFinish}
        layout="vertical"
        autoComplete="off">
        <Typography.Title className={signIn('form-title')}>
          Вход
        </Typography.Title>
        <Form.Item
          className={signIn('form-item')}
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Введите логин!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          className={signIn('form-item')}
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item className={signIn('form-item')}>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form.Item>

        <Form.Item
          className={signIn('form-item')}
          name="remember"
          valuePropName="checked">
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignInPage;
