const outputPassword = document.querySelector('.output-password span'),
			cdnScript = document.querySelector('script#cdn-algorithm'),
			inputCheckboxToGroup = document.querySelector('.to-group input'),
			inputCheckboxSymbols = document.querySelector('.spec-symbols input'),
			inputCase = document.querySelectorAll('.letter-case input'),
			inputLengthPassword = document.querySelector('.length-password input'),
			inputHashing = document.querySelectorAll('.select-hashing input'),
			btnCreatePassword = document.querySelector('.create-password'),
			specSymbols = ['%', ':', '*', '#', '@', '%', '&'],
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

for (let i = 0; i < inputHashing.length; i++) {
	inputHashing[i].addEventListener('click', function() {
		activeHashing = inputHashing[i].value; 
		console.log(`Active algorithm hashing: ${activeHashing}`);
	})
};

// button create password
btnCreatePassword.addEventListener('click', function() {
	let randomNumber = 0;

	if (Modernizr.getrandomvalues) { // checking browser support for the getrandomvalues method
		randomNumber = createRandomNumber();		
	} else {
		randomNumber = getRandomInRange(0, 1000000000);
	}

	checkNumberLength(randomNumber);

	let newPassword = hashings[activeHashing](randomNumber);

	newPassword = changeByOptions(newPassword);
	
	outputPassword.innerHTML = newPassword;

	console.log(`Random number: ${randomNumber}`);
});

function changeByOptions(str) {
	let arrPassword = str.split('');

	arrPassword = checkLengthPassword(arrPassword);

	let upperstep = getRandomInRange(2, arrPassword.length - 1);

	for (let i = 1; i < arrPassword.length; i++) {
		if (inputCheckboxSymbols.checked) {
			if (i % upperstep == 0 && i != 0) {
		    arrPassword[i] = specSymbols[getRandomInRange(0, specSymbols.length - 1)];
		  }
		}

		if (inputCheckboxToGroup.checked) {
			if (i % 5 == 0) {
				arrPassword.splice(i - 1, 0, '-');
			}
		}
	};

	if (check() == 'mixedcase') {
		for (let i = 0; i < arrPassword.length; i++) {
			upperstep = upperstep % 3;
			if (i % upperstep == 0 && i != 0) {
		    arrPassword[i] = arrPassword[i].toUpperCase();
			}
		}
	} else if (check() == 'uppercase') {
		for (let i = 0; i < arrPassword.length; i++) {
			arrPassword[i] = arrPassword[i].toUpperCase();
		}
	} else if (check() == 'lowercase') {
		for (let i = 0; i < arrPassword.length; i++) {
			arrPassword[i] = arrPassword[i].toLowerCase();
		}		
	};

	return arrPassword.join('');
};

function createRandomNumber() {
	let array = new Uint32Array(1);
	let crypto = window.crypto || window.msCrypto;
	crypto.getRandomValues(array);
	
	let newArray = Array.prototype.slice.call(array) || Array.from(array);

	return newArray.join();
};

function check() {
  for (let i = 0; i < inputCase.length; i++) {
    if (inputCase[i].type == "radio" && inputCase[i].checked) {
      return inputCase[i].value;
    }
  }
};

function getRandomInRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

function checkNumberLength(n) {
	let number = String(n).split('');

	if (number.length < 10) {
		for (let i = number.length; i < 10; i++) {
			number[i] = 0;
		};
	};
	number = Number(number.join(''));
	return number;
};

inputLengthPassword.addEventListener('change', function() {
	if (this.value > 32) {
		this.value = 32;
	} else if (this.value < 4) {
		this.value = 4;
	}
});

function checkLengthPassword(text) {
	let inputLengthP = inputLengthPassword.value;
	let newText = text;

	newText = newText.slice(0, inputLengthP); 
	
	return newText;
}