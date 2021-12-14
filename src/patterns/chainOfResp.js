class Calc {
  constructor(initial = 0) {
    this.sum = initial
  }

  add(value) {
    this.sum += value
    return this
  }
}

const calc = new Calc()

console.log(calc.add(1).add(2).add(3).sum);
