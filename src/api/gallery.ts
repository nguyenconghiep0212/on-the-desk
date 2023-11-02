import http from "helper/request";
import { UPDATE_GALLERY } from "interface/gallery";
import httpUpload from "helper/requestFile";


export function getGalleryById(params: {
    id: String;
    page: Number;
    size: Number;
  }) {
    return http({
      method: "get",
      url: `/api/gallery/detail/${params.id}/${params.page}/${params.size}`,
    });
  }
  
  export function getGalleryByUserId(id: string) {
    return http({
      method: "get",
      url: `/api/users/galleries/${id}`,
    });
  }
  
  export function getGalleryByCustomerId(id: string){
  return http({
    method: 'get',
    url: `/api/customer/galleries/${id}`
  })
  }

  export function updateGallery(params:UPDATE_GALLERY){
    return http({
      method: 'post',
      url: `/api/gallery/crudu/${params.id}`,
      data: params
    })
  }

  export function createGallery(params:UPDATE_GALLERY){
    return http({
      method: 'post',
      url: `/api/gallery/crudc`,
      data: params
    })
  }
  export function uploadGallery(data: any) {
    return httpUpload({
      method: "post",
      url: `/api/users/uploadgalleries`,
      data
    });
  }
  
