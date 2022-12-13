import React from 'react';
import { Layout as BaseLayout, Menu } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { Link } from 'react-router-dom';
import Sider from 'antd/lib/layout/Sider';
import createCn from '../../utils/create-cn';
import 'antd/dist/antd.css';
import './style.css';

type LayoutProps = {
  children: React.ReactNode;
};

const cn = createCn('layout');

const items: ItemType[] = [
  { label: <Link to="/">Home</Link>, key: 'home' },
  { label: <Link to="/profile">Profile</Link>, key: 'profile' },
  { label: <Link to="/leader-board">Leader board</Link>, key: 'leader-board' },
  { label: <Link to="/forum">Forum</Link>, key: 'forum' },
];

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <BaseLayout className={cn()} hasSider>
      <Sider className={cn('sidebar')} width={350}>
        <Menu className={cn('sidebar-menu')} theme="dark" items={items} />
        <Link to="/game" className={cn('start-game-button')}>
          Play
        </Link>
      </Sider>
      <Content className={cn('main')}>{children}</Content>
    </BaseLayout>
  );
}

export default Layout;
