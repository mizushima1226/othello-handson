import { useState } from 'react';
import styled from 'styled-components';

import { Cell } from './Cell';

import { CellInfo, CellStatus } from '../types/type';
import { ROW_MAX_NUM, COL_MAX_NUM } from '../utils/const';
import { reverce } from '../utils/othelloUtil';

const initHistory = (): Array<Array<CellStatus>> => {
  const temRow = Array(COL_MAX_NUM).fill(CellStatus.Empty);
  const data = Array(ROW_MAX_NUM)
    .fill(null)
    .map(() => [...temRow]);

  // 黒を配置
  data[3][3] = CellStatus.Black;
  data[4][4] = CellStatus.Black;
  // 白を配置
  data[3][4] = CellStatus.White;
  data[4][3] = CellStatus.White;

  return data;
};

export const Othello = () => {
  const [histories, setHistories] = useState([initHistory()]);
  const [turnCount, setRurnCount] = useState(0);
  const [isFirstTurn, setIsFirstTurn] = useState(true);

  const onClickCell = (rowIndex: number, colIndex: number) => {
    const cell: CellInfo = { rowIndex, colIndex, status: isFirstTurn ? CellStatus.Black : CellStatus.White };
    const result = reverce(histories[turnCount], cell);

    if (!result) {
      return;
    }

    const newHistories = histories.map((history) => history.map((row) => [...row]));
    newHistories.push(result);

    setHistories(newHistories);
    setRurnCount(turnCount + 1);
    setIsFirstTurn(!isFirstTurn);
  };

  return (
    <>
      <SPage>
        <p>{isFirstTurn ? '黒のターン' : '白のターン'}</p>
        {histories[turnCount].map((row, rowIndex) => (
          <SRow key={rowIndex}>
            {row.map((status, colIndex) => (
              <Cell key={colIndex} status={status} onClick={() => onClickCell(rowIndex, colIndex)} />
            ))}
          </SRow>
        ))}
      </SPage>
    </>
  );
};

const SPage = styled.div`
  margin-top: 100px;
  // background-color: #000;
`;

const SRow = styled.div`
  display: flex;
`;
