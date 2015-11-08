import { combineReducers }    from 'redux';
import { routerStateReducer } from 'redux-router';
import counter                from './counter';
import groups                 from './groups';

export default combineReducers({
  counter,
  groups,
  router: routerStateReducer
});
