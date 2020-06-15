const gameContainer = document.getElementById('game');
let hasFlipped = false;
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let lockBoard = false;

const COLORS = [
	'red',
	'blue',
	'green',
	'orange',
	'purple',
	'red',
	'blue',
	'green',
	'orange',
	'purple'
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);
		newDiv.classList.add('card');
		function addImg() {
			let x = document.createElement('IMG');
			x.setAttribute('src', 'question.jpg');
			x.setAttribute('width', '100%');
			x.setAttribute('height', '100%');
			newDiv.appendChild(x);
		}
		addImg();

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
function handleCardClick(event) {
	// you can use event.target to see which element was clicked
	if (event.target.parentElement === card1) {
		return;
	}
	if (lockBoard) {
		return;
	}
	event.target.classList.add('opaque');
	if (!hasFlipped) {
		hasFlipped = true;
		card1 = event.target.parentElement;
	} else {
		hasFlipped = false;
		card2 = event.target.parentElement;
		console.log(card1, card2);
	}

	if (card1.className === card2.className) {
		cardsFlipped += 2;
		card1.removeEventListener('click', handleCardClick);
		card2.removeEventListener('click', handleCardClick);
		card1 = null;
		card2 = null;
	} else {
		lockBoard = true;
		setTimeout(function() {
			card1.firstElementChild.classList.remove('opaque');
			card2.firstElementChild.classList.remove('opaque');
			card1 = null;
			card2 = null;
			lockBoard = false;
		}, 1500);
	}
	if (cardsFlipped === COLORS.length) {
		alert('Game Over! You Win!!');
	}
}

// when the DOM loads
createDivsForColors(shuffledColors);

function refreshPage() {
	window.location.reload();
}
