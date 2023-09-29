import React, { useEffect, useState } from "react";
import { currentTab } from "store/root.ts";
import {
  useRecoilState,
} from "recoil";
import {   Tab, Tabs } from "@mui/material";

function Header() {
   const [value, setValue] = useRecoilState(currentTab);



const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  setValue(newValue);
  console.log(value);
};
  return <div className="text-white"> 
  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One"   />
          <Tab label="Item Two"  />
          <Tab label="Item Three"   />
        </Tabs>
  </div>;
}

export default Header;
