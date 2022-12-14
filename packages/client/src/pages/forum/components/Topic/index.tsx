import { useCallback, useState } from 'react';
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

  const handleSubmitNewComment = useCallback((newComment: string) => {
    setComments(items => [
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
      ...items,
    ]);
    setIsOpenEditor(false);
  }, []);

  const toogleEditor = useCallback(
    () => setIsOpenEditor(isOpen => !isOpen),
    []
  );

  return (
    <div className={cn()}>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
      {isOpenEditor ? (
        <>
          <Editor onSubmit={handleSubmitNewComment} />
          <Button
            type="primary"
            className={cn('button')}
            onClick={toogleEditor}>
            Скрыть
          </Button>
        </>
      ) : (
        <Button type="primary" className={cn('button')} onClick={toogleEditor}>
          Добавить комментарий
        </Button>
      )}
    </div>
  );
}

export default Topic;
