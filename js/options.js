$("hideTicker").addEventListener("click", function () {
    let ticker = $("ticker");
    player.options.newsHidden = !player.options.newsHidden;
    if (player.options.newsHidden) {
        ticker.style.display = "none";
        return;
    }
    ticker.style.display = "";
    scrollNextMessage();
})

$("changeTheme").addEventListener("click", function () {
    if (player.options.theme === "Light") setTheme("Dark")
    else setTheme("Light")
})

$("updateTicksInput").addEventListener("change", function () {
    let defaultval = "50"
    $("updateTicksInput").value = $("updateTicksInput").value.trim()
    if ($("updateTicksInput").value === "") $("updateTicksInput").value = defaultval
    if (isNaN(new Number($("updateTicksInput").value))) $("updateTicksInput").value = defaultval
    if ($("updateTicksInput").value > 1000) $("updateTicksInput").value = "1000"
    if ($("updateTicksInput").value < defaultval) $("updateTicksInput").value = defaultval
    player.updateHTMLtime = $("updateTicksInput").value
    $("updateHTMLtime").innerHTML = "Milliseconds to update text: " + $("updateTicksInput").value + "ms"
})

function hardReset() {
    let confirmation = prompt("Are you sure? Type in \"yes\" without quotes to preform a hard reset (ALL your progress will be gone forever!)")
    if (confirmation === "yes") {
        clearInterval(saveLoop);
        localStorage.removeItem("expanseData");
        window.location.reload();
    }
}

function exportSave() {
    let data = document.createElement("input")
    $("export").appendChild(data)
    data.value = btoa(JSON.stringify(player))
    data.select()
    data.setSelectionRange(0, 999999)
    document.execCommand("copy")
    data.parentElement.removeChild(data)
    toast.info("Copied save to clipboard!")
}

function importSave() {
    let data = prompt("Paste your save data here!")
    setPlayer(JSON.parse(atob(data)))
    save()
    window.location.reload()
}

$("hardReset").addEventListener("click", hardReset)
$("save").addEventListener("click", save)
$("export").addEventListener("click", exportSave)
$("import").addEventListener("click", importSave)