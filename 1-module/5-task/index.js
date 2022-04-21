function truncate(str, maxlength) {
  if (str === null || str === undefined || maxlength === null || Number.isNaN(+maxlength)) {
    console.log('ошибка ввода');
    return null;
  }
  
  if (str.length <= maxlength) {
    return str;
  } else {
    return str.slice(0, maxlength - 1) + '…';
  }
}
