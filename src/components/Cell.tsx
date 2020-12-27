import styled from 'styled-components';

import { COLOR } from '../utils/const';

export const Cell = () => {
  return <SCell />;
};

const SCell = styled.div`
  width: 50px;
  height: 50px;
  background-color: green;
  border: 1px solid ${COLOR.BORDER};
`;
