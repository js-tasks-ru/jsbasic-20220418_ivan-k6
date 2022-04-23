function factorial(n) {
  let result = 1;

  if (n === 0) {
    return result;
  }

  for (let i = 1; i <= n; i++) {
    result *= i;
  }

  return result;
}