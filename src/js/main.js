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

selectHashing.forEach((elem) => elem.addEventListener('click', function() {
	activeHashing = elem.value;
	console.log(`Active algorithm hashing: ${activeHashing}`);
}));

btnCreatePassword.addEventListener('click', function() {
	let randomNumber = createRandomNumber();
	let newPassword = hashings[activeHashing](randomNumber);

	if (newPassword.length > 32) {
		newPassword = newPassword.slice(0, 32);
	}
	
	console.log(`Random number: ${randomNumber}`);
	outputPassword.innerHTML = newPassword;
});

function createRandomNumber() {
	let array = new Uint32Array(1);
	let crypto = window.crypto || window.msCrypto;
	crypto.getRandomValues(array);
	
	let newArray = Array.prototype.slice.call(array) || Array.from(array);

	return newArray.join();
}