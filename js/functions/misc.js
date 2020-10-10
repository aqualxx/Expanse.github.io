function copyObj(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function $(id) {
    return document.getElementById(id)
}

function setTheme(type, animate = true) {
    let head = document.getElementsByTagName("head")[0];
    let body = document.getElementsByTagName("body")[0]

    if (animate) body.style.transition = "background-color 500ms ease 0s"
    else body.style.transition = ""

    player.options.theme = type

    if (type === "dark") {
        let link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = "css/main-dark.css";
        head.appendChild(link);
    } else {
        let links = document.getElementsByTagName("link")
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.includes("dark")) links[i].remove();
        }
    }

    $("changeTheme").innerHTML = "Theme: " + player.options.theme
}