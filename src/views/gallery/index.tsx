import React from "react";
import { useParams } from "react-router-dom";



function Component() {
const params = useParams();
console.log(params);
return <div className="text-white"> Gallery </div>;
}

export default Component;
