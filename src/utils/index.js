export function unique(arr) {
  var newArr = [];
  newArr = arr.filter(function (item) {
    return newArr.includes(item) ? "" : newArr.push(item);
  });
  return newArr;
}
