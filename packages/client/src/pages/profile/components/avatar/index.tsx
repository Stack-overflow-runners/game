import { ChangeEvent } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import SkeletonImage from 'antd/lib/skeleton/Image';
import createCn from '../../../../utils/create-cn';
import CONSTS from '../../../../utils/consts';
import { UserDTO } from '../../../../types/user';
import { Nullable } from '../../../../types/common';
import 'antd/dist/antd.css';
import './style.css';

type ProfileAvatarImageProps = {
  avatar?: string;
};

type ProfileAvatarProps = {
  className?: string;
  user: Nullable<UserDTO>;
  onChange: (e: ChangeEvent) => void;
};

const cn = createCn('profile-avatar');

function Image({ avatar }: ProfileAvatarImageProps) {
  const imageUrl = `${CONSTS.RESOURCE_URL}${avatar}`;

  return avatar ? (
    <img className={cn('avatar-image')} src={imageUrl} alt="avatar" />
  ) : (
    <SkeletonImage className={cn('avatar-image')} />
  );
}

function ProfileAvatar({ user, onChange, className }: ProfileAvatarProps) {
  return (
    <form className={`${className} ${cn('avatar')}`}>
      <label htmlFor="profile-avatar">
        <Image avatar={user?.avatar} />

        <input
          onChange={onChange}
          type="file"
          name="avatar"
          id="profile-avatar"
          className={cn('avatar-input')}
        />

        <div className={cn('avatar-upload')}>
          <PlusOutlined />
          <div>Загрузить</div>
        </div>
      </label>
    </form>
  );
}

Image.defaultProps = {
  avatar: '',
};

ProfileAvatar.defaultProps = {
  className: '',
};

export default ProfileAvatar;