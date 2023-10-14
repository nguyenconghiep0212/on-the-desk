import http from "helper/request";

export function fetchPackageList() {
  return http({
    method: "get",
    url: `/api/packages/list`,
  });
}

export function fetchFeedback() {
  return http({
    method: "get",
    url: `/api/feedback/most`,
  });
}

export function getUserProfileByToken() {
  return http({
    method: "get",
    url: `/api/users/profile`,
  });
}
