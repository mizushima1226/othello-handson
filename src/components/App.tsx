import styled from 'styled-components';

import { Othello } from './Othello';

export const App = () => {
  return (
    <SLayout>
      <Othello />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  justify-content: center;
`;
