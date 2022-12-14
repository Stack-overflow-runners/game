import { useCallback, useState } from 'react';
import { Button } from 'antd';
import Comment from '../CommentWithReply';
import Editor from '../Editor';
import createCn from '../../../../utils/create-cn';
import { createPost } from '../../../../store/action-creators/forum';
import { useAppDispatch } from '../../../../hooks/store';
import { useAuth } from '../../../../hooks/auth';
import { ForumPostTransformed } from '../../../../types/forum';
import './styles.css';

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
      {posts && posts.map(post => <Comment key={post.postId} comment={post} />)}
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
