export const REQUEST_APPS = "REQUEST_APPS";
export const RECEIVE_APPS = "RECEIVE_APPS";

const api = "https://hn.algolia.com/api/v1/search?tags=front_page";

function requestApps() {
  return {
    type: REQUEST_APPS
  };
}

function receiveApps(json) {
  return {
    type: RECEIVE_APPS,
    data: json
  };
}

export function fetchNews(pageNo) {
  let url = pageNo ? api + "&page=" + pageNo : api;
  return dispatch => {
    dispatch(requestApps());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        let hits = json.hits;
        let curPages = json.page;
        let totPage = json.nbPages - 1;
        dispatch(
          receiveApps({
            hits,
            curPages,
            totPage
          })
        );
      });
  };
}

export function hide(obj) {
  return {
    type: "HIDE_DATA",
    data: obj
  };
}
export function upVote(obj) {
  return {
    type: "UPVOTE_DATA",
    data: obj
  };
}
