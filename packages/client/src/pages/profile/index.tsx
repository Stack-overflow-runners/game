import { useCallback, ChangeEvent } from 'react';
import createCn from '../../utils/create-cn';
import { useAuth } from '../../hooks/auth';
import { useAppDispatch } from '../../hooks/store';
import {
  updateProfile,
  updateProfileAvatar,
} from '../../store/action-creators/profile';
import Layout from '../../components/layout';
import withAuth from '../../hoc/withAuth';
import { UserDTO } from '../../types/user';
import ProfileAvatar from './components/avatar';
import ProfileForm from './components/form';
import 'antd/dist/antd.css';
import './style.css';

const cn = createCn('profile');

function ProfilePage() {
  const dispatch = useAppDispatch();
  const { user, error } = useAuth();

  const handleFormSubmit = useCallback((data: UserDTO) => {
    dispatch(updateProfile(data));
  }, []);

  const handleAvatarChange = useCallback((event: ChangeEvent) => {
    const input = event.target as HTMLInputElement;

    if (input && input.files?.length) {
      const formData = new FormData();

      formData.append('avatar', input.files[0]);

      dispatch(updateProfileAvatar(formData));
    }
  }, []);

  return (
    <Layout>
      <div className={cn()}>
        <ProfileAvatar
          className={cn('avatar')}
          onChange={handleAvatarChange}
          user={user}
        />
        <ProfileForm
          className={cn('form')}
          user={user}
          error={error}
          onSubmit={handleFormSubmit}
        />
      </div>
    </Layout>
  );
}

export default withAuth(ProfilePage);
