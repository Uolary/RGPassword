const outputPassword = document.querySelector('.output-password span'),
			cdnScript = document.querySelector('script#cdn-algorithm'),
			selectHashing = document.querySelectorAll('.select-hashing input'),
			btnCreatePassword = document.querySelector('.create-password'),
			hashings = {
				md2(text) {
					return md2(text);
				},
				md4(text) {
					return md4(text);
				},
				md5(text) {
					return md5(text);
				},
				sha1(text) {
					return sha1(text);
				},
				sha256(text) {
					return sha256(text);
				}
			};

let activeHashing = 'md5';

// function does not work in Opera mobile
// selectHashing.forEach((elem) => elem.addEventListener('click', function() {
// 	activeHashing = elem.value;
// 	console.log(`Active algorithm hashing: ${activeHashing}`);
// }));

for (var i = 0; i < selectHashing.length; i++) {
	selectHashing[i].addEventListener('click', function() {
		activeHashing = selectHashing[i].value;
		console.log(`Active algorithm hashing: ${activeHashing}`);
	})
}

btnCreatePassword.addEventListener('click', function() {
	let randomNumber = 0;

	if (Modernizr.getrandomvalues) { // checking browser support for the getrandomvalues method
		randomNumber = createRandomNumber();		
	} else {
		randomNumber = getRandomInRange(0, 1000000000);
	}

	checkNumberLength(randomNumber);

	let newPassword = hashings[activeHashing](randomNumber);

	if (newPassword.length > 32) {
		newPassword = newPassword.slice(0, 32);
	}
	
	outputPassword.innerHTML = newPassword;

	console.log(`Random number: ${randomNumber}`);
});

function createRandomNumber() {
	let array = new Uint32Array(1);
	let crypto = window.crypto || window.msCrypto;
	crypto.getRandomValues(array);
	
	let newArray = Array.prototype.slice.call(array) || Array.from(array);

	return newArray.join();
}

function getRandomInRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkNumberLength(n) {
	let number = String(n).split('');

	if (number.length < 10) {
		for (let i = number.length; i < 10; i++) {
			number[i] = 0;
		};
	};
	number = Number(number.join(''));
	return number;
}