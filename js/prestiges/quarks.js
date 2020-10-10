function grantQuarkMile(no) {
    if (player.quarks.milestones.includes(no)) return;
    $("quarkmile" + no).classList.add("complete")
    player.quarks.milestones.push(no)
}

function gainQuarks() {
    if (getQuarkGain() === "0") return;
    player.quarks.amount = new Decimal(player.quarks.amount).plus(getQuarkGain())

    if (player.quarks.amount.gte("5")) {
        grantQuarkMile("1")
        $("dmup5").style.display = ""
    }
    if (player.quarks.amount.gte("1000")) grantQuarkMile("2")
    if (player.quarks.amount.gte("2000")) grantQuarkMile("3")
    if (player.quarks.amount.gte("3500")) grantQuarkMile("4")

    player.expanse.size = new Decimal(0);
    player.darkmatter.amount = new Decimal(0);

    if (!player.quarks.milestones.includes("3")) {
        player.darkmatter.ups = []
        for (var i = 0; i < dmupamount; i++) {
            if ($("dmup" + (i + 1)).classList.contains("complete")) $("dmup" + (i + 1)).classList.remove("complete")
        }
        player.darkmatter.upsunlocked = false;
        $("darkMatterUps").classList.add("hidden")
    }

    $("dmup3boost").innerHTML = FORMULAS.dmup3boost()
    if (!player.quarks.milestones.includes("2")) {
        player.expanse.upgrades = STARTINGPLAYER().expanse.upgrades
        for (var i = 0; i < spaceupgrades; i++) {
            if ($("spaceup" + (i + 1)).classList.contains("complete")) $("spaceup" + (i + 1)).classList.remove("complete")
        }        
    }
}

const quarkmilestones = 4

function getQuarkGain() {
    if (player.darkmatter.amount.lt("5e6") || player.expanse.size.lt("2.5e7")) return "0";
    return player.darkmatter.amount.div("5e6").plus(4).log(5)
        .mul(player.expanse.size.div("2.5e7").plus(2).log(3))
        .mul(player.quarks.ups.includes("1") ? "2" : "1")
        .floor().max(0).toString()
}

function getGravityGain(time) {
    return player.quarks.amount.mul(2).mul(time / 1000)
}

function getEnergyGain() {
    return player.quarks.gravity.pow("0.9")
}

function getGravityEffect() {
    if (player.quarks.gravity.lt(1)) return "1"

    let effect = new Decimal(0)
    let logAmount = player.achievements.includes("18") ? "4" : "3"
    let quarkup1 = player.quarks.ups.includes("2");

    if (quarkup1) effect = player.quarks.gravity.max(1).log(logAmount).log10().pow("0.8").plus(1)
    else effect = player.quarks.gravity.max(1).log(logAmount).pow("0.8").plus(1)

    return formatValue(effect.toFixed("2").toString(), 2)
}

function getEnergyEffect() {
    if (player.quarks.energy.lt(1)) return "1"
    let reductionPower = player.quarks.ups.includes("3") ? player.achievements.includes("24") ? player.quarks.energy.pow("0.44") : player.quarks.energy.pow("0.45") : player.quarks.energy.pow("0.6")
    let reduction = isNaN(reductionPower) ? "1" : reductionPower
    return formatValue(player.quarks.energy.max(1).div(reduction).plus(1).toFixed("2").toString(), 2)
}

function quarkLoop(time) {
    player.quarks.gravity = new Decimal(player.quarks.gravity).plus(getGravityGain(time))
    if (player.quarks.milestones.includes("4") && player.quarks.mile4on) player.darkmatter.amount = new Decimal(player.darkmatter.amount).plus(getDarkMatterGain().div("100"))
}

function updateQuarkHTML() {
    $("quarks").innerHTML = formatValue(player.quarks.amount.toFixed(0), 2)
    $("quarksTxt").innerHTML = "quark" + pluralize(player.quarks.amount)
    $("quarkgain").innerHTML = getQuarkGain() + " quark" + pluralize(getQuarkGain())
    $("gravityGain").innerHTML = formatValue(getGravityGain(1000), 2)
    $("gravity").innerHTML = formatValue(player.quarks.gravity.toFixed(0), 2)
    $("gravityEffect").innerHTML = getGravityEffect()
    $("energyProd").innerHTML = formatValue(getEnergyGain().toFixed(0), 2)
    $("energy").innerHTML = formatValue(player.quarks.energy.toFixed(0), 2)
    $("energyEffect").innerHTML = getEnergyEffect()
}

function mile4On() {
    player.quarks.mile4on = true
}

function mile4Off() {
    player.quarks.mile4on = false
}

$("convertGravity").addEventListener("click", function () {
    if (player.quarks.gravity.gt(0)) {
        player.quarks.energy = new Decimal(player.quarks.energy).plus(getEnergyGain())
        player.quarks.gravity = new Decimal("0")
        $("energy").innerHTML = formatValue(player.quarks.energy.toFixed(0), 2)
        $("energyEffect").innerHTML = getEnergyEffect()
    }
})

$("quarkup1").addEventListener("click", function() {
    if (player.quarks.energy.gte("3000") && !player.quarks.ups.includes("1")) {
        player.quarks.energy = new Decimal(player.quarks.energy).minus("3000")
        player.quarks.ups.push("1")
        $("quarkup1").classList.add("complete")
    }
})

$("quarkup2").addEventListener("click", function() {
    if (player.quarks.amount.gte("60") && player.quarks.energy.gte("50000") && !player.quarks.ups.includes("2")) {
        player.quarks.amount = new Decimal(player.quarks.amount).minus("60")
        player.quarks.energy = new Decimal(player.quarks.energy).minus("50000")
        player.quarks.ups.push("2")
        $("quarkup2").classList.add("complete")
    }
})

$("quarkup3").addEventListener("click", function() {
    if (player.quarks.amount.gte("80") && player.quarks.gravity.gte("30000") && !player.quarks.ups.includes("3")) {
        player.quarks.amount = new Decimal(player.quarks.amount).minus("80")
        player.quarks.gravity = new Decimal(player.quarks.gravity).minus("30000")
        player.quarks.ups.push("3")
        $("quarkup3").classList.add("complete")
    }
})

$("quarkup5").addEventListener("click", function() {
    if (player.quarks.amount.gte("100") && player.quarks.gravity.gte("30000") && player.quarks.energy.gte("30000") && !player.quarks.ups.includes("5")) {
        player.quarks.amount = new Decimal(player.quarks.amount).minus("100")
        player.quarks.gravity = new Decimal(player.quarks.gravity).minus("30000")
        player.quarks.energy = new Decimal(player.quarks.energy).minus("30000")
        player.quarks.ups.push("5")
        $("quarkup5").classList.add("complete")
    }
})

$("quarkup4").addEventListener("click", function() {
    if (player.quarks.amount.gte("200") && player.quarks.gravity.gte("105000") && player.quarks.energy.gte("50000") && !player.quarks.ups.includes("4")) {
        player.quarks.amount = new Decimal(player.quarks.amount).minus("200")
        player.quarks.gravity = new Decimal(player.quarks.gravity).minus("105000")
        player.quarks.energy = new Decimal(player.quarks.energy).minus("50000")
        player.quarks.ups.push("4")
        $("quarkup4").classList.add("complete")
    }
})

const quarkups = 5