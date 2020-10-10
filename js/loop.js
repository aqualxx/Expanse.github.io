function simulateTime() {
	let diff = Date.now() - player.time;
	if (typeof diff != "number") diff = 0;
	player.time = Date.now();
	gameLoop(diff);
}

function gameLoop(time) {
	visualUpdateTicks += 50;
	player.expanse.size = new Decimal(player.expanse.size)
		.plus(spaceProduction(time))
		.max(0)
	if (player.expanse.size.gt(player.expanse.best)) player.expanse.best = player.expanse.size
	if ($("gainDarkMatter").classList.contains("hidden") && player.expanse.size.gte("75")) {
		$("gainDarkMatter").classList.remove("hidden")
	}
	if (!player.quarks.unlocked && player.darkmatter.amount.gte("5e6") && player.expanse.size.gte("2.5e7")) {
		player.quarks.unlocked = true;
		$("quarksBtn").style.display = ""
	}
	if (player.quarks.unlocked) {
		quarkLoop(time)
	}
	updateHTML()
	updateAchievements()
}

function save() {
	if (player.expanse.size.gt(1)) {
		localStorage.setItem("expanseData", btoa(JSON.stringify(player)))
		if (document.hasFocus()) toast.success("Game Saved!")
	}
}

var saveLoop = setInterval(save, 12000)