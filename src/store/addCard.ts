import { COMPONENT } from "interface/component";
import { atom, selector, selectorFamily } from "recoil";

export const card = atom({
  key: "editing_card", // unique ID (with respect to other atoms/selectors)
  default: {
    alignment: "",
    logo: "",
    enableLogo: true,
    frontText: "",
    frontTextColor: "",
    qrUrl: "",
    enableFrontText: true,
    backText: "",
    backgroundColor: "",
    backgroundImage: "",
    fontFamily: "Montserrat",
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


export const presetCards = atom({
  key:'presetCards',
  default:[]
}) 
