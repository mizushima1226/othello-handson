import { Confirm as SemanticConfirm } from 'semantic-ui-react';
import styled from 'styled-components';

type Props = {
  open: boolean;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const Confirm = (props: Props) => {
  const { open, content, onConfirm, onCancel } = props;

  return (
    <SConfirm
      open={open}
      content={content}
      cancelButton="キャンセル"
      confirmButton="OK"
      size="tiny"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

const SConfirm = styled(SemanticConfirm)`
  & > .content {
    text-align: center;
    font-weight: bold;
  }
`;
