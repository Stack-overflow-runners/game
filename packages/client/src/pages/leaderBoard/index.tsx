import { Table, Button, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Leader } from './types';
import data from './mock';
import cup from '../../assets/cup.svg';
import 'antd/dist/antd.css';
import './styles.css';
import Layout from '../../components/layout';
import createCn from '../../utils/create-cn';

const { Title } = Typography;
const cn = createCn('leader-board');

const columns: ColumnsType<Leader> = [
  {
    title: 'Место',
    dataIndex: 'rank',
    key: 'rank',
    width: 50,
    align: 'center',
    render: (value, record, i) => <span>{i + 1}</span>,
  },
  {
    title: 'Игрок',
    dataIndex: 'player',
    key: 'player',
  },
  {
    title: 'Очки',
    dataIndex: 'score',
    key: 'score',
    width: 100,
    align: 'center',
  },
];

function LeaderBoardPage() {
  return (
    <Layout>
      <div className={cn()}>
        <img src={cup} alt="cup" />
        <Title className="title">Таблица лидеров</Title>
        <div>
          <Button className={cn('button')}>Сегодня</Button>
          <Button className={cn('button')}>Месяц</Button>
          <Button className={cn('button')}>Всё время</Button>
        </div>
        <Table
          className="table"
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey={record => record.score}
        />
      </div>
    </Layout>
  );
}

export default LeaderBoardPage;
