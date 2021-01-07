import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import { Othello } from 'components/Othello';
import 'normalize.css';

ReactDOM.render(
  <React.StrictMode>
    <Othello />
  </React.StrictMode>,
  document.getElementById('root'),
);
