$("gravityAutoBtn").addEventListener("click", function() {
    player.quarks.auto.active = !player.quarks.auto.active
    $("gravityAutoBtn").innerHTML = player.quarks.auto.active ? "Automator Active" : "Automator Disabled"
})

$("autoDMReqInput").addEventListener("change", function() {
    player.darkmatter.auto.req = new Decimal(nanDestroyer($("autoDMReqInput").value))
    $("autoDMReq").innerHTML = formatValue(player.darkmatter.auto.req.toString(), 2)
})

$("dmAutoBtn").addEventListener("click", function() {
    player.darkmatter.auto.active = !player.darkmatter.auto.active
    $("dmAutoBtn").innerHTML = player.darkmatter.auto.active ? "Automator Active" : "Automator Disabled"
})

$("gravityAutoUp").addEventListener("click", function() {
    if (player.quarks.amount.gte("50")) {
        player.quarks.amount = new Decimal(player.quarks.amount).minus("50")
        player.quarks.auto.gravityTick = new Decimal(player.quarks.auto.gravityTick).pow("0.996")
        if (player.quarks.auto.gravityTick.lte("50")) {
            $("autoGravityTime").innerHTML = player.quarks.auto.gravityTick.toFixed(0) + "ms (max)"
            $("quarkProdType").innerHTML = "energy"
            $("gravitySection").style.display = "none"
            $("gravityAutoUp").style.display = "none"
            return;
        }
        $("autoGravityTime").innerHTML = player.quarks.auto.gravityTick.toFixed(0)+"ms"
        $("gravityAutoUp").innerHTML = "Upgrade to "+new Decimal(player.quarks.auto.gravityTick).pow("0.996").toFixed(0)+"ms for 50 quarks"
    }
})

$("unlockAutoGravity").addEventListener("click", function() {
    if (player.quarks.amount.gte("500")) {
        $("unlockAutoGravity").style.display = "none"
        player.quarks.amount = new Decimal(player.quarks.amount).minus("500")
        player.quarks.auto.unlocked = true
        $("autoGravitySection").style.display = ""
    }
})

$("unlockAutoDM").addEventListener("click", function() {
    if (player.darkmatter.amount.gte("10000")) {
        $("unlockAutoDM").style.display = "none"
        player.darkmatter.amount = new Decimal(player.darkmatter.amount).minus("10000")
        player.darkmatter.auto.unlocked = true
        $("autoDMSection").style.display = ""
    }
})