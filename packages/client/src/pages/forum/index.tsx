import { useCallback, useEffect, useState } from 'react';
import { Typography, Collapse, Button } from 'antd';
import Layout from '../../components/layout';
import createCn from '../../utils/create-cn';
import Topic from './components/Topic';
import BasicComment from './components/BasicComment';
import Editor from './components/Editor';
import withAuth from '../../hoc/withAuth';
import './styles.css';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { createThread, fetchForum } from '../../store/action-creators/forum';
import PageLoader from '../../components/page-loader';
import { useAuth } from '../../hooks/auth';
import { ForumThreadTransformed } from '../../types/forum';

const { Title } = Typography;
const { Panel } = Collapse;
const cn = createCn('forum');

function ForumPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchForum());
  }, [dispatch]);
  const { isLoading, forum } = useAppSelector(state => state.forum);
  const [isOpenEditor, setIsOpenEditor] = useState<boolean>(false);
  const { user } = useAuth();

  const handleSubmitNewTopic = useCallback(
    (newTopic: string) => {
      if (user && newTopic.length > 0) {
        dispatch(createThread({ content: newTopic, user }));
        setIsOpenEditor(false);
      }
    },
    [user, dispatch]
  );

  const toogleEditor = useCallback(
    () => setIsOpenEditor(isOpen => !isOpen),
    []
  );

  return (
    <Layout>
      <div className={cn()}>
        <Title className="title">Форум</Title>
        <Button
          type={isOpenEditor ? 'text' : 'primary'}
          className={cn('button')}
          onClick={toogleEditor}>
          {isOpenEditor ? 'Скрыть' : 'Добавить тему'}
        </Button>
        {isOpenEditor && <Editor onSubmit={handleSubmitNewTopic} />}
        <Collapse expandIconPosition="end">
          {isLoading ? (
            <PageLoader />
          ) : (
            forum &&
            forum.map((thread: ForumThreadTransformed) => (
              <Panel
                header={<BasicComment comment={thread} />}
                key={thread.threadId}>
                <Topic posts={thread.comments} threadId={thread.threadId} />
              </Panel>
            ))
          )}
        </Collapse>
      </div>
    </Layout>
  );
}

export default withAuth(ForumPage);
