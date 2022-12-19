import { Form, Input, Button, Alert } from 'antd';
import { Rule } from 'antd/lib/form';
import signUpRules from '../../../signUp/validator';
import createCn from '../../../../utils/create-cn';
import { UserDTO } from '../../../../types/user';
import { Nullable } from '../../../../types/common';
import './style.css';

type ProfileFormProps = {
  className?: string;
  error: Nullable<string>;
  user: Nullable<UserDTO>;
  onSubmit: (data: UserDTO) => void;
};

const cn = createCn('profile-form');

function ProfileForm({ user, error, onSubmit, className }: ProfileFormProps) {
  const initialValues = user || {};

  return (
    <Form
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
      className={`${className} ${cn('form')}`}>
      <div className={cn('form-items')}>
        <Form.Item
          className={cn('form-item')}
          label="Email"
          name="email"
          rules={signUpRules.email as Rule[]}>
          <Input className={cn('form-item-input')} size="large" placeholder="Введите еmail" />
        </Form.Item>
        <Form.Item
          className={cn('form-item')}
          label="Логин"
          name="login"
          rules={signUpRules.login}>
          <Input className={cn('form-item-input')} size="large" placeholder="Введите логин" />
        </Form.Item>
        <Form.Item
          className={cn('form-item')}
          label="Имя"
          name="first_name"
          rules={signUpRules.firstName}>
          <Input className={cn('form-item-input')} size="large" placeholder="Введите имя" />
        </Form.Item>
        <Form.Item
          className={cn('form-item')}
          label="Фамилия"
          name="second_name"
          rules={signUpRules.secondName}>
          <Input className={cn('form-item-input')} size="large" placeholder="Введите фамилию" />
        </Form.Item>
        <Form.Item
          className={cn('form-item')}
          label="Никнейм"
          name="display_name"
          rules={signUpRules.displayName}>
          <Input className={cn('form-item-input')} size="large" placeholder="Введите никнейм для игры" />
        </Form.Item>
        <Form.Item
          className={cn('form-item')}
          label="Телефон"
          name="phone"
          rules={signUpRules.phone}>
          <Input className={cn('form-item-input')} size="large" placeholder="Введите телефон" />
        </Form.Item>
      </div>
      {error && (
        <Alert message={error} type="error" className={cn('form-alert')} />
      )}
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        className={cn('form-submit-button')}>
        Сохранить
      </Button>
    </Form>
  );
}

ProfileForm.defaultProps = {
  className: '',
};

export default ProfileForm;
