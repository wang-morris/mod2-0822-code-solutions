const add = require('./add');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');

const argv = process.argv;
const operation = argv[3];
const num1 = Number(argv[2]);
const num2 = Number(argv[4]);

console.log(process.argv);
console.log(process.argv[2]);

if (operation === 'plus') {
  console.log('result:', add(num1, num2));
} else if (operation === 'minus') {
  console.log('result:', subtract(num1, num2));
} else if (operation === 'times') {
  console.log('result:', multiply(num1, num2));
} else if (operation === 'over') {
  console.log('result:', divide(num1, num2));
}
