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
    backgroundImage: "",
    fontFamily: "",
  }, // default value (aka initial value)
});

export const cardSelector = selector({
  key: "editing_card_selector",
  get: ({ get }) => ({ ...get(card) }),
  set: ({ set }, newValue) => set(card, newValue),
});
