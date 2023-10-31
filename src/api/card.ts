import http from "helper/request";

export function getCardByUserProfile() {
  return http({
    method: "get",
    url: `/api/card/getlist`,
  });
}

export function createCard(params: any) {
  return http({
    method: "post",
    url: `/api/card/addcard`,
    data: params,
  });
}

export function deleteCard(id: string) {
  return http({
    method: "delete",
    url: `/api/card/deletecard?cardId=${id}`,
  });
}

export function uploadImagesCard(params: any) {
  return http({
    method: "get",
    url: `/api/card/uploadimages`,
    data: params,
  });
}

