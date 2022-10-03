import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Leader } from './types';
import data from './mock';
import cup from "../../assets/cup.svg";
import 'antd/dist/antd.css';
import "./styles.css";

const columns: ColumnsType<Leader> = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
    width: 50,
    align: 'center',
    render: (value, record, i) => <span>{i + 1}</span>,
  },
  {
    title: 'Player',
    dataIndex: 'player',
    key: 'player',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
    width: 100,
    align: 'center',
  },
];

function LeaderBoardPage() {

  return (
    <div className="leader-board">
      <img src={cup} alt="cup" />
      <h1>Leader Board</h1>
      <div>
        <Button className="leader-board__button">Today</Button>
        <Button className="leader-board__button">Month</Button>
        <Button className="leader-board__button">All Time</Button>
      </div>
      <Table 
        className="table"
        columns={columns} 
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.score}
      />
    </div>
  )
};

export default LeaderBoardPage;