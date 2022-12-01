import { ReactElement } from 'react';
import moment from 'moment/moment';
import 'moment/locale/ru';
import { Avatar, Comment } from 'antd';
import { useAuth } from '../../../../hooks/auth';
import { TBasicComment } from '../../types';
import LikeButtons from '../LikeButtons';
import './styles.css';

type Props = {
  comment: TBasicComment;
  additionalActions?: ReactElement[];
};

function BasicComment({ comment, additionalActions = [] }: Props) {
  const {
    author,
    avatar = 'https://joeschmoe.io/api/v1/random',
    content,
    datetime,
    likes,
    dislikes,
  } = comment;
  const { user } = useAuth();

  const actions = [
    user?.id && (
      <LikeButtons likes={likes} dislikes={dislikes} iserId={user.id} />
    ),
    ...additionalActions,
  ];

  return (
    <Comment
      actions={actions}
      author={<p>{author}</p>}
      avatar={<Avatar src={avatar} alt={`Аватар ${author}`} />}
      content={content}
      datetime={moment(datetime).format('D MMM YYYY в HH:MM')}
    />
  );
}

BasicComment.defaultProps = {
  additionalActions: [],
};

export default BasicComment;
