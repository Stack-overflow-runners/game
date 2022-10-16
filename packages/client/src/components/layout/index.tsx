import React, { useCallback, useState } from 'react';
import { Button, Drawer, Layout as BaseLayout, Menu } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { MenuOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/logo.png';
import createCn from '../../utils/create-cn';
import 'antd/dist/antd.css';
import './style.css';

type LayoutProps = {
  children: React.ReactNode;
};

const cn = createCn('layout');

const items: ItemType[] = [
  { label: <Link to="/">Home</Link>, key: 'home' },
  { label: <Link to="/game">Game</Link>, key: 'game' },
  { label: <Link to="/leader-board">Leader-board</Link>, key: 'leader-board' },
];

function Layout({ children }: LayoutProps): JSX.Element {
  const [isDrawerOpened, setDrawerOpened] = useState(false);

  const handleButtonClick = useCallback(() => {
    setDrawerOpened(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setDrawerOpened(false);
  }, []);

  return (
    <BaseLayout className={cn()}>
      <Header className={cn('header')}>
        <Link className={cn('logo')} to="/">
          <img className={cn('logo-image')} src={logoImage} alt="logo" />
        </Link>
        <Button type="primary" onClick={handleButtonClick}>
          <MenuOutlined />
        </Button>
      </Header>
      <Content className={cn('main')}>
        <div className={cn('container')}>{children}</div>
      </Content>
      <Drawer
        title="Menu"
        placement="right"
        onClose={handleDrawerClose}
        open={isDrawerOpened}>
        <Menu items={items} />
      </Drawer>
    </BaseLayout>
  );
}

export default Layout;
