import { useCallback, useState } from 'react';
import createCn from '../../../../utils/create-cn';
import BasicComment from '../BasicComment';
import Editor from '../Editor';
import './styles.css';
import { useAuth } from '../../../../hooks/auth';
import { ForumPostTransformed } from '../../../../types/forum';
import { createComment } from '../../../../store/action-creators/forum';
import { useAppDispatch } from '../../../../hooks/store';

type Props = {
  comment: ForumPostTransformed;
};

const cn = createCn('comment');

function CommentWithReply({ comment }: Props) {
  const dispatch = useAppDispatch();
  const { comments } = comment;
  const { postId } = comment;
  const { user } = useAuth();

  const [isOpenEditor, setIsOpenEditor] = useState<boolean>(false);

  const toogleEditor = useCallback(
    () => setIsOpenEditor(isOpen => !isOpen),
    []
  );
  const handleSubmitNewComment = useCallback((newTopic: string) => {
    if (user && postId && newTopic.length > 0) {
      dispatch(createComment({ content: newTopic, postId, user }));
      setIsOpenEditor(false);
    }
  }, []);

  const additionalActions = [
    <button
      key="comment-reply"
      className={cn('button-reply')}
      onClick={toogleEditor}
      type="button">
      {isOpenEditor ? 'Скрыть' : 'Ответить'}
    </button>,
  ];

  return (
    <div className={cn()}>
      <BasicComment comment={comment} additionalActions={additionalActions} />
      <div className={cn('sub-comments')}>
        {isOpenEditor && <Editor onSubmit={handleSubmitNewComment} />}
        {comments.map(subComment => (
          <BasicComment key={subComment.commentId} comment={subComment} />
        ))}
      </div>
    </div>
  );
}

export default CommentWithReply;
