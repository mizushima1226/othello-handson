import { CellStatus, CellInfo, Position } from '../types/type';
import { ROW_MAX_NUM, COL_MAX_NUM } from '../utils/const';

type Direction = {
  rowIndex: 0 | 1 | -1;
  colIndex: 0 | 1 | -1;
};

const directions: Array<Direction> = [
  { rowIndex: 0, colIndex: 1 },
  { rowIndex: 0, colIndex: -1 },
  { rowIndex: -1, colIndex: 0 },
  { rowIndex: 1, colIndex: 0 },
  { rowIndex: -1, colIndex: 1 },
  { rowIndex: 1, colIndex: -1 },
  { rowIndex: 1, colIndex: 1 },
  { rowIndex: -1, colIndex: -1 },
];

export const reverce = (data: Array<Array<CellStatus>>, cell: CellInfo): Array<Array<CellStatus>> | null => {
  const current = data[cell.rowIndex][cell.colIndex];

  // 配置済みのセルにコマは置けない
  if (current !== CellStatus.Empty) return null;

  // 各方向ごとにひっくり返す位置のリストを取得
  const list = directions.map((direction) => {
    let position = getNextPosition(cell, direction);

    if (position === null) return [];

    const temp: Position[] = [];
    while (true) {
      const targetCellStatus: CellStatus = data[position.rowIndex][position.colIndex];

      // セルが空白の場合、空配列をリターン
      if (targetCellStatus === CellStatus.Empty) return [];

      // 設置するコマと同じ色の場合、結果をリターン
      if (targetCellStatus === cell.status) return temp;

      temp.push(position);

      position = getNextPosition(position, direction);

      // 次のポジションが存在しない場合、空配列をリターン
      if (position === null) return [];
    }
  });

  // 取得したリストを２次元配列から１次元配列に変換
  const targetCellPositions: Position[] = list.reduce((preArray, currentArray) => {
    preArray.push(...currentArray);
    return preArray;
  }, []);

  // 空配列の場合早期リターン
  if (targetCellPositions.length === 0) {
    return null;
  }

  // ユーザが配置したコマを追加
  targetCellPositions.push(cell);

  const result = [...data];

  // コマをひっくり返す
  targetCellPositions.forEach((p) => {
    result[p.rowIndex][p.colIndex] = cell.status;
  });

  return result;
};

const getNextPosition = (p: Position, direction: Direction): Position | null => {
  const rowIndex = p.rowIndex + direction.rowIndex;
  const colIndex = p.colIndex + direction.colIndex;
  if (rowIndex < 0 || colIndex < 0 || rowIndex >= ROW_MAX_NUM || colIndex >= COL_MAX_NUM) {
    return null;
  }
  return {
    rowIndex: p.rowIndex + direction.rowIndex,
    colIndex: p.colIndex + direction.colIndex,
  };
};
