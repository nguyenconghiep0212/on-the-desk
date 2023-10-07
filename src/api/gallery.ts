import http from "helper/request";


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