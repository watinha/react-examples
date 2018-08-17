import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  let component = <App />,
      img;
  ReactDOM.render(component, div);
  ReactDOM.unmountComponentAtNode(div);
});
