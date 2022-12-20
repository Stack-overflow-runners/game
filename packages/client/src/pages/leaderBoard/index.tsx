import { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Empty, Pagination, PaginationProps, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Leader } from './types';
import Layout from '../../components/layout';
import createCn from '../../utils/create-cn';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { getLeaders } from '../../store/action-creators/leaders';
import withAuth from '../../hoc/withAuth';
import './styles.css';

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
    dataIndex: 'displayName',
    key: 'displayName',
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
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const dispatch = useAppDispatch();
  const { leaders, isLoading, error } = useAppSelector(
    state => state.leaderBoard
  );

  const updateLeaders = useCallback(() => {
    dispatch(getLeaders({ pageNumber, countPerPage }));
  }, [pageNumber, countPerPage]);

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    setCountPerPage(pageSize);
    setPageNumber(current);
  };

  useEffect(() => {
    updateLeaders();
  }, [pageNumber, countPerPage]);

  return (
    <Layout>
      <div className={cn()}>
        {leaders && leaders?.length > 0 ? (
          <>
            <Table
              className="table"
              columns={columns}
              dataSource={leaders || []}
              pagination={false}
              rowKey={record => record.score}
              loading={isLoading}
            />
            <div className={cn('footer')}>
              <Pagination
                defaultCurrent={1}
                total={leaders?.length}
                onChange={setPageNumber}
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
              />
              <Button className={cn('button')} onClick={updateLeaders}>
                Обновить
              </Button>
            </div>
          </>
        ) : (
          <Empty />
        )}
        {error && (
          <Alert message={error} type="error" className={cn('alert')} />
        )}
      </div>
    </Layout>
  );
}

export default withAuth(LeaderBoardPage);
