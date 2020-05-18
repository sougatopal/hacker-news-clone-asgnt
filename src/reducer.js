import { REQUEST_APPS, RECEIVE_APPS } from "./actions";
import { manageHideArray, managePointObj } from "./utils";

function apps(state = { isFetching: false, data: {} }, action) {
  console.log("state is", state);
  switch (action.type) {
    case REQUEST_APPS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_APPS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data
      });
    case "HIDE_DATA":
      return Object.assign({}, hide(action.data, { ...state }));
    case "UPVOTE_DATA":
      return Object.assign({}, upVote(action.data, { ...state }));
    default:
      return state;
  }
}

function hide(obj, state) {
  console.log(obj.objectID);
  manageHideArray(obj.objectID);
  state.data.hits = state.data.hits.filter(
    elem => elem.objectID !== obj.objectID
  );
  return state;
}

function upVote(obj, state) {
  let upVotedId = obj.objectID;

  let hits = state.data.hits;
  for (let i = 0; i < hits.length; i++) {
    if (hits[i].objectID === upVotedId) {
      hits[i].points++;
      managePointObj(upVotedId, hits[i].points);
      break;
    }
  }
  state.data.hits = [...hits];
  return state;
}

export default apps;
