let currentCount = 3;

setInterval(function () {
  console.log(currentCount--);
  if (currentCount === 0) {
    clearInterval(this);
    console.log('blast off!');
  }
}, 1000);
