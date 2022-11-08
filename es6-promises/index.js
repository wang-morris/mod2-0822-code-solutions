const takeAChance = require('./take-a-chance');

const myPromise = takeAChance('Morris');

myPromise.then(name => {
  console.log(`${name}`);
})
  .catch(e => {
    console.log(e.message);
  })
  .then(
    () => console.log('Horray! You\'re so lucky, ' + `${name}`),
    () => console.log('It\'s just bad luck, ' + `${name}`)
  );
