import { Avatar, Comment as Commentary } from 'antd';
import { CommentItem } from '../../types';

type Props = {
  comment: CommentItem;
};

function Comment({ comment }: Props) {

  return (
    <Commentary
      author={<p>{comment.author}</p>}
      avatar={
        <Avatar
          src={
            comment.avatar
              ? comment.avatar
              : 'https://joeschmoe.io/api/v1/random'
          }
          alt={`Аватар ${comment.author}`}
        />
      }
      content={comment.content}
      datetime={comment.datetime}
    />
  );
};

export default Comment;
