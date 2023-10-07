import http from "helper/request";


export function getCustomerById(id:string) {
    return http({
      method: "get",
      url: `/api/customer/profile/${id}`,
    });
  }
 