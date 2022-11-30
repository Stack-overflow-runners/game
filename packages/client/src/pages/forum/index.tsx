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
  const [newTopicValue, setNewTopicValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const toogleEditor = () => setIsOpenEditor(!isOpenEditor);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTopicValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!newTopicValue) return;

    setSubmitting(true);

    setTimeout(() => {
      setTopics([
        {
          id: topics.length,
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: newTopicValue,
          datetime: new Date(),
          comments: [],
          likes: [],
          dislikes: [],
        },
        ...topics,
      ]);
      setNewTopicValue('');
      setIsOpenEditor(false);
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className={cn()}>
        <Title className='title'>Форум</Title>
        <Button
          type={isOpenEditor ? 'text' : 'primary'}
          className={cn('button')}
          onClick={toogleEditor}
        >
          {isOpenEditor ? 'Скрыть' : 'Добавить тему'}
        </Button>
        {isOpenEditor && (
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={newTopicValue}
          />
        )}
        <Collapse expandIconPosition='end'>
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
