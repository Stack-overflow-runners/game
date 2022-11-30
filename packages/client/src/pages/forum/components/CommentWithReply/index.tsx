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
  const [subCommentsArr, setSubCommentsArr] =
    useState<TBasicComment[]>(subComments);

  const toogleEditor = () => setIsOpenEditor(!isOpenEditor);

  const handleSubmitNewReply = (newReply: string) => {
    setSubCommentsArr([
      {
        id: subCommentsArr.length,
        author: 'Han Solo',
        avatar: 'https://joeschmoe.io/api/v1/random',
        content: newReply,
        datetime: new Date(),
        likes: [],
        dislikes: [],
      },
      ...subCommentsArr,
    ]);
    setIsOpenEditor(false);
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
      <BasicComment comment={comment} additionalActions={additionalActions} />
      <div className={cn('sub-comments')}>
        {isOpenEditor && (
          <Editor
            onSubmit={handleSubmitNewReply}
          />
        )}
        {subCommentsArr.map(subComment => (
          <BasicComment key={subComment.id} comment={subComment} />
        ))}
      </div>
    </div>
  );
}

export default CommentWithReply;
