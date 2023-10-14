import http from "helper/request";

export function signIn(params: { username: string; password: string }) {
  return http({
    method: "post",
    url: `/api/users/signin`,
    data: params,
  });
}

export function googleSignIn(token: string) {
  return http({
    method: "get",
    url: `/api/users/signin/google/${token}`,
  });
}

export function signUp(params: {
  name: string;
  username: string;
  password: string;
  shortcut: string;
}) {
  return http({
    method: "post",
    url: `/api/users/signup`,
    data: params,
  });
}
