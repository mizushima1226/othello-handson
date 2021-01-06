import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Cell } from './Cell';
import { Counter } from './Counter';
import { IconButton } from './IconButton';

import { Judgement, CellInfo, CellStatus } from '../types/type';
import { ROW_MAX_NUM, COL_MAX_NUM, COLOR } from '../utils/const';
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

const colItems = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const Othello = () => {
  const [histories, setHistories] = useState([initHistory()]);
  const [turnCount, setTurnCount] = useState(0);
  const [blackNum, setBlackNum] = useState(2);
  const [whiteNum, setWhiteNum] = useState(2);
  const [isFirstTurn, setIsFirstTurn] = useState(true);

  // コマ数をカウント
  useEffect(() => {
    const target = histories[turnCount];

    const { blackNum, whiteNum } = getPiecesNum(target);
    setBlackNum(blackNum);
    setWhiteNum(whiteNum);
  }, [histories, turnCount]);

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
  }, [blackNum, whiteNum]);

  const onClickCell = (rowIndex: number, colIndex: number) => {
    const cell: CellInfo = { rowIndex, colIndex, status: isFirstTurn ? CellStatus.Black : CellStatus.White };
    const target = histories[turnCount];

    // ひっくり返す
    const result = reverce(target, cell);
    if (!result) return;

    // 履歴に追加
    const newHistories = histories.slice(0, turnCount + 1).map((history) => history.map((row) => [...row]));
    newHistories.push(result);

    setHistories(newHistories);
    setTurnCount(turnCount + 1);
    setIsFirstTurn(!isFirstTurn);
  };

  const onClickGoToPrevHistory = () => {
    if (turnCount === 0) return;
    setTurnCount(turnCount - 1);
    setIsFirstTurn(!isFirstTurn);
  };

  const onClickGoToNextHistory = () => {
    if (turnCount >= histories.length - 1) return;
    setTurnCount(turnCount + 1);
    setIsFirstTurn(!isFirstTurn);
  };

  const onClickPass = () => setIsFirstTurn(!isFirstTurn);

  const onClickReset = () => {
    setHistories([initHistory()]);
    setBlackNum(2);
    setWhiteNum(2);
    setTurnCount(0);
    setIsFirstTurn(true);
  };

  return (
    <div>
      <SGameInfo>
        <Counter status={CellStatus.Black} count={blackNum} isTurn={isFirstTurn} />
        <SActions>
          <IconButton icon="angle double left" description="戻る" onClick={onClickGoToPrevHistory} />
          <IconButton icon="angle double right" description="進む" onClick={onClickGoToNextHistory} />
          <IconButton icon="step forward" description="パス" onClick={onClickPass} />
          <IconButton icon="redo" description="最初から" onClick={onClickReset} />
        </SActions>
        <Counter status={CellStatus.White} count={whiteNum} isTurn={!isFirstTurn} />
      </SGameInfo>
      <SBoard>
        <SRow>
          <SDummyCol />
          {colItems.map((item) => (
            <SColInfo>{item}</SColInfo>
          ))}
        </SRow>
        {histories[turnCount].map((row, rowIndex) => (
          <SRow key={rowIndex}>
            <SRowInfo>{rowIndex + 1}</SRowInfo>
            {row.map((status, colIndex) => (
              <Cell key={colIndex} status={status} onClick={() => onClickCell(rowIndex, colIndex)} />
            ))}
          </SRow>
        ))}
      </SBoard>
    </div>
  );
};

const SBoard = styled.div`
  background-color: ${COLOR.BLACK};
  padding: 0px 20px 20px 0px;
`;

const SRow = styled.div`
  display: flex;
`;

const SRowInfo = styled.div`
  width: 20px;
  height: 100%;
  color: white;
  text-align: center;
  line-height: 50px;
`;

const SColInfo = styled.div`
  width: 50px;
  height: 20px;
  color: white;
  text-align: center;
  line-height: 20px;
`;

const SDummyCol = styled(SColInfo)`
  width: 20px;
`;

const SGameInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const SActions = styled.div`
  display: flex;
  align-items: center;
`;
