import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Cell } from './Cell';

import { Judgement, CellInfo, CellStatus } from '../types/type';
import { ROW_MAX_NUM, COL_MAX_NUM } from '../utils/const';
import { reverce, getPiecesNum, judge } from '../utils/othelloUtil';

const initHistory = (): Array<Array<CellStatus>> => {
  const temRow = Array(COL_MAX_NUM).fill(CellStatus.Empty);
  const data = Array(ROW_MAX_NUM)
    .fill(null)
    .map(() => [...temRow]);

  // 黒を配置
  data[3][4] = CellStatus.Black;
  data[4][3] = CellStatus.Black;

  // 白を配置
  data[3][3] = CellStatus.White;
  data[4][4] = CellStatus.White;

  return data;
};

export const Othello = () => {
  const [histories, setHistories] = useState([initHistory()]);
  const [turnCount, setTurnCount] = useState(0);
  const [blackNum, setBlackNum] = useState(2);
  const [whiteNum, setWhiteNum] = useState(2);
  const [isFirstTurn, setIsFirstTurn] = useState(true);

  // 勝敗判定
  useEffect(() => {
    const judgement = judge(blackNum, whiteNum);
    switch (judgement) {
      case Judgement.BlackIsWin:
        alert('黒の勝ち');
        break;
      case Judgement.WhiteIsWin:
        alert('白の勝ち');
        break;
      case Judgement.Draw:
        alert('引き分け');
        break;
      default:
        break;
    }
  }, [histories, blackNum, whiteNum]);

  const onClickCell = (rowIndex: number, colIndex: number) => {
    const cell: CellInfo = { rowIndex, colIndex, status: isFirstTurn ? CellStatus.Black : CellStatus.White };
    const target = histories[turnCount];

    // ひっくり返す
    const result = reverce(target, cell);
    if (!result) return;

    // 履歴に追加
    const newHistories = histories.map((history) => history.map((row) => [...row]));
    newHistories.push(result);

    // コマ数をカウント
    const { blackNum, whiteNum } = getPiecesNum(target);

    setHistories(newHistories);
    setTurnCount(turnCount + 1);
    setIsFirstTurn(!isFirstTurn);
    setBlackNum(blackNum);
    setWhiteNum(whiteNum);
  };

  return (
    <>
      <SPage>
        <SGameInfo>
          <p>{isFirstTurn ? '黒のターン' : '白のターン'}</p>
          <p>黒の数:{blackNum}</p>
          <p>白の数:{whiteNum}</p>
        </SGameInfo>
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
`;

const SRow = styled.div`
  display: flex;
`;

const SGameInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
