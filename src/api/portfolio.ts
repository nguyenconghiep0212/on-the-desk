import http from "helper/request";

export function getUserProfile(id: string) {
  return http({
    method: "get",
    url: `/api/users/profile/${id}`,
  });
}

export function getComponentFromPackage(id: string) {
  return http({
    method: "get",
    url: `/api/packagecomponent/getcompnents/${id}`,
  });
}
