import { useCallback, useMemo } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { withNaming } from '@bem-react/classname';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import './style.css';

interface FormData {
  username: string;
  password: string;
  remember: boolean;
}

const cn = (block: string, element?: string, modifier?: any) => {
  const preset = { e: '__', m: '_', v: '_' };
  const baseCn = withNaming(preset);

  return baseCn(block, element)(modifier);
};

const fakeUserFetch = (data: FormData) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(data ? { username: 'Ivan' } : null);
    }, 1000);
  });
  
function SignInPage(): JSX.Element {
  const navigate = useNavigate();

  const handleFormFinish = useCallback((data: FormData): void => {
    fakeUserFetch(data).then(user => {
      if (user) {
        navigate('/profile');
      }
    });
  }, []);

  const initialValues: Partial<FormData> = useMemo(
    () => ({ remember: true }),
    []
  );

  return (
    <div className={cn('sign-in')}>
      <Form
        className={cn('sign-in', 'form')}
        name="basic"
        initialValues={initialValues}
        onFinish={handleFormFinish}
        layout="vertical"
        autoComplete="off">
        <Form.Item
          className={cn('sign-in', 'form-item')}
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Введите логин!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          className={cn('sign-in', 'form-item')}
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item className={cn('sign-in', 'form-item')}>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form.Item>

        <Form.Item
          className={cn('sign-in', 'form-item')}
          name="remember"
          valuePropName="checked">
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignInPage;
