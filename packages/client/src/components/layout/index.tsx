import React, { useCallback } from 'react';
import { Avatar, Button, Layout as BaseLayout, Menu } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Sider from 'antd/lib/layout/Sider';
import createCn from '../../utils/create-cn';
import { useAppDispatch } from '../../hooks/store';
import { signOut } from '../../store/action-creators/auth';
import { useAuth } from '../../hooks/auth';
import CONSTS from '../../utils/consts';
import 'antd/dist/antd.css';
import './style.css';

type LayoutProps = {
  children: React.ReactNode;
};

const cn = createCn('layout');

const items: ItemType[] = [
  { label: <Link to="/">Главная</Link>, key: 'home' },
  { label: <Link to="/profile">Профиль</Link>, key: 'profile' },
  {
    label: <Link to="/leader-board">Таблица лидеров</Link>,
    key: 'leader-board',
  },
  { label: <Link to="/forum">Форум</Link>, key: 'forum' },
];

function Layout({ children }: LayoutProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePlayButtonClick = useCallback(() => {
    navigate('/game');
  }, []);

  const handleLogoutButtonClick = useCallback(() => {
    dispatch(signOut());
  }, []);

  return (
    <BaseLayout className={cn()} hasSider>
      <Sider className={cn('sidebar')} width={350}>
        <Menu className={cn('sidebar-menu')} theme="dark" items={items} />
        <div className={cn('buttons')}>
          <Button onClick={handlePlayButtonClick} type="primary" size="large">
            Play
          </Button>
          <Button
            onClick={handleLogoutButtonClick}
            type="primary"
            danger
            size="large">
            Logout
          </Button>
        </div>
      </Sider>
      <BaseLayout>
        <Header className={cn('header')}>
          {user && (
            <div className={cn('user')}>
              <Avatar
                className={cn('user-avatar')}
                src={`${
                  user?.avatar
                    ? `${CONSTS.PROXY_RESOURCE_URL}${user.avatar}`
                    : CONSTS.AVATAR_PLACEHOLDER
                }`}
                shape="square"
                size="large"
              />
              <span className={cn('user-login')}>{user.login}</span>
            </div>
          )}
        </Header>
        <Content className={cn('main')}>{children}</Content>
      </BaseLayout>
    </BaseLayout>
  );
}

export default Layout;
