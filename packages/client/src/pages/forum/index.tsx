import { useState } from 'react';
import { Typography, Collapse } from 'antd';
import Layout from '../../components/layout';
import createCn from '../../utils/create-cn';
import topicsMock from './mock';
import { TTopic } from './types';
import Topic from './components/Topic';
import BasicComment from './components/BasicComment';
import './styles.css';

const { Title } = Typography;
const { Panel } = Collapse;
const cn = createCn('forum');

function ForumPage() {
  const [topics] = useState<TTopic[]>(topicsMock);

  return (
    <Layout>
      <div className={cn()}>
        <Title className='title'>Форум</Title>
        <Collapse
          expandIconPosition='end'  
        >
          {topics.map(topic => (
            <Panel
              header={
                <BasicComment
                  comment={topic}
                />
              }
              key={topic.id}>
              <Topic commentWithReply={topic.comments} />
            </Panel>
          ))}
        </Collapse>
      </div>
    </Layout>
  );
}

export default ForumPage;
