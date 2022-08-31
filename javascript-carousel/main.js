// left and right buttons
var $nextButton = document.querySelector('.fa-angle-right');
var $backButton = document.querySelector('.fa-angle-left');
var $nodelist = document.querySelectorAll('li');
$nextButton.addEventListener('click', nextClick);
$backButton.addEventListener('click', backClick);

function nextClick(e) {
  clearInterval(timer);
  timer = setInterval(carousel, 3000);
  var currentIndex = 0;
  for (var i = 0; i < $nodelist.length; i++) {
    var currentNode = $nodelist[i];
    if (currentNode.getAttribute('class') === 'view current') {
      currentIndex = i;
      break;
    }
  }
  var currentElement = $nodelist[currentIndex];
  if (currentIndex === 4) {
    var nextElement = $nodelist[0];
  } else {
    nextElement = $nodelist[currentIndex + 1];
  }
  currentElement.setAttribute('class', 'view hidden');
  nextElement.setAttribute('class', 'view current');
}

function backClick(e) {
  clearInterval(timer);
  timer = setInterval(carousel, 3000);
  var currentIndex = 0;
  for (var i = 0; i < $nodelist.length; i++) {
    var currentNode = $nodelist[i];
    if (currentNode.getAttribute('class') === 'view current') {
      currentIndex = i;
      break;
    }
  }
  var currentElement = $nodelist[currentIndex];
  if (currentIndex === 0) {
    var nextElement = $nodelist[$nodelist.length - 1];
  } else {
    nextElement = $nodelist[currentIndex - 1];
  }
  currentElement.setAttribute('class', 'view hidden');
  nextElement.setAttribute('class', 'view current');
}

// circle buttons
var $buttons = document.getElementsByClassName('fa-circle');
for (var i = 0; i < $buttons.length; i++) {
  $buttons[i].addEventListener('click', circleClick);
}

function circleClick(e) {
  clearInterval(timer);
  timer = setInterval(carousel, 3000);
  for (var i = 0; i < $nodelist.length; i++) {
    var currentNode = $nodelist[i];
    if (currentNode.getAttribute('class') === 'view current') {
      break;
    }
  }
  var circleTarget = e.target.classList;
  var nextElement = $nodelist[0];
  var currentElement = $nodelist[i];
  if (circleTarget.contains('one')) {
    nextElement = $nodelist[0];
    nextElement.setAttribute('class', 'view current');
    currentElement.setAttribute('class', 'view hidden');
  } else if (circleTarget.contains('two')) {
    nextElement = $nodelist[1];
    nextElement.setAttribute('class', 'view current');
    currentElement.setAttribute('class', 'view hidden');
  } else if (circleTarget.contains('three')) {
    nextElement = $nodelist[2];
    nextElement.setAttribute('class', 'view current');
    currentElement.setAttribute('class', 'view hidden');
  } else if (circleTarget.contains('four')) {
    nextElement = $nodelist[3];
    nextElement.setAttribute('class', 'view current');
    currentElement.setAttribute('class', 'view hidden');
  } else if (circleTarget.contains('five')) {
    nextElement = $nodelist[4];
    nextElement.setAttribute('class', 'view current');
    currentElement.setAttribute('class', 'view hidden');
  }
}

// carousel effect
var timer = setInterval(carousel, 3000);
function carousel() {
  nextClick();
}
