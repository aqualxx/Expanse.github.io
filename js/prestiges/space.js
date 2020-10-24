function spaceProduction(time) {
    let production = new Decimal(0);

    let formulaStart =
        player.darkmatter.ups[3] ?
        player.expanse.size.log(1.2) :
        player.expanse.size.log(1.5);

    let dmup1effect = player.darkmatter.ups[0] ? "5" : "1";


    let spaceup1removelimit = player.darkmatter.ups[5] ? true : player.expanse.size.lt("40")

    let spaceup1debuff = player.darkmatter.ups[5] ? player.quarks.ups.includes("4") ? "5" : "3" : "5"

    let spaceup1effect = player.expanse.upgrades[0].bought && spaceup1removelimit ? spaceup1debuff : "1";


    let spaceup2effect = player.expanse.upgrades[1].bought ? "2" : "1";

    let spaceup3effect = player.expanse.upgrades[2].bought ? "3" : "1";

    let spaceup4effect = player.expanse.upgrades[3].bought && player.expanse.size.gte("5e3") ? "4" : "1";

    let ach22reward = player.achievements.includes("22") ? "2" : "1"

    if (!isNaN(player.expanse.size.log(1.5)) && player.expanse.size.log(1.5).sign != -1)
        production = formulaStart.plus(1);
    else
        production = player.expanse.size.plus(1);
    
    return spaceScaling(production.mul(time / 1000).div(40)
        .mul(player.darkmatter.ups[6] && player.expanse.upgrades[0].bought ? new Decimal(spaceup1effect).plus("0.5") : spaceup1effect)
        .mul(player.darkmatter.ups[6] && player.expanse.upgrades[1].bought ? new Decimal(spaceup2effect).plus("0.5") : spaceup2effect)
        .mul(player.darkmatter.ups[6] && player.expanse.upgrades[2].bought ? new Decimal(spaceup3effect).plus("0.5") : spaceup3effect)
        .mul(player.darkmatter.ups[6] && player.expanse.upgrades[3].bought ? new Decimal(spaceup4effect).plus("0.5") : spaceup4effect)
        .mul(getDarkMatterEffect())
        .mul(dmup1effect)
        .div(getGravityEffect())
        .mul(getEnergyEffect())
        .mul(ach22reward)
        .mul(FORMULAS.dmup5boost()));
}

function updateSpaceHTML() {
    $("space").innerHTML = formatSize(player.expanse.size);
    $("spaceProd").innerHTML =
        "(+" +
        formatSize(spaceProduction(50).mul(1000 / 50 /*1000ms / ms*/ )) +
        " per second)";
}
// 10x until 40m
$("spaceup1").addEventListener("click", function() {
    if (player.expanse.size.gte("10") && !player.expanse.upgrades[0].bought) {
        player.expanse.size = new Decimal(player.expanse.size).minus("10");
        $("spaceup1").classList.add("complete");
        player.expanse.upgrades[0].bought = 1;
    }
})
// double
$("spaceup2").addEventListener("click", function() {
    if (player.expanse.size.gte("50") && !player.expanse.upgrades[1].bought) {
        player.expanse.size = new Decimal(player.expanse.size).minus("50");
        $("spaceup2").classList.add("complete");
        player.expanse.upgrades[1].bought = 1;
    }
})
// triple
$("spaceup3").addEventListener("click", function() {
    if (player.expanse.size.gte("1e3") && !player.expanse.upgrades[2].bought) {
        player.expanse.size = new Decimal(player.expanse.size).minus("1e3");
        $("spaceup3").classList.add("complete");
        player.expanse.upgrades[2].bought = 1;
    }
})
// quad after 5km
$("spaceup4").addEventListener("click", function() {
    if (player.expanse.size.gte("5e3") && !player.expanse.upgrades[3].bought) {
        player.expanse.size = new Decimal(player.expanse.size).minus("5e3");
        $("spaceup4").classList.add("complete");
        player.expanse.upgrades[3].bought = 1;
    }
})

const spaceupgrades = 4;