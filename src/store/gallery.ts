import { atom } from "recoil";

export const fullScreenVisible = atom({
  key: "fullScreenVisible", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
 