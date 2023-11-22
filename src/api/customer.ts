import http from "helper/request";
import { CUSTOMER } from "interface/customer";


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
  export function createCustomer(params:CUSTOMER) {
    return http({
      method: "post",
      url: `/api/customer/crudc`,
      data: params
    });
  }
 