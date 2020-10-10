function spaceProduction(time) {
    let production = new Decimal(0);

    let formulaStart =
        player.darkmatter.ups[3] ?
        player.expanse.size.log(1.2) :
        player.expanse.size.log(1.5);

    let dmup1effect = player.darkmatter.ups[0] ? "5" : "1";

    let spaceup1effect = player.expanse.upgrades[0].bought ? "2" : "1";

    let spaceup2effect = player.expanse.upgrades[1].bought ? "3" : "1";

    let spaceup3effect = player.expanse.upgrades[2].bought && player.expanse.size.gte("5e5") ? "4" : "1";

    const addeffects = function(decimal) {
        return decimal
        .mul(spaceup1effect)
        .mul(spaceup2effect)
        .mul(spaceup3effect)
        .mul(getDarkMatterEffect())
        .mul(dmup1effect)
        .div(getGravityEffect())
        .mul(getEnergyEffect())
        .mul(FORMULAS.dmup5boost());
    }

    if (!isNaN(player.expanse.size.log(1.5)) && player.expanse.size.log(1.5).sign != -1)
        production = formulaStart.plus(1);
    else
        production = player.expanse.size.plus(1);
    
    return addeffects(production.mul(time / 1000).div(40));
}

function updateSpaceHTML() {
    $("space").innerHTML = formatSize(player.expanse.size);
    $("spaceProd").innerHTML =
        "(+" +
        formatSize(spaceProduction(50).mul(1000 / 50 /*1000ms / ms*/ )) +
        " per second)";
}
// double
$("spaceup1").addEventListener("click", function() {
    if (player.expanse.size.gte("50") && !player.expanse.upgrades[0].bought) {
        player.expanse.size = new Decimal(player.expanse.size).minus("50");
        $("spaceup1").classList.add("complete");
        player.expanse.upgrades[0].bought = 1;
    }
})
// triple
$("spaceup2").addEventListener("click", function() {
    if (player.expanse.size.gte("1e3") && !player.expanse.upgrades[1].bought) {
        player.expanse.size = new Decimal(player.expanse.size).minus("1e3");
        $("spaceup2").classList.add("complete");
        player.expanse.upgrades[1].bought = 1;
    }
})
// quad after 2km
$("spaceup3").addEventListener("click", function() {
    if (player.expanse.size.gte("5e3") && !player.expanse.upgrades[2].bought) {
        player.expanse.size = new Decimal(player.expanse.size).minus("5e3");
        $("spaceup3").classList.add("complete");
        player.expanse.upgrades[2].bought = 1;
    }
})
const spaceupgrades = 3;