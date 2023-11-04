import http from "helper/request";


export function getCustomerById(id:string) {
    return http({
      method: "get",
      url: `/api/customer/profile/${id}`,
    });
  }
 
  export function fetchCustomerList( ) {
    return http({
      method: "post",
      url: `/api/customer/list`,
    });
  }
 