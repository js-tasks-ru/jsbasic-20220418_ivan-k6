function getMinMax(str) {
  let filteredArr = str.split(' ').filter(item => !isNaN(+item));

  let result = {
    min: Math.min(...filteredArr),
    max: Math.max(...filteredArr),
  };

  return result;// ваш код...
}
