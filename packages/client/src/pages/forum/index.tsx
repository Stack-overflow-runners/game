import { useCallback, useState } from 'react';
import { Button, List, Typography } from 'antd';
import Layout from '../../components/layout';
import createCn from '../../utils/create-cn';
import Comment from './components/Comment';
import Editor from './components/Editor';
import commentsMock from './mock';
import { CommentItem } from './types';
import './styles.css';

const { Title } = Typography;
const cn = createCn('forum');

function ForumPage() {
  const [newCommentvalue, setNewCommentvalue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState<CommentItem[]>(commentsMock);
  const [isOpenEditor, setIsOpenEditor] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentvalue(e.target.value);
  };

  const handleSubmit = () => {
    if (!newCommentvalue) return;

    setSubmitting(true);

    setTimeout(() => {
      setComments([
        {
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: newCommentvalue,
          datetime: '15 окт 2022 15:45:52',
        },
        ...comments,
      ]);
      setNewCommentvalue('');
      setSubmitting(false);
    }, 1000);
  };

  const toogleEditor = () => setIsOpenEditor(!isOpenEditor);

  const renderItem = useCallback(
    (comment: CommentItem) => <Comment comment={comment} />,
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
          {isOpenEditor ? 'Скрыть' : 'Написать комментарий'}
        </Button>
        {isOpenEditor && (
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={newCommentvalue}
          />
        )}
        <List
          dataSource={comments}
          header={`${comments.length} ${
            comments.length === 1 ? 'комментарий' : 'комментариев'
          }`}
          itemLayout="horizontal"
          renderItem={renderItem}
        />
      </div>
    </Layout>
  );
};

export default ForumPage;
