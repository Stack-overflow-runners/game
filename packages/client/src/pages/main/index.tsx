import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import createCn from '../../utils/create-cn';
import Layout from '../../components/layout';
import heroImage from '../../assets/hero-image.jpg';
import 'antd/dist/antd.css';
import './style.css';

const cn = createCn('main');

function MainPage(): JSX.Element {
  return (
    <Layout>
      <div className={cn()}>
        <img className={cn('hero-image')} src={heroImage} alt="hero-banner" />
        <div className={cn('content')}>
          <Typography.Title className={cn('title')}>
            Space runner
          </Typography.Title>
          <div className={cn('description')}>
            Лучший free-to-play space runner 2022 года. Начни покорять космос
            уже сегодня!
          </div>
          <Link to="/game">
            <Button type="primary" size="large">
              Играть
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default MainPage;
