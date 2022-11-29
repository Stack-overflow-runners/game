
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
  const { subComments } = comment;

  const [isOpenEditor, setIsOpenEditor] = useState<boolean>(false);
  const [newCommentvalue, setNewCommentvalue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subCommentsArr, setSubCommentsArr] = useState<TBasicComment[]>(subComments);

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

  const additionalActions = [
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
      <BasicComment comment={comment} additionalActions={additionalActions}/>
      <div className={cn('sub-comments')}>
        {isOpenEditor && (
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={newCommentvalue}
          />
        )}
        {subCommentsArr.map((subComment) => <BasicComment key={subComment.id} comment={subComment} additionalActions={[]} />)}
      </div>
    </div>
  );
}

export default CommentWithReply;