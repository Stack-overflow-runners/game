import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import createCn from '../../../../utils/create-cn';
import './styles.css';

const cn = createCn('editor');

type Props = {
  onSubmit: (newText: string) => void;
};

const { TextArea } = Input;

function Editor({ onSubmit }: Props) {
  const [newText, setNewText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewText(e.target.value);
  };

  const reset = () => {
    setNewText('');
  }

  const handleSubmit = () => {
    setSubmitting(true);

    setTimeout(() => {
      onSubmit(newText);
      reset();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className={cn()}>
      <Form.Item>
        <TextArea rows={4} onChange={handleChange} value={newText} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={handleSubmit}
          type="primary"
          size="small"
          disabled={!newText}>
          Добавить комментарий
        </Button>
      </Form.Item>
    </div>
  );
}

export default Editor;
