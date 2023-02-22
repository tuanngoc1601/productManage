import { toast } from "react-toastify";
export function unique(arr) {
  var newArr = [];
  newArr = arr.filter(function (item) {
    return newArr.includes(item) ? "" : newArr.push(item);
  });
  return newArr;
}

export function randomRgba(x) {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + "," + x + ")"
  );
}

export function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

export function removeAccents(str) {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}

export function isFileImage(file) {
  return file && file["type"].split("/")[0] === "image";
}

export function toastListError(error) {
  const listErrors = error.response.data;

  if (listErrors) {
    listErrors.errors.forEach((error) => {
      toast.error(error);
    });
  }
}
