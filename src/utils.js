export function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
}
export function urlTrimmer(url) {
  if (!url) return;
  var urlParts = url
    .replace("http://", "")
    .replace("https://", "")
    .split(/[/?#]/);
  return urlParts[0];
}
export function manageHideArray(id) {
  let hiddenArray = [];
  if (window && window.localStorage) {
    if (window.localStorage.hiddenNewsArray) {
      hiddenArray = JSON.parse(window.localStorage.getItem("hiddenNewsArray"));
    }
  }
  if (id) {
    hiddenArray.push(id);
    window.localStorage.setItem("hiddenNewsArray", JSON.stringify(hiddenArray));
  } else {
    return hiddenArray;
  }
}
export function managePointObj(id, point) {
  let pointObj = {};
  if (window && window.localStorage) {
    if (window.localStorage.pointObj) {
      pointObj = JSON.parse(window.localStorage.getItem("pointObj"));
    }
  }
  if (id) {
    pointObj[id] = point;
    window.localStorage.setItem("pointObj", JSON.stringify(pointObj));
  } else {
    return pointObj;
  }
}
