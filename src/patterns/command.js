class Calc {
  constructor(initial = 0) {
    this.value = initial
  }

  cube() {
    return this.value ** 2
  }

  square() {
    return this.value ** 3
  }
}

class Command {
  constructor(subject) {
    this.subject = subject
    this.logs = []
  }

  execute(command) {
    this.logs.push(command)
    return this.subject[command]()
  }
}

const c = new Command(new Calc(3))

console.log(c.execute("cube"));
console.log(c.execute("square"));
console.log(c.logs);
