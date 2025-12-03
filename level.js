let level = 1;

function increaseLevel() {
	if (score >= 10 * (5 ** level)) {
		level++;
		document.getElementById("level").innerText = level;
		setDropRate(level);
	}
}

function showLevelProgress() {
	document.getElementById("levelProgress").style.width = (score / (10 * (5 ** level))) * 100 + "%";
}

setInterval(increaseLevel, 100);
setInterval(showLevelProgress, 100);