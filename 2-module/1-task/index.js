function sumSalary(salaries) {
  if (Object.keys(salaries).length === 0) {
    return null;
  }

  let result = 0;
  
  for (let value of Object.values(salaries)) {
    if (!isNaN(value) && isFinite(value)) {
      result += value;
    }
  } 
  
  return result;// ваш код...
}

