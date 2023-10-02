import React, { useEffect } from "react";
import { GoogleLogin , googleLogout  } from "@react-oauth/google";
import { Button } from "antd";
import jwt_decode from "jwt-decode";

function Login() {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <Button onClick={googleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Login;
