import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from '@ant-design/icons';
import { Avatar, Comment as Commentary, Tooltip } from 'antd';
import { useState } from 'react';
import createCn from '../../../../utils/create-cn';
import { TBasicComment, TCommentWithReply } from '../../types';
import BasicComment from '../BasicComment';
import Editor from '../Editor';
import './styles.css';

type Props = {
  comment: TCommentWithReply;
};

const cn = createCn('comment');

function CommentWithReply({ comment }: Props) {
  const {
    author,
    avatar = 'https://joeschmoe.io/api/v1/random',
    content,
    datetime,
    subComments,
  } = comment;
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<'liked' | 'disliked' | null>(null);
  const [isOpenEditor, setIsOpenEditor] = useState<boolean>(false);
  const [newCommentvalue, setNewCommentvalue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subCommentsArr, setSubCommentsArr] = useState<TBasicComment[]>(subComments);

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

  const toogleEditor = () => setIsOpenEditor(!isOpenEditor);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentvalue(e.target.value);
  };

  const handleSubmit = () => {
    if (!newCommentvalue) return;

    setSubmitting(true);

    setTimeout(() => {
      setSubCommentsArr([
        {
          id: subCommentsArr.length,
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: newCommentvalue,
          datetime: '15 окт 2022 15:45:52',
        },
        ...subCommentsArr,
      ]);
      setNewCommentvalue('');
      setIsOpenEditor(false);
      setSubmitting(false);
    }, 1000);
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
    <button
      key="comment-reply"
      className={cn('button-reply')}
      onClick={toogleEditor}
      type="button">
      {isOpenEditor ? 'Скрыть' : 'Ответить'}
    </button>,
  ];

  return (
    <div className={cn()}>
      <Commentary
        actions={actions}
        author={<p>{author}</p>}
        avatar={<Avatar src={avatar} alt={`Аватар ${author}`} />}
        content={content}
        datetime={datetime}
      />
      <div className={cn('sub-comments')}>
        {isOpenEditor && (
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={newCommentvalue}
          />
        )}
        {subCommentsArr.map((subComment) => <BasicComment key={subComment.id} comment={subComment} />)}
      </div>
    </div>
  );
}

export default CommentWithReply;
