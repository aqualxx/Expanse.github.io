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
	automation(time)
	updateHTML()
	updateAchievements()
}

var autos = {
	quarks: {
		nextGravity: 0
	}
}

function automation(time) {
	if (player.darkmatter.auto.unlocked && player.darkmatter.auto.active) {
		if (getDarkMatterGain().gte(player.darkmatter.auto.req)) {
			gainDarkMatter()
		}
	}
	if (player.quarks.auto.unlocked && player.quarks.auto.active) {
		autos.quarks.nextGravity += time
		if (player.quarks.auto.gravityTick.lte(autos.quarks.nextGravity)) {
			autos.quarks.nextGravity = 0
			if (player.quarks.auto.gravityTick.gt("50")) convertGravity()
		}
	}
}

function save() {
	if (player.expanse.size.gt(0)) {
		localStorage.setItem("expanseData", btoa(JSON.stringify(player)))
		if (document.hasFocus()) toast.success("Game Saved!")
	}
}

var saveLoop = setInterval(save, 12000)
