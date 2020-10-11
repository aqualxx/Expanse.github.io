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

    player.darkmatter.auto.active = obj.darkmatter.auto.active
    player.darkmatter.auto.req = new Decimal(obj.darkmatter.auto.req)
    player.darkmatter.auto.unlocked = obj.darkmatter.auto.unlocked
    
    player.quarks.unlocked = obj.quarks.unlocked
    if (player.quarks.unlocked) {
        $("quarksBtn").style.display = ""
        $("unlockAutoGravity").style.display = ""
    }
    player.quarks.amount = new Decimal(obj.quarks.amount)
    player.quarks.energy = new Decimal(obj.quarks.energy)
    player.quarks.mile4on = obj.quarks.mile4on
    player.quarks.auto.gravityTick = new Decimal(obj.quarks.auto.gravityTick)
    player.quarks.auto.unlocked = obj.quarks.auto.unlocked
    player.quarks.auto.active = obj.quarks.auto.active

    $("gravityAutoUp").innerHTML = "Upgrade to "+new Decimal(player.quarks.auto.gravityTick).pow("0.996").toFixed(0)+"ms for 50 quarks"
    $("autoGravityTime").innerHTML = player.quarks.auto.gravityTick.toFixed(0)+"ms"

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
    
    loadAutos()
}

function loadAutos() {
    if (player.darkmatter.auto.unlocked) {
        $("unlockAutoDM").style.display = "none"
        $("autoDMSection").style.display = ""
        $("dmAutoBtn").innerHTML = player.darkmatter.auto.active ? "Automator Active" : "Automator Disabled"
        $("autoDMReqInput").value = formatValue(player.darkmatter.auto.req, 2)
        $("autoDMReq").innerHTML = formatValue(player.darkmatter.auto.req, 2)
    }
    if (player.quarks.auto.unlocked) {
        $("autoGravitySection").style.display = ""
        $("unlockAutoGravity").style.display = "none"
        $("gravityAutoBtn").innerHTML = player.quarks.auto.active ? "Automator Active" : "Automator Disabled"
    }
    if (player.quarks.auto.gravityTick.lte("50")) {
        $("autoGravityTime").innerHTML = player.quarks.auto.gravityTick.toFixed(0) + "ms (max)"
        $("quarkProdType").innerHTML = "energy"
        $("gravitySection").style.display = "none"
        $("gravityAutoUp").style.display = "none"
    }
}

function setupHTML() {
    // achievements
    for (var i = 0; i < Object.keys(ACH_DATA).length; i++) {
        let key = Object.keys(ACH_DATA)[i]
        $("ach" + key).setAttribute("data-tooltip", new Achievement(key).desc)
    }

    // space upgrades
    for (var i = 0; i < document.getElementsByClassName("spaceup").length; i++) {
        player.expanse.upgrades[i].bought = oldSave.expanse.upgrades[i].bought
        if (player.expanse.upgrades[i].bought) $("spaceup" + (i + 1)).classList.add("complete")
    }
    
    // dm upgrades
    if (player.darkmatter.upsunlocked) {
        for (var i = 0; i < document.getElementsByClassName("dmup").length; i++) {
            player.darkmatter.ups.push(oldSave.darkmatter.ups[i])
            if (player.darkmatter.ups[i]) $("dmup" + (i + 1)).classList.add("complete")
        }
    }

    // quark upgrades
    if (oldSave.quarks.ups.length != 0) {
        for (var i = 0; i < document.getElementsByClassName("quarkup").length; i++) {
            if (oldSave.quarks.ups.includes((i+1).toString())) {
                player.quarks.ups.push((i+1).toString())
                $("quarkup" + (i + 1)).classList.add("complete")
            }
        }
    }

    // quark milestones
    for (var i = 0; i < quarkmilestones; i++) {
        if (oldSave.quarks.milestones.includes((i+1).toString())) {
            grantQuarkMile((i+1).toString())
        }
    }

    if (player.quarks.milestones.includes("1")) $("dmup5").style.display = ""

    oldSave = ""
}