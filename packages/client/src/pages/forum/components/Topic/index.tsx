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
      {isOpenEditor ? (
        <>
          <Button
            type="text"
            className={cn('button')}
            onClick={toogleEditor}
            size="small">
            Скрыть
          </Button>
          <Editor onSubmit={handleSubmitNewComment} />
        </>
      ) : (
        <Button
          type="dashed"
          className={cn('button')}
          onClick={toogleEditor}
          size="small">
          Добавить комментарий
        </Button>
      )}
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default Topic;
