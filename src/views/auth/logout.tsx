import React, { useEffect } from "react";
import { googleLogout } from "@react-oauth/google";

function Login() {
  return (
    <div>
      <googleLogout
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      ;
    </div>
  );
}

export default Login;
