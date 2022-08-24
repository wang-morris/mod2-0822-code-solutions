function ExampleConstructor() {

}

console.log('Value of of ExampleConstructor prototype:', Object.getPrototypeOf(ExampleConstructor));
console.log('typeof ExampleConstructor prototype:', typeof Object.getPrototypeOf(ExampleConstructor));

var myExample = new ExampleConstructor();
console.log(myExample);

var isInstanceOf = myExample instanceof ExampleConstructor;
console.log('is instanceof:', isInstanceOf);
