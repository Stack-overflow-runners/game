import { useCallback, useState } from 'react';
import { Typography, Collapse } from 'antd';
import Layout from '../../components/layout';
import createCn from '../../utils/create-cn';
import topicsMock from './mock';
import { TTopic } from './types';
import Topic from './components/Topic';
import BasicComment from './components/BasicComment';
import Editor from './components/Editor';
import withAuth from '../../hoc/withAuth';
import './styles.css';

const { Title } = Typography;
const { Panel } = Collapse;
const cn = createCn('forum');

function ForumPage() {
  const [topics, setTopics] = useState<TTopic[]>(topicsMock);

  const handleSubmitNewTopic = useCallback((newTopic: string) => {
    setTopics(items => [
      {
        id: topics.length,
        author: 'Han Solo',
        avatar: 'https://joeschmoe.io/api/v1/random',
        content: newTopic,
        datetime: new Date(),
        comments: [],
        likes: [],
        dislikes: [],
      },
      ...items,
    ]);
  }, []);

  return (
    <Layout>
      <div className={cn()}>
        <Title className="title">Форум</Title>
        <Collapse expandIconPosition="end">
          {topics.map(topic => (
            <Panel header={<BasicComment comment={topic} />} key={topic.id}>
              <Topic commentWithReply={topic.comments} />
            </Panel>
          ))}
        </Collapse>
        <Editor className={cn('editor')} onSubmit={handleSubmitNewTopic} />
      </div>
    </Layout>
  );
}

export default withAuth(ForumPage);
