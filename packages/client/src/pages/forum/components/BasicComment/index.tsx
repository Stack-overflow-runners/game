import { Avatar, Comment as Commentary } from 'antd';
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from '@ant-design/icons';
import { ReactElement, useState } from 'react';
import { TBasicComment } from '../../types';
import createCn from '../../../../utils/create-cn';
import './styles.css';
import { useAuth } from '../../../../hooks/auth';

type Props = {
  comment: TBasicComment;
  additionalActions: ReactElement[]
};

const cn = createCn('basic-comment');

function BasicComment({ comment, additionalActions = [] }: Props) {
  const { author, avatar = 'https://joeschmoe.io/api/v1/random', content, datetime, likes: likesMock, dislikes: dislikeMock } = comment;
  const [likes, setLikes] = useState(likesMock);
  const [dislikes, setDislikes] = useState(dislikeMock);
  const { user } = useAuth();

  const addUserId = (userIds: number[]) => user?.id ? [...userIds, user.id] : userIds;

  const filterUserId = (userIds: number[]) => userIds.filter((userId) => userId !== user?.id)

  const like = () => {
    setLikes(addUserId);
    setDislikes(filterUserId);
  };

  const dislike = () => {
    setLikes(filterUserId);
    setDislikes(addUserId);
  };

  const actions = [
    <button className={cn('button-action')} type="button" onClick={like} disabled={!!user?.id && likes.includes(user.id)}>
      {user?.id && likes.includes(user.id) ? <LikeFilled /> : <LikeOutlined />}
      <span className={cn('comment-action')}>{likes.length}</span>
    </button>,
    <button className={cn('button-action')} type="button" onClick={dislike} disabled={!!user?.id && dislikes.includes(user.id)} >
      {user?.id && dislikes.includes(user.id) ? <DislikeFilled /> : <DislikeOutlined />}
      <span className={cn('comment-action')}>{dislikes.length}</span>
    </button>,
    ...additionalActions
  ];

  return (
    <Commentary
      actions={actions}
      author={<p>{author}</p>}
      avatar={
        <Avatar
          src={avatar}
          alt={`Аватар ${author}`}
        />
      }
      content={content}
      datetime={datetime}
      className={cn()}
    />
  );
}

export default BasicComment;
