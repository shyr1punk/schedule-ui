import {
  RECEIVE_GROUPS
} from '../actions';

function groups(state = {
  groups: []
}, action) {
  switch (action.type) {
  case RECEIVE_GROUPS:
    return Object.assign({}, state, {
      groups: action.groups
    });
  default:
    return state;
  }
}

export default groups;
