import { Button, Input } from 'antd';
import { useState } from 'react';
import createCn from '../../../../utils/create-cn';
import './styles.css';

const cn = createCn('editor');

type Props = {
  className?: string;
  onSubmit: (newText: string) => void;
};

const { TextArea } = Input;

function Editor({ onSubmit, className }: Props) {
  const [newText, setNewText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewText(e.target.value);
  };

  const reset = () => {
    setNewText('');
  };

  const handleSubmit = () => {
    setSubmitting(true);

    setTimeout(() => {
      onSubmit(newText);
      reset();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className={`${className} ${cn()}`}>
      <TextArea
        autoSize={{ minRows: 3, maxRows: 5 }}
        onChange={handleChange}
        value={newText}
      />
      <Button
        loading={submitting}
        onClick={handleSubmit}
        type="primary"
        size="small"
        className={cn('button')}
        disabled={!newText}>
        Добавить комментарий
      </Button>
    </div>
  );
}

Editor.defaultProps = {
  className: '',
};

export default Editor;
