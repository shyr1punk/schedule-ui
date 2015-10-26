import React          from 'react';
import ReactDOM       from 'react-dom';
import Root           from './containers/Root';
import configureStore from './store/configureStore';

const target = document.getElementById('root');
const store  = configureStore(window.__INITIAL_STATE__, __DEBUG__);

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const node = (
  <Root store={store}
        debug={__DEBUG__}
        debugExternal={__DEBUG_NW__} />
);

ReactDOM.render(node, target);
