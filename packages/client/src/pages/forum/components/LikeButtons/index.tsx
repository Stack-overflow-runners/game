import { MouseEvent } from 'react';
import 'moment/locale/ru';
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from '@ant-design/icons';
import createCn from '../../../../utils/create-cn';
import './styles.css';
import { useAppDispatch } from '../../../../hooks/store';
import { useAuth } from '../../../../hooks/auth';
import { setDislike, setLike } from '../../../../store/action-creators/forum';
import { ForumEntityTransformed, LikeDislike } from '../../../../types/forum';

type Props = {
  likes: number[];
  dislikes: number[];
  iserId: number;
  comment: ForumEntityTransformed;
};

const cn = createCn('like-buttons');

function LikeButtons({ likes, dislikes, comment, iserId }: Props) {
  const dispatch = useAppDispatch();

  const { user } = useAuth();
  const { postId, threadId, commentId } = comment as ForumEntityTransformed &
    LikeDislike;
  const hasLike = likes.includes(iserId);
  const hasDislike = dislikes.includes(iserId);

  const handleLikeButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (user) {
      if (!hasLike) {
        dispatch(setLike({ postId, threadId, commentId, user }));
      }
    }
  };

  const handleDislikeButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (user) {
      if (!hasDislike) {
        dispatch(setDislike({ postId, threadId, commentId, user }));
      }
    }
  };

  return (
    <div className={cn('two')}>
      <button
        className={cn('button-action')}
        type="button"
        onClick={handleLikeButtonClick}>
        {hasLike ? <LikeFilled /> : <LikeOutlined />}
        <span className={cn('count')}>{likes.length}</span>
      </button>
      <button
        className={cn('button-action')}
        type="button"
        onClick={handleDislikeButtonClick}>
        {hasDislike ? <DislikeFilled /> : <DislikeOutlined />}
        <span className={cn('count')}>{dislikes.length}</span>
      </button>
    </div>
  );
}

export default LikeButtons;
