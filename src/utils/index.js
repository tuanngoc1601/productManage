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
