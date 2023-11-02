import http from "helper/request";
import httpUpload from "helper/requestFile";

export function getUserProfile(id: string) {
  return http({
    method: "get",
    url: `/api/users/profile/${id}`,
  });
}

export function updateUserProfile(params: any) {
  return http({
    method: "put",
    url: `/api/users/crudu`,
    data: params
  });
}

export function getComponentFromPackage(id: string) {
  return http({
    method: "get",
    url: `/api/packagecomponent/getcompnents/${id}`,
  });
}


export function uploadAvatar(data: any) {
  return httpUpload({
    method: "post",
    url: `/api/users/uploadavatar`,
    data
  });
}

export function uploadCover(data: any) {
  return httpUpload({
    method: "post",
    url: `/api/users/uploadcover`,
    data
  });
}




export function uploadFile(data: any) {
  return httpUpload({
    method: "post",
    url: `/api/card/uploadimg`,
    data
  });
}
