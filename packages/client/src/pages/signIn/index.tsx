import { useCallback } from 'react';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Rule } from 'antd/lib/form';
import createCn from '../../utils/create-cn';
import 'antd/dist/antd.css';
import './style.css';

interface FormData {
  username: string;
  password: string;
  remember: boolean;
}

const fakeUserFetch = (data: FormData): Promise<{ username: string } | null> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(data ? { username: 'Ivan' } : null);
    }, 1000);
  });

const cn = createCn('sign-in');

const initialValues: Partial<FormData> = { remember: true };
const usernameRules: Rule[] = [{ required: true, message: 'Введите логин!' }];
const passwordRules: Rule[] = [{ required: true, message: 'Введите пароль!' }];

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
