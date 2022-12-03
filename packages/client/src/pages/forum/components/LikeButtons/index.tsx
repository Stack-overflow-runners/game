import { MouseEvent, useState } from 'react';
import 'moment/locale/ru';
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from '@ant-design/icons';
import createCn from '../../../../utils/create-cn';
import './styles.css';

type Props = {
  likes: number[];
  dislikes: number[];
  iserId: number;
};

const cn = createCn('like-buttons');

function LikeButtons({ likes: initLikes, dislikes: initDislikes, iserId }: Props) {
  const [likes, setLikes] = useState(initLikes);
  const [dislikes, setDislikes] = useState(initDislikes);

  const hasDislike = dislikes.includes(iserId);
  const hasLike = likes.includes(iserId);

  const addUserId = (userIds: number[]) => [...userIds, iserId];

  const filterUserId = (userIds: number[]) =>
    userIds.filter(userId => userId !== iserId);

  const handleLikeButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!hasLike) {
      setLikes(addUserId);
      setDislikes(filterUserId);
    }
  };

  const handleDislikeButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!hasDislike) {
      setLikes(filterUserId);
      setDislikes(addUserId);
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
