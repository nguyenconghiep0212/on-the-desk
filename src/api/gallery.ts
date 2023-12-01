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
  
  export function getGalleryByUserShortcut(shortcut: string) {
    return http({
      method: "get",
      url: `/api/users/galleries/${shortcut}`,
    });
  }
  
  export function getGalleryByCustomerShortcut(shortcut: string){
  return http({
    method: 'get',
    url: `/api/customer/galleries/${shortcut}`
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
  
  export function detailGallery({shortcut, page, size}) {
    return httpUpload({
      method: "get",
      url: `/api/gallery/detail/${shortcut}/${page}/${size}`, 
    });
  }
  export function deleteGallery(id:string){
    return http({
      method: 'delete',
      url: `/api/gallery/deletealbum`,
      data: {id: id}
    })
  }

  export function getTopic(shortcut: string){
    return http({
      method: 'get',
      url: `/api/gallery/getlisttopics/${shortcut}`, 
    })
  }