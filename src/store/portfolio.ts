import { atom, selector  } from "recoil"; 

export const portfolioEdit = atom({
    key:'portfolioEdit',
    default: false
})

export const packageInfoPortfolio = atom({
    key: "packageInfoPortfolio",  
    default: [{
        config: {
          alias: "",
          data: [],
        },
        id: "",
        index: 0,
        key: "",
        packageId: "",
      }],
  });

export const userInfoPortfolio = atom({
  key: "userInfoPortfolio",  
  default: {
    id: "",
    name: "",
    email: "",
    description: "",
    shortcut: "",
    job: "",
    avatar: "",
    contacts: [
      {
        id: "",
        typeContact: "",
        nameContact: "",
        keyContact: "",
        infoDetail: "",
        templateId: "",
        linkIcon: "",
        backgroundColor: "",
        status: 1,
      },
    ],
    backgrounds: [],
    package: {
      id: "",
      packageName: "",
    },
  },  
}); 

export const userInfoOriginalPortfolio = atom({
    key: "userInfoOriginalPortfolio",  
    default: {
      id: "",
      name: "",
      email: "",
      description: "",
      shortcut: "",
      job: "",
      avatar: "",
      contacts: [
        {
          id: "",
          typeContact: "",
          nameContact: "",
          keyContact: "",
          infoDetail: "",
          templateId: "",
          linkIcon: "",
          backgroundColor: "",
          status: 1,
        },
      ],
      backgrounds: [],
      package: {
        id: "",
        packageName: "",
      },
    },  
  });

  export const contactsData = atom({
    key:'contactsData',
    default: []
  })
  export const contactsDataSelector = selector({
    key: "contactsDataSelector",
    get: ({ get }) => ({ ...get(contactsData) }),
    set: ({ set }, newValue) => set(contactsData, newValue),
  });
  