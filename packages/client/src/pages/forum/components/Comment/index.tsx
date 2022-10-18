import { Avatar, Comment as Commentary } from 'antd';
import { CommentItem } from '../../types';

type Props = {
  comment: CommentItem;
};

function Comment({ comment }: Props) {
  const { author, avatar = 'https://joeschmoe.io/api/v1/random', content, datetime } = comment;

  return (
    <Commentary
      author={<p>{author}</p>}
      avatar={
        <Avatar
          src={avatar}
          alt={`Аватар ${author}`}
        />
      }
      content={content}
      datetime={datetime}
    />
  );
}

export default Comment;
