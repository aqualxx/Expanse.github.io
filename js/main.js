var interval;
var player = STARTINGPLAYER()

var visualUpdateTicks = 0

function setTab(id) {
    let allTabs = document.querySelectorAll("div[id$='Tab']");
    for (let i = 0; i < allTabs.length; i++) {
        allTabs[i].style.display = "none";
    }
    $(id).style.display = "";
}

function updateStatsHTML() {
    $("bestExpanses").innerHTML = "You have done "+player.expanse.expanses+" expanse"+pluralize(player.expanse.expanses)+" in total."
    $("bestSpace").innerHTML = "Your best space is "+formatSize(player.expanse.best)+"."
    if ($("bestDarkMatter").classList.contains("hidden") && player.darkmatter.unlocked) $("bestDarkMatter").classList.remove("hidden")
    if (!$("bestDarkMatter").classList.contains("hidden")) $("bestDarkMatter").innerHTML = "Your best dark matter is "+player.darkmatter.best+"."
}

$("createExpanse").addEventListener("click", function () {
    $("game").classList.add("implode");
    player.expanse.expanses = new Decimal(player.expanse.expanses).plus(1)
    setTimeout(function () {
        $("createExpanse").style.display = "none";
        $("game").classList.remove("implode");
        interval = setInterval(function () {
            simulateTime();
        }, 50);
    }, 1500)
})

function loadgame() {
    if (!!localStorage.getItem("expanseData")) {
        setPlayer(JSON.parse(atob(localStorage.getItem("expanseData"))));
        if (player.expanse.size.eq(NaN)) player.expanse.size = new Decimal(1);
        interval = setInterval(function () {
            simulateTime();
        }, 50);
    } else
        setPlayer(STARTINGPLAYER())
}

loadgame()

/**
 * * plans:
 * * Quark upgrades.
 * * Gravity conversion automation later game. Later game there will be something to make gravity do nothing
 * * layers that produce at very low of a resource/make other resource slow down
 */