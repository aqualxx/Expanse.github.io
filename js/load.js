window.addEventListener("load", function () {
    $("loader").className += "hidden";
    $("game").style.opacity = "1";
    scrollNextMessage()
});

var oldSave;

function setPlayer(obj) {
    if (!obj.darkmatter) obj.darkmatter = copyObj(STARTINGPLAYER().darkmatter)
    if (!obj.quarks) obj.quarks = copyObj(STARTINGPLAYER().quarks)
    player.options.newsHidden = obj.options.newsHidden
    player.options.theme = obj.options.theme
    setTheme(player.options.theme, false)
    obj.achievements.forEach(function (achievement) {
        new Achievement(achievement).give(false)
    })
    player.expanse.size = new Decimal(obj.expanse.size);
    player.expanse.expanses = new Decimal(obj.expanse.expanses);
    player.darkmatter.amount = new Decimal(obj.darkmatter.amount);
    player.darkmatter.upsunlocked = obj.darkmatter.upsunlocked;
    player.darkmatter.unlocked = obj.darkmatter.unlocked
    player.quarks.unlocked = obj.quarks.unlocked
    if (player.quarks.unlocked) {
        $("quarksBtn").style.display = ""
    }
    player.quarks.amount = new Decimal(obj.quarks.amount)
    player.quarks.energy = new Decimal(obj.quarks.energy)
    $("energy").innerHTML = formatValue(player.quarks.energy.toFixed(0), 2)
    $("energyEffect").innerHTML = getEnergyEffect()
    player.quarks.gravity = new Decimal(obj.quarks.gravity)
    if (player.darkmatter.amount.gte("2000") || player.darkmatter.upsunlocked) $("darkMatterUps").classList.remove("hidden")
    if (player.expanse.size.gt("0"))
        $("createExpanse").style.display = "none";
    if (player.darkmatter.unlocked) {
        $("darkMatterText").classList.remove("hidden")
        updateDMHTML()
        $("dmup3boost").innerHTML = FORMULAS.dmup3boost()
    }
    if (obj.options.newsHidden) {
        $("ticker").style.display = "none"
        player.options.newsHidden = true
    }

    player.updateHTMLtime = obj.updateHTMLtime;

    oldSave = obj
}

function setupHTML() {
    // achievements
    for (var i = 0; i < Object.keys(ACH_DATA).length; i++) {
        let key = Object.keys(ACH_DATA)[i]
        $("ach" + key).setAttribute("data-tooltip", new Achievement(key).desc)
    }

    // space upgrades
    for (var i = 0; i < spaceupgrades; i++) {
        if (typeof oldSave.expanse.upgrades[i].bought === "number") {
            player.expanse.upgrades[i].bought = oldSave.expanse.upgrades[i].bought
            if (player.expanse.upgrades[i].bought) $("spaceup" + (i + 1)).classList.add("complete")
        } else {
            player.expanse.upgrades[i].bought = 0
        }
    }
    
    // dm upgrades
    if (player.darkmatter.upsunlocked) {
        for (var i = 0; i < dmupamount; i++) {
            if (typeof oldSave.darkmatter.ups[i] === "boolean") {
                player.darkmatter.ups.push(oldSave.darkmatter.ups[i])
                if (player.darkmatter.ups[i]) $("dmup" + (i + 1)).classList.add("complete")
            } else {
                player.darkmatter.ups.push(false)
            }
        }
    }

    // quark upgrades
    if (oldSave.quarks.ups.length != 0) {
        for (var i = 0; i < quarkups; i++) {
            if (oldSave.quarks.ups.includes(i.toString())) {
                player.quarks.ups.push(i.toString())
                $("quarkup" + (i + 1)).classList.add("complete")
            }
        }
    }

    // quark milestones
    for (var i = 0; i < quarkmilestones; i++) {
        if (oldSave.quarks.milestones.includes(i.toString())) {
            grantQuarkMile(i.toString())
        }
    }

    if (player.quarks.milestones.includes("1")) $("dmup5").style.display = ""

    oldSave = ""
}