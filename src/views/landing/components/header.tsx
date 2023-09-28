import React, { useEffect } from "react";
import { textState } from "store/root.ts";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { Input } from "@mui/material";

function Header() {
  const [text, setText] = useRecoilState(textState);
function onChange(event){
    setText(event.target.value)
}
  return <div className="text-white"> 
  <Input value={text} onChange={onChange}/>
  </div>;
}

export default Header;
