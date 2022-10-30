import { useCallback } from 'react';
import { Form, Input, Button, Alert, Spin } from 'antd';
import { useNavigate } from 'react-router';
import { Rule } from 'antd/lib/form';
import signUpRules from '../signUp/validator';
import createCn from '../../utils/create-cn';
import { useAuth } from '../../hooks/auth';
import { useAppDispatch } from '../../hooks/store';
import 'antd/dist/antd.css';
import './style.css';
import { updateProfile } from '../../store/action-creators/profile';

type FormData = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};

const cn = createCn('profile');

function ProfilePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, error: formAlert, isLoading } = useAuth();

  const handleSubmit = useCallback((data: FormData): void => {
    dispatch(updateProfile(data));
  }, []);

  if (!isLoading && !user) {
    navigate('/');
  }

  return (
    <div className={cn()}>
      {isLoading 
        ? <Spin size="large" />
        : <Form
            className={cn('form')}
            layout="vertical"
            initialValues={user || {}}
            onFinish={handleSubmit}
          >
          <h1 className={cn('form-title')}>Профиль</h1>
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
            label="Имя в игре"
            name="display_name"
            rules={signUpRules.displayName}>
            <Input />
          </Form.Item>
          <Form.Item
            className={cn('form-item')}
            label="Телефон"
            name="phone"
            rules={signUpRules.phone}>
            <Input />
          </Form.Item>
          {formAlert && (
            <Alert
              message={formAlert}
              type="error"
              className={cn('form-alert')}
            />
          )}
          <Form.Item className={cn('form-item')}>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              className={cn('submit-button')}
            >
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      }
    </div>
  );
}

export default ProfilePage;
