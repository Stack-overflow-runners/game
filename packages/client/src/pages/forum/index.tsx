import { useState } from 'react';
import { Typography, Collapse, Button } from 'antd';
import Layout from '../../components/layout';
import createCn from '../../utils/create-cn';
import topicsMock from './mock';
import { TTopic } from './types';
import Topic from './components/Topic';
import BasicComment from './components/BasicComment';
import Editor from './components/Editor';
import './styles.css';

const { Title } = Typography;
const { Panel } = Collapse;
const cn = createCn('forum');

function ForumPage() {
  const [topics, setTopics] = useState<TTopic[]>(topicsMock);
  const [isOpenEditor, setIsOpenEditor] = useState<boolean>(false);

  const handleSubmitNewTopic = (newTopic: string) => {
    setTopics([
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
      ...topics,
    ]);
    setIsOpenEditor(false);
  };

  const toogleEditor = () => setIsOpenEditor(!isOpenEditor);

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
          {topics.map(topic => (
            <Panel header={<BasicComment comment={topic} />} key={topic.id}>
              <Topic commentWithReply={topic.comments} />
            </Panel>
          ))}
        </Collapse>
      </div>
    </Layout>
  );
}

export default ForumPage;
