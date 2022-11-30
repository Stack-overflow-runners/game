import { Button, Form, Input } from 'antd';

type Props = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
};

const { TextArea } = Input;

function Editor({ onChange, onSubmit, submitting, value }: Props) {
  return (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType='submit'
          loading={submitting}
          onClick={onSubmit}
          type='primary'
          size='small'
        >
          Добавить комментарий
        </Button>
      </Form.Item>
    </>
  );
};

export default Editor;
