import {
    atom,
  } from 'recoil';

export const currentTab = atom({
    key: 'currentTab', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });

  
