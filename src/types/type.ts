export enum CellStatus {
  Black,
  White,
  Empty,
}

export type Position = {
  rowIndex: number;
  colIndex: number;
};

export type CellInfo = Position & {
  status: CellStatus;
};
