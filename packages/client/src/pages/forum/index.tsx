import { useState } from 'react';
import { Button, Typography } from 'antd';
import Layout from '../../components/layout';
import createCn from '../../utils/create-cn';
import Comment from './components/CommentWithReply';
import Editor from './components/Editor';
import commentsMock from './mock';
import { TCommentWithReply } from './types';
import './styles.css';

const { Title } = Typography;
const cn = createCn('forum');

function ForumPage() {
  const [newCommentvalue, setNewCommentvalue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState<TCommentWithReply[]>(commentsMock);
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
          id: comments.length,
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: newCommentvalue,
          datetime: new Date(),
          subComments: [],
          likes: [],
          dislikes: [],
        },
        ...comments,
      ]);
      setNewCommentvalue('');
      setIsOpenEditor(false);
      setSubmitting(false);
    }, 1000);
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
        {comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
      </div>
    </Layout>
  );
}

export default ForumPage;
