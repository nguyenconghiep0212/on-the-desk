 import { atom  } from "recoil";
 
export const selectedMenuStore = atom({
  key: "selectedMenuStore", // unique ID (with respect to other atoms/selectors)
  default: "accountInfo", // default value (aka initial value)
});
 
 

export const userInfoStore = atom({
  key: "userInfoStore",  
  default: {},  
});
 

export const userCardStore = atom({
  key: "userCardStore",  
  default: [],  
});