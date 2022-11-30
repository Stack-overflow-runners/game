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
  const [comments, setComments] =
    useState<TCommentWithReply[]>(commentWithReply);
  const [isOpenEditor, setIsOpenEditor] = useState<boolean>(false);

  const handleSubmitNewComment = (newComment: string) => {
    setComments([
      {
        id: comments.length,
        author: 'Han Solo',
        avatar: 'https://joeschmoe.io/api/v1/random',
        content: newComment,
        datetime: new Date(),
        subComments: [],
        likes: [],
        dislikes: [],
      },
      ...comments,
    ]);
    setIsOpenEditor(false);
  };

  const toogleEditor = () => setIsOpenEditor(!isOpenEditor);

  return (
    <div className={cn()}>
      <Button
        type={isOpenEditor ? 'text' : 'dashed'}
        className={cn('button')}
        onClick={toogleEditor}
        size="small">
        {isOpenEditor ? 'Скрыть' : 'Добавить комментарий'}
      </Button>
      {isOpenEditor && (
        <Editor
          onSubmit={handleSubmitNewComment}
        />
      )}
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default Topic;
