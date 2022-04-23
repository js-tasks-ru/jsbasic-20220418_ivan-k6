function checkSpam(str) {
  if (str === null || str === undefined) {
    console.log('Ошибка ввода');
    return null;
  }

  let checkingStr = str.toLowerCase();
  let spamKeys = ['1xBet', 'XXX'];

  for (let spamKey of spamKeys) {
    if (checkingStr.includes(spamKey.toLowerCase())) {
      return true;
    }
  }

  return false;
}