import { atom } from "recoil";

export const currentTab = atom({
  key: "currentTab", // unique ID (with respect to other atoms/selectors)
  default: "product", // default value (aka initial value)
});

export const activatedMenu = atom({
  key: "activatedMenu",
  default: "",
});
