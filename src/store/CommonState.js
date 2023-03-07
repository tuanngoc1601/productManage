import { atom } from "recoil";

export const IsLoading = atom({
  key: "IS_LOADING",
  default: false,
});

export const ReLoad = atom({
  key: "RELOAD_PAGE",
  default: false,
});
