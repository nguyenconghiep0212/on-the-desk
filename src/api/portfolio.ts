import http from "helper/request";

export function getUserProfile(id: string) {
  return http({
    method: "get",
    url: `/api/users/profile/${id}`,
  });
}

export function updateUserProfile(params: any) {
  return http({
    method: "post",
    url: `/api/users/crudu/${params.id}`,
    data: params
  });
}

export function getComponentFromPackage(id: string) {
  return http({
    method: "get",
    url: `/api/packagecomponent/getcompnents/${id}`,
  });
}
