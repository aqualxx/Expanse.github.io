function gainDarkMatter() {
    let req = player.darkmatter.ups[1] ? "100" : "125"
    if (player.expanse.size.gte(req)) {
        player.darkmatter.amount = new Decimal(player.darkmatter.amount)
            .plus(player.expanse.size.div(req).mul(FORMULAS.dmup3boost()).mul(FORMULAS.dmup5boost()).mul(player.achievements.includes("17") ? "3" : "1"))
            .floor();

        updateDMHTML()
        $("darkMatterText").classList.remove("hidden")

        if (player.darkmatter.amount.gte("2000") && $("darkMatterUps").classList.contains("hidden")) {
            $("darkMatterUps").classList.remove("hidden")
            player.darkmatter.upsunlocked = true
        }
        if (!player.darkmatter.unlocked) player.darkmatter.unlocked = true
        player.expanse.size = new Decimal(1);
        if (player.darkmatter.amount.gt(player.darkmatter.best)) player.darkmatter.best = player.darkmatter.amount
    }
}

function getDarkMatterEffect() {
    let betterFormula1 = player.achievements.includes("13")
    let gain = new Decimal("1")
    if (player.darkmatter.amount.gte("1")) {
        if (betterFormula1) {
            gain = player.darkmatter.amount.mul(4).log(1.25)
        } else {
            gain = player.darkmatter.amount.mul(2).log(1.5).plus(1)
        }
    }
    return darkMatterScaling(gain).toFixed(2).toString()
}

function updateDMHTML() {
    let req = player.darkmatter.ups[1] ? "100" : "125"
    let ach17 = player.achievements.includes("17") ? "3" : "1"
    let gain = player.expanse.size.div(req).mul(FORMULAS.dmup3boost()).mul(FORMULAS.dmup5boost()).mul(ach17)
    $("gainDarkMatter").innerHTML =
        "Reset all previous layers<br>to gain " +
        formatValue(gain.floor(), 2) +
        " dark matter" +
        (gain.floor().lt("100") ? "<br>(Next: " + (player.expanse.size.gte(req) ? formatSize(new Decimal(req).mul(gain.div(ach17).floor().plus(1))) : formatSize(req)) + " of space)" : "")
    $("darkmatter").innerHTML = formatValue(player.darkmatter.amount.toString(), 4)
    $("darkmattermul").innerHTML = getDarkMatterEffect();
    if (player.darkmatter.amount.gte(1)) $("dmup3boost").innerHTML = FORMULAS.dmup3boost()
    $("dmup5boost").innerHTML = new Decimal(FORMULAS.dmup5boost()).mul(100).round()

}

function getDMUpgrade(up) {
    if (player.darkmatter.amount.gte(dmupprices[up - 1]) && !player.darkmatter.ups[up - 1]) {
        player.darkmatter.ups[up - 1] = true;
        player.darkmatter.amount = new Decimal(player.darkmatter.amount).minus(dmupprices[up - 1])
        $("dmup" + up).classList.add("complete")
        updateDMHTML()
    }
}

// quarks boost
$("dmup5").addEventListener("click", function () {
    let upgrade = "5";
    if (player.darkmatter.amount.gte("1e6") && player.expanse.size.gte("1e8" /* 100Mm */ ) && !player.darkmatter.ups[upgrade - 1]) {
        player.darkmatter.ups[upgrade - 1] = true;
        player.darkmatter.amount = new Decimal(player.darkmatter.amount).minus("1e6")
        player.expanse.size = new Decimal(player.expanse.size).minus("1e8")
        $("dmup" + upgrade).classList.add("complete")
    }
})

const dmupamount = "6"