import { Button, SemanticICONS, Popup } from 'semantic-ui-react';

type Props = {
  icon: SemanticICONS;
  description?: string;
  onClick?: () => void;
};

export const IconButton = (props: Props) => {
  const { icon, description = '', onClick } = props;

  return (
    <>
      {description === '' ? (
        <Button color="brown" circular onClick={onClick} icon={icon} />
      ) : (
        <Popup content={description} trigger={<Button color="brown" circular onClick={onClick} icon={icon} />} />
      )}
    </>
  );
};
