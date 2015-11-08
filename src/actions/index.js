export const REQUEST_GROUPS = 'REQUEST_GROUPS';
export const RECEIVE_GROUPS = 'RECEIVE_GROUPS';

function requestGroups() {
  return {
    type: REQUEST_GROUPS
  };
}

function receiveGroups(json) {
  return {
    type: RECEIVE_GROUPS,
    groups: json
  };
}

export function fetchGroups() {
  return dispatch => {
    dispatch(requestGroups);
    return fetch('http://127.0.0.1/groups/')
      .then(responce => responce.json())
      .then(json => dispatch(receiveGroups(json)));
  };
}
