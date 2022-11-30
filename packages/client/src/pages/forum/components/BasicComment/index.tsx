import { ReactElement, useState } from 'react';
import moment from 'moment/moment';
import 'moment/locale/ru';
import { Avatar, Comment } from 'antd';
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../../../hooks/auth';
import createCn from '../../../../utils/create-cn';
import { TBasicComment } from '../../types';
import './styles.css';

type Props = {
  comment: TBasicComment;
  additionalActions?: ReactElement[];
};

const cn = createCn('basic-comment');

function BasicComment({ comment, additionalActions = [] }: Props) {
  const {
    author,
    avatar = 'https://joeschmoe.io/api/v1/random',
    content,
    datetime,
    likes: likesMock,
    dislikes: dislikeMock,
  } = comment;
  const [likes, setLikes] = useState(likesMock);
  const [dislikes, setDislikes] = useState(dislikeMock);
  const { user } = useAuth();

  const addUserId = (userIds: number[]) =>
    user?.id ? [...userIds, user.id] : userIds;

  const filterUserId = (userIds: number[]) =>
    userIds.filter(userId => userId !== user?.id);

  const like = (event: any) => {
    event.stopPropagation();
    if (!!user?.id && !likes.includes(user.id)) {
      setLikes(addUserId);
      setDislikes(filterUserId);
    }
  };

  const dislike = (event: any) => {
    event.stopPropagation();
    if (!!user?.id && !dislikes.includes(user.id)) {
      setLikes(filterUserId);
      setDislikes(addUserId);
    }
  };

  const actions = [
    <button className={cn('button-action')} type="button" onClick={like}>
      {user?.id && likes.includes(user.id) ? <LikeFilled /> : <LikeOutlined />}
      <span className={cn('comment-action')}>{likes.length}</span>
    </button>,
    <button className={cn('button-action')} type="button" onClick={dislike}>
      {user?.id && dislikes.includes(user.id) ? (
        <DislikeFilled />
      ) : (
        <DislikeOutlined />
      )}
      <span className={cn('comment-action')}>{dislikes.length}</span>
    </button>,
    ...additionalActions,
  ];

  return (
    <Comment
      actions={actions}
      author={<p>{author}</p>}
      avatar={<Avatar src={avatar} alt={`Аватар ${author}`} />}
      content={content}
      datetime={moment(datetime).format('D MMM YYYY в HH:MM')}
      className={cn()}
    />
  );
}

BasicComment.defaultProps = {
  additionalActions: [],
};

export default BasicComment;
