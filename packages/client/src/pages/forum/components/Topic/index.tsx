import { useState } from 'react';
import { Button } from 'antd';
import Comment from '../CommentWithReply';
import { TCommentWithReply } from '../../types';
import Editor from '../Editor';
import createCn from '../../../../utils/create-cn';
import './styles.css';

const cn = createCn('topic');

type Props = {
  commentWithReply: TCommentWithReply[];
};

function Topic({ commentWithReply }: Props) {
  const [newCommentvalue, setNewCommentvalue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] =
    useState<TCommentWithReply[]>(commentWithReply);
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
    <div className={cn()}>
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
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Topic;
