import http from "helper/request";
import { CUSTOMER } from "interface/customer";


export function getCustomerByShortcut(shortcut:string) {
    return http({
      method: "get",
      url: `/api/customer/profile/${shortcut}`,
    });
  }
 
  export function fetchCustomerList( ) {
    return http({
      method: "get",
      url: `/dropdownlist`,
    });
  }
  export function createCustomer(params:CUSTOMER) {
    return http({
      method: "post",
      url: `/api/customer/crudc`,
      data: params
    });
  }

  export function updateCustomer(params:CUSTOMER) {
    return http({
      method: "post",
      url: `/api/customer/crudu/${params.id}`,
      data: params
    });
  }
  
  export function deleteCustomer(id: string) {
    return http({
      method: "delete",
      url: `/api/customer/delete?CustomerId=${id}`
    });
  }
  
