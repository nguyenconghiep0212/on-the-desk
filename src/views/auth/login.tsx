import React, { useEffect } from "react";
import { GoogleLogin , googleLogout  } from "@react-oauth/google";
import { Button } from "antd";
import jwt_decode from "jwt-decode";

function Login() {

  function decodeJWT(credentialEncode){
    console.log('credentialEncode',credentialEncode)
    const credential = jwt_decode(credentialEncode.credential)
    console.log('credential',credential)
  }
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          decodeJWT(credentialResponse);
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
