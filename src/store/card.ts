import { atom, selector } from "recoil";

export const card = atom({
  key: "editing_card", // unique ID (with respect to other atoms/selectors)
  default: {
    alignment: "",
    logo: "",
    frontText: "",
    backText: "",
    backgroundColor: "",
    backgroundImage: "",
  }, // default value (aka initial value)
});

export const cardSelector = selector({
    key: 'editing_card_selector',
    get: ({get}) => ({...get(card)}),
    set: ({set}, newValue) => set(card, newValue),
  });