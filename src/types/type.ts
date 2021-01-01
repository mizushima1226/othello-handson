export enum CellStatus {
  Black,
  White,
  Empty,
}

export enum Judgement {
  None,
  BlackIsWin,
  WhiteIsWin,
  Draw,
}

export type Position = {
  rowIndex: number;
  colIndex: number;
};

export type CellInfo = Position & {
  status: CellStatus;
};
