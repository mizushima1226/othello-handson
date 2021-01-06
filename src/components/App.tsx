import styled from 'styled-components';
import 'semantic-ui-css/semantic.min.css';

import { Othello } from './Othello';

export const App = () => {
  return (
    <SLayout>
      <Othello />
    </SLayout>
  );
};

const SLayout = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
