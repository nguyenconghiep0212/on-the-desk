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

export function listContactTemplate() {
  return http({
    method: "get",
    url: `api/users/contact/templates`
  });
}

export function addContact(params: {contacts: any[]}) {
  return http({
    method: "post",
    url: `/api/users/contact/addcontacts`,
    data: params
  });
}

export function editContact(params: any) {
  return http({
    method: "post",
    url: `/api/users/contact/updatecontact`,
    data: params
  });
}

export function deleteContact(id: string) {
  return http({
    method: "delete",
    url: `/api/users/contact/deletecontract?id=${id}`,
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
