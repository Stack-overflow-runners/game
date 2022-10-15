import { useState } from 'react';
import { Button, List, Typography } from 'antd';
import createCn from '../../utils/create-cn';
import Comment from './components/Comment';
import Editor from './components/Editor';
import commentsMock from './mock';
import { CommentItem } from './types';
import './styles.css';

const { Title } = Typography;
const cn = createCn('forum');

function ForumPage() {
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState<CommentItem[]>(commentsMock);
  const [isOpenEditor, setIsOpenEditor] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };  

  const handleSubmit = () => {
    if (!value) return;

    setSubmitting(true);

    setTimeout(() => {
      setComments([
        {
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: value,
          datetime: '15 окт 2022 15:45:52',
        },
        ...comments,
      ]);
      setValue('');
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className={cn()}>
      <Title className='title'>Форум</Title>
      <Button
        type={isOpenEditor ? 'text' : 'primary'}
        className={cn('button')}
        onClick={() => setIsOpenEditor(!isOpenEditor)}>
        {isOpenEditor ? 'Скрыть' : 'Написать комментарий'}
      </Button>
      {isOpenEditor && (
        <Editor
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitting={submitting}
          value={value}
        />
      )}
      <List
        dataSource={comments}
        header={`${comments.length} ${
          comments.length === 1 ? 'комментарий' : 'комментариев'
        }`}
        itemLayout='horizontal'
        renderItem={(comment: CommentItem) => <Comment comment={comment} />}
      />
    </div>
  );
};

export default ForumPage;
