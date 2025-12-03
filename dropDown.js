const baseInterval = 1000;
let timer = setInterval(dropDownTetr, baseInterval);

function setDropRate(input) {
	clearInterval(timer);
	timer = setInterval(dropDownTetr, baseInterval * (0.85 ** (input - 1)));
}