import { ReactElement } from 'react';
import moment from 'moment/moment';
import 'moment/locale/ru';
import { Avatar, Comment } from 'antd';
import { useAuth } from '../../../../hooks/auth';
import LikeButtons from '../LikeButtons';
import { ForumEntityTransformed } from '../../../../types/forum';
import CONSTS from '../../../../utils/consts';

type Props = {
  comment: ForumEntityTransformed;
  additionalActions?: ReactElement[];
};

function BasicComment({ comment, additionalActions = [] }: Props) {
  const { author, avatar, content, datetime, likes, dislikes } = comment;
  const { user } = useAuth();
  const actions = [
    user?.forumId && (
      <LikeButtons
        likes={likes}
        dislikes={dislikes}
        iserId={user.forumId}
        comment={comment}
      />
    ),
    ...additionalActions,
  ];

  return (
    <Comment
      actions={actions}
      author={<p>{author}</p>}
      avatar={
        <Avatar
          src={avatar ? `${CONSTS.PROXY_RESOURCE_URL}${avatar}` : ''}
          alt={`Аватар ${author}`}
        />
      }
      content={content}
      datetime={moment(datetime).format('D MMM YYYY в HH:MM')}
    />
  );
}

BasicComment.defaultProps = {
  additionalActions: [],
};

export default BasicComment;
