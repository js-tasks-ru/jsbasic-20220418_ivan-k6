let calculator = {
  read: function (a, b) {
    if (isNaN(a)) {
      console.log('Операнды должны быть числами');
      return null;
    }
    this.a = a;
    this.b = b;
  },
  sum: function() {return this.a + this.b},
  mul: function() {return this.a * this.b},
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
