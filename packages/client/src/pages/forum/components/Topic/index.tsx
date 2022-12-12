import { useCallback, useState } from 'react';
import { Button } from 'antd';
import Comment from '../CommentWithReply';
import Editor from '../Editor';
import createCn from '../../../../utils/create-cn';
import './styles.css';
import { createPost } from '../../../../store/action-creators/forum';
import { useAppDispatch } from '../../../../hooks/store';
import { useAuth } from '../../../../hooks/auth';
import { ForumPostTransformed } from '../../../../types/forum';

const cn = createCn('topic');

type Props = {
  posts: ForumPostTransformed[];
  threadId: number;
};

function Topic({ posts, threadId }: Props) {
  const dispatch = useAppDispatch();
  const [isOpenEditor, setIsOpenEditor] = useState<boolean>(false);
  const { user } = useAuth();

  const handleSubmitNewComment = useCallback(
    (newTopic: string) => {
      if (user && threadId && newTopic.length > 0) {
        dispatch(createPost({ content: newTopic, threadId, user }));
        setIsOpenEditor(false);
      }
    },
    [user, threadId, dispatch]
  );

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
      {posts && posts.map(post => <Comment key={post.postId} comment={post} />)}
    </div>
  );
}

export default Topic;
