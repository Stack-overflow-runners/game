import { Card } from 'antd';
import createCn from '../../utils/create-cn';
import Layout from '../../components/layout';
import heroImage from '../../assets/hero-image.jpg';
import withAuth from '../../hoc/withAuth';
import './style.css';

const cn = createCn('main');

function MainPage(): JSX.Element {
  return (
    <Layout>
      <div className={cn()}>
        <div className={cn('hero')}>
          <img className={cn('hero-image')} src={heroImage} alt="hero-banner" />
        </div>

        <div className={cn('content')}>
          <div className={cn('content-item')}>
            <div className={cn('brief')}>
              <Card title="Team" className={cn('brief-card')}>
                <p>Антон Колотаев</p>
                <p>Александр Лоскутов</p>
                <p>Георгий Ядрихинский</p>
                <p>Иван Попов</p>
                <p>Ментор Артём Коньков</p>
              </Card>
              <Card title="Stack" className={cn('brief-card')}>
                <p>Typescript</p>
                <p>Ant design</p>
                <p>Redux</p>
                <p>PostCSS</p>
                <p>Canvas</p>
              </Card>
              <Card title="Features" className={cn('brief-card')}>
                <p>SSR</p>
                <p>Авторизация при помощи Yandex OAuth</p>
                <p>Поддержка Fullscreen API</p>
                <p>Поддержка Pointer lock API</p>
                <p>Возможность работы приложения в оффлайне</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(MainPage);
