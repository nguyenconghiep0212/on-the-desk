import { COMPONENT } from "interface/component";
import { atom, selector } from "recoil";

export const card = atom({
  key: "editing_card", // unique ID (with respect to other atoms/selectors)
  default: {
    alignment: "",
    logo: "",
    enableLogo: true,
    frontText: "",
    enableFrontText: true,
    backText: "",
    backgroundColor: "",
    backgroundImage: "https://cdn.onthedesk.vn/hiep-nguyen-cong/Card/ed179f7407ca41a3b239b555aa437ff3.jpg",
    fontFamily: "",
  }, // default value (aka initial value)
});

export const cardSelector = selector({
  key: "editing_card_selector",
  get: ({ get }) => ({ ...get(card) }),
  set: ({ set }, newValue) => set(card, newValue),
});

export const selectedPackage= atom<COMPONENT>({
  key:'selectedPackage',
  default: {
    id: "",
    packageId: "",
    key: "",
    config: "",
    index: 0
  }
})