import styled from 'styled-components';

import { CellStatus } from 'types/type';
import { COLOR } from 'utils/const';

type Props = {
  status: CellStatus;
  onClick?: () => void;
};

export const Cell = (props: Props) => {
  const { status, onClick } = props;
  return (
    <SCell onClick={onClick}>
      {status === CellStatus.Black ? <SBlackPiece /> : status === CellStatus.White ? <SWhitePiece /> : null}
    </SCell>
  );
};

const SCell = styled.div`
  width: 50px;
  height: 50px;
  background-color: green;
  border: 1px solid ${COLOR.BORDER};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SPiece = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const SBlackPiece = styled(SPiece)`
  background-color: ${COLOR.BLACK};
`;

const SWhitePiece = styled(SPiece)`
  background-color: ${COLOR.WHITE};
`;
