import { Button, Icon, Modal as SemanticModal, Transition } from 'semantic-ui-react';
import styled from 'styled-components';

type Props = {
  content: string;
  okText: string;
  cancelText: string;
  open: boolean;
  onOk: () => void;
  onCancel?: () => void;
  onOpen: () => void;
  onClose: () => void;
};

export const Modal = (props: Props) => {
  const { content, okText, cancelText, onOk, onCancel, open, onOpen, onClose } = props;

  return (
    <Transition.Group open={open} transition="slide down" duration={700}>
      {open && (
        <SemanticModal basic onClose={onClose} onOpen={onOpen} open={open}>
          <SemanticModal.Content>
            <SText>{content}</SText>
          </SemanticModal.Content>
          <SActions>
            {cancelText !== '' && (
              <Button basic color="red" inverted onClick={onCancel || onClose}>
                <Icon name="remove" /> {cancelText}
              </Button>
            )}
            {okText !== '' && (
              <Button color="green" inverted onClick={onOk}>
                <Icon name="checkmark" /> {okText}
              </Button>
            )}
          </SActions>
        </SemanticModal>
      )}
    </Transition.Group>
  );
};

const SText = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 3em;
`;

const SActions = styled(SemanticModal.Actions)`
  &&& {
    text-align: center;
  }
`;
