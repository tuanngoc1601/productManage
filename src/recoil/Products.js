import { atom } from "recoil";

export const ProductsList = atom({
  key: "PRODUCTS_LIST",
  default: [],
});

export const ColorsList = atom({
  key: "COLORS_LIST",
  default: [],
});

export const SizesList = atom({
  key: "SIZES_LIST",
  default: [],
});

export const CategoriesList = atom({
  key: "CATEGORIES_LIST",
  default: [],
});
