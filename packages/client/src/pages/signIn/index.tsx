import { useCallback, useEffect } from 'react';
import { Alert, Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import createCn from '../../utils/create-cn';
import { useAuth } from '../../hooks/auth';
import AuthSocial from '../../components/auth-social';
import { getOAuthProviders } from '../../utils/get-OAuth-provider';
import signUpRules from '../signUp/validator';
import './style.css';

type FormData = {
  username: string;
  password: string;
  remember: boolean;
};

const providers = getOAuthProviders();

const cn = createCn('sign-in');

const initialValues: Partial<FormData> = { remember: true };

function SignInPage(): JSX.Element {
  const navigate = useNavigate();
  const { user, signIn, error: formAlert } = useAuth();
  const handleFormFinish = useCallback((data: FormData): void => {
    signIn({
      login: data.username,
      password: data.password,
      remember: data.remember,
    });
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className={cn()}>
      <Form
        className={cn('form')}
        name="basic"
        initialValues={initialValues}
        onFinish={handleFormFinish}
        layout="vertical"
        autoComplete="off">
        <h1 className={cn('form-title')}>Вход</h1>
        <Form.Item
          className={cn('form-item')}
          label="Username"
          name="username"
          rules={signUpRules.login}>
          <Input />
        </Form.Item>

        <Form.Item
          className={cn('form-item')}
          label="Password"
          name="password"
          rules={signUpRules.password}>
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
        <div className={cn('form-item')}>
          <AuthSocial providers={providers} />
        </div>
        <Form.Item
          className={cn('form-item')}
          name="remember"
          valuePropName="checked">
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item className={cn('form-item')}>
          <Link to="/sign-up">Регистрация</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
export default SignInPage;
