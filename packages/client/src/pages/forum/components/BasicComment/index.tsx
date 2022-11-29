import { Avatar, Comment as Commentary, Tooltip } from 'antd';
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

type Props = {
  comment: TBasicComment;
  additionalActions: ReactElement[]
};

const cn = createCn('basic-comment');

function BasicComment({ comment, additionalActions = [] }: Props) {
  const { author, avatar = 'https://joeschmoe.io/api/v1/random', content, datetime } = comment;
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<'liked' | 'disliked' | null>(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-like" title="Нравится">
      <button className={cn('button-action')} type="button" onClick={like}>
        {action === 'liked' ? <LikeFilled /> : <LikeOutlined />}
        <span className={cn('comment-action')}>{likes}</span>
      </button>
    </Tooltip>,
    <Tooltip key="comment-dislike" title="Не нравится">
      <button className={cn('button-action')} type="button" onClick={dislike}>
        {action === 'disliked' ? <DislikeFilled /> : <DislikeOutlined />}
        <span className={cn('comment-action')}>{dislikes}</span>
      </button>
    </Tooltip>,
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
