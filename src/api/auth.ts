import http from "helper/request";


export function signIn(params: {username: string, password: string}) {
    return http({
      method: "post",
      url: `/api/users/signin`,
      data: params
    });
  }
 