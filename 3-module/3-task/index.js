function camelize(str) {
  let splitedArr = str.split('-');
  for (let i = 1; i < splitedArr.length; i++) {
    splitedArr[i] = splitedArr[i][0].toUpperCase() + splitedArr[i].slice(1);
  }
  return splitedArr.join('');// ваш код...
}
