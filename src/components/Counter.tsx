import styled from 'styled-components';

import { CellStatus } from 'types/type';
import { COLOR } from 'utils/const';

type Props = {
  status: CellStatus;
  count: number;
  isTurn: boolean;
};

export const Counter = (props: Props) => {
  const { status, count, isTurn } = props;
  return (
    <SBox isTurn={isTurn}>
      <SPiece status={status} />
      <SText status={status} isTurn={isTurn}>
        {`00${count}`.slice(-2)}
      </SText>
    </SBox>
  );
};

const SBox = styled.div<{ isTurn: boolean }>`
  width: 120px;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: #a9a9a9;
  border-width: 4px;
  border-style: solid;
  border-color: ${({ isTurn }) => (isTurn ? 'red' : '#a9a9a9')};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SText = styled.div<{ status: CellStatus; isTurn: boolean }>`
  font-weight: 900;
  font-size: 2em;
  color: white;
`;

const SPiece = styled.div<{ status: CellStatus }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ status }) => (status === CellStatus.Black ? COLOR.BLACK : COLOR.WHITE)};
`;
