import http from "helper/request";
import httpQR from 'helper/requestQR'
import { GEN_QR } from "interface/card";
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

export function generateBankQR(params: GEN_QR) {
  return httpQR({
    method: "post",
    url: `https://api.vietqr.io/v2/generate`,
    data: params
  });
}