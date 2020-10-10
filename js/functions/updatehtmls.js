function updateHTML() {
    if (visualUpdateTicks >= player.updateHTMLtime) {
        // Visual increases every 50ms by 50, updatehtmltime is in milliseconds.
        // When visual is over updatehtmltime then it updates html
        visualUpdateTicks = 0;
        // space
        updateSpaceHTML()
        // darkmatter
        if (player.darkmatter.unlocked) updateDMHTML()
        // quarks
        if (player.quarks.unlocked) updateQuarkHTML()
        // feature req
        updateFeatureReq()
        // stats
        updateStatsHTML()
    }
}

function updateAchievements() {
    let dmreq = player.darkmatter.ups[1] ? "100" : "125"
    let req16 = "1e6"
    if (player.expanse.size.gte("75"))
        new Achievement("11").give()
    if (player.darkmatter.amount.gte("5"))
        new Achievement("12").give();
    if (player.darkmatter.amount.gte("69.69") && !player.achievements.includes("13") /* stop it from constantly updating darkmattermul */) {
        new Achievement("13").give();
        $("darkmattermul").innerHTML = getDarkMatterEffect()
    }
    if (spaceProduction(50).gte("50"))
        new Achievement("14").give();
    if (player.darkmatter.upsunlocked)
        new Achievement("15").give();
    if (player.expanse.size.div(dmreq).mul(FORMULAS.dmup3boost()).gte(req16))
        new Achievement("16").give();
    if (player.quarks.amount.gt(0))
        new Achievement("17").give();
    if (player.quarks.energy.gte("1e4")) 
        new Achievement("18").give();
    if (player.quarks.gravity.gte("150000"))
        new Achievement("21").give();
}

function updateFeatureReq() {
    if (player.expanse.size.lt("125")) {
        $("nextFeatureTxt").innerHTML = 
            "Reach 125m to unlock dark matter (" +
            player.expanse.size.div(125/100).toFixed(2).toString()
            +"%)"
        return;
    }
    if (player.darkmatter.amount.lt("2000") && !player.quarks.milestones[0]) {
        $("nextFeatureTxt").innerHTML = 
            "Reach 2000 dark matter to unlock dark matter upgrades (" +
            player.darkmatter.amount.div(2000/100).toFixed(2).toString()
            +"%)"
        return;
    }
    if (player.darkmatter.amount.lt("5e6") || player.expanse.size.lt("2.5e7")) {
        $("nextFeatureTxt").innerHTML = 
            "Reach 5e6 dark matter and 25 Mm³ of space to unlock quarks (" +
            player.darkmatter.amount.div(new Decimal("5e6").div(50)).min(50)
                .plus(player.expanse.size.div(new Decimal("2.5e7").div(50)).min(50))
                .toFixed(2).toString()
            +"%)"
        return;
    }
    $("nextFeatureTxt").innerHTML = ""
}