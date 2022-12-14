import { useCallback, useEffect } from 'react';
import { Typography, Collapse } from 'antd';
import Layout from '../../components/layout';
import createCn from '../../utils/create-cn';
import withAuth from '../../hoc/withAuth';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { createThread, fetchForum } from '../../store/action-creators/forum';
import PageLoader from '../../components/page-loader';
import { useAuth } from '../../hooks/auth';
import { ForumThreadTransformed } from '../../types/forum';
import Topic from './components/Topic';
import BasicComment from './components/BasicComment';
import Editor from './components/Editor';
import './styles.css';

const { Title } = Typography;
const { Panel } = Collapse;
const cn = createCn('forum');

function ForumPage() {
  const dispatch = useAppDispatch();
  const { isLoading, forum } = useAppSelector(state => state.forum);
  const { user } = useAuth();

  const handleSubmitNewTopic = useCallback(
    (newTopic: string) => {
      if (user && newTopic.length > 0) {
        dispatch(createThread({ content: newTopic, user }));
      }
    },
    [user, dispatch]
  );

  useEffect(() => {
    dispatch(fetchForum());
  }, [dispatch]);

  return (
    <Layout>
      <div className={cn()}>
        <Title className="title">Форум</Title>
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
        <Editor className={cn('editor')} onSubmit={handleSubmitNewTopic} />
      </div>
    </Layout>
  );
}

export default withAuth(ForumPage);
