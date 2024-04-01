export function fizzbuzz() {let a = ""; for (let n = 1; n <= 100; n++) {a +=(n % 3 === 0 && n % 5 === 0 ? "FizzBuzz" : n % 3 === 0 ? "Fizz" : n % 5 === 0 ? "Buzz" : n.toString()) + "\n"; } return a;}
