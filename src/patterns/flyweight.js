class CarModels {
  constructor(props) {
    this.cars = []
  }

  add(model) {
    if (this.getCar(model)) return void 0;
    this.cars.push(model)
  }

  getCar(model) {
    return this.cars.find(i => i === model)
  }
}

const models = new CarModels()

models.add("BMW")
models.add("Volvo")
models.add("BMW")

console.log(models.cars);
