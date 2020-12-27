import { useState } from 'react';
import styled from 'styled-components';

import { Cell } from './Cell';

import { CellStatus } from '../types/type';

const X_NUM = 8;
const Y_NUM = 8;

const initHistory = (): Array<Array<CellStatus>> => {
  const data = Array(Y_NUM).fill(Array(X_NUM).fill(CellStatus.Empty));
  return data;
};

export const Othello = () => {
  const [histories, setHistories] = useState([initHistory()]);
  const [turn, setTurn] = useState(0);
  return (
    <>
      <SPage>
        {histories[turn].map((row, rowNum) => (
          <SRow key={rowNum}>
            {row.map((cell, idx) => (
              <Cell key={idx} />
            ))}
          </SRow>
        ))}
      </SPage>
    </>
  );
};

const SPage = styled.div`
  margin-top: 100px;
  background-color: #000;
`;

const SRow = styled.div`
  display: flex;
`;
